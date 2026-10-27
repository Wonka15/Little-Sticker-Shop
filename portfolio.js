/*
  GRAPHIC DESIGN PORTFOLIO
  ========================
  Beginner tip: Add and remove projects in projects.json, NOT this script.
  Text is inserted safely as text, never interpreted as HTML.
*/
const portfolio = document.querySelector("#portfolio-projects");
const make = (tag, className, text) => {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
};
async function loadPortfolio() {
  if (!portfolio) return;
  try {
    const response = await fetch("./projects.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Projects unavailable");
    const data = await response.json();
    for (const project of data.projects || []) {
      if (!project || project.visible === false) continue;
      const card = make("article", "portfolio-card");
      const art = make("div", "portfolio-art");
      const path = typeof project.image === "string" ? project.image : "";
      if (/^images\/[a-zA-Z0-9_./-]+\.(webp|png|jpg|jpeg)$/i.test(path) && !path.includes("..")) {
        const image = make("img");
        image.src = path;
        image.alt = "Artwork for " + String(project.title || "design project");
        image.loading = "lazy";
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
