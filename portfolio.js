/*
  GRAPHIC DESIGN PORTFOLIO
  ========================
  Beginner tip: Add and remove projects in projects.json, NOT this script.
  Text is inserted safely as text, never interpreted as HTML.
*/
// 💛 STEP 1: Find the portfolio container on the homepage.
const portfolio = document.querySelector("#portfolio-projects");
// 💛 STEP 2: Small reusable helper for making safe HTML elements.
const make = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
// 💛 STEP 3: Read projects.json and build a card for each visible project.
// To publish a project, change visible to true in projects.json.
async function loadPortfolio() {
  if (!portfolio) return;
  try {
    const response = await fetch("./projects.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Projects unavailable");
    const data = await response.json();
    if (!Array.isArray(data.projects)) throw new Error("Invalid portfolio data");
    portfolio.replaceChildren();
    for (const project of data.projects) {
      if (!project || project.visible === false) continue;
      const card = make("article", "portfolio-card");
      const art = make("div", "portfolio-art");
      // An empty image path shows the friendly placeholder instead.
      const path = typeof project.image === "string" ? project.image : "";
      if (/^images\/[a-zA-Z0-9_./-]+\.(webp|png|jpg|jpeg)$/i.test(path) && !path.includes("..")) {
        const image = make("img");
        image.src = path;
        image.alt = "Artwork for " + String(project.title || "design project");
        image.loading = "lazy";
        image.decoding = "async";
        image.addEventListener("error", () => { art.replaceChildren(make("span", "portfolio-placeholder", "Image unavailable")); }, { once: true });
        art.append(image);
      } else {
        art.append(make("span", "portfolio-placeholder", "✳ YOUR ART HERE"));
      }
      card.append(art);
      card.append(make("p", "eyebrow", String(project.category || "Graphic Design")));
      card.append(make("h3", "", String(project.title || "Untitled project")));
      card.append(make("p", "", String(project.description || "")));
      // Optional external link, HTTPS only. Empty URLs simply hide the link.
      try {
        const url = new URL(project.url);
        if (url.protocol === "https:") {
          const link = make("a", "portfolio-link", "View project ↗");
          link.href = url.href;
          link.target = "_blank";
          link.rel = "noopener noreferrer";
          card.append(link);
        }
      } catch { /* No link yet. */ }
      portfolio.append(card);
    }
  } catch (error) {
    console.error(error);
    portfolio.append(make("p", "muted", "Projects will be added soon."));
  }
}
loadPortfolio();
