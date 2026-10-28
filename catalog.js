/*
 * CURBSIDE STICKERS — CATALOG READER
 * =====================================
 * You do NOT need to edit this file to add or remove stickers.
 * Edit products.json instead. This script turns each product into a card.
 *
 * Safety: We create HTML elements and assign textContent rather than
 * inserting product text as raw HTML. This avoids HTML injection.
 * Only links to eBay HTTPS listing pages are allowed.
 */

// 🧡 STEP 1: Find the empty gallery container in index.html.
const productGrid = document.querySelector("#products");
if (!productGrid) console.warn("Sticker gallery container missing.");

/* COLORFUL SAMPLE ART: replaced automatically by any uploaded image. */
// 🧡 STEP 2: These are SAMPLE illustrations shown until real images are uploaded.
// Each entry contains [emoji, title, background color, text color].
const demoStickers = {
 "retro-computer-club":["🖥️","RETRO CLUB","#b6f3c0","#1a1a1a"],
 "floppy-disk-friends":["💾","SAVE ME!","#4ec7e3","#1a1a1a"],
 "pixel-heart":["💗","PIXEL LOVE","#ff8ec8","#1a1a1a"],
 "happy-macintosh":["🖥️","HELLO!","#ffde59","#1a1a1a"],
 "space-explorer":["🚀","SPACE CLUB","#ff8ec8","#1a1a1a"],
 "rainbow-cassette":["📼","MIXTAPE","#ffde59","#1a1a1a"],
 "tiny-robot":["🤖","BEEP BOOP","#b6f3c0","#1a1a1a"],
 "arcade-dreams":["🕹️","HIGH SCORE","#4ec7e3","#1a1a1a"],
 "cosmic-cat":["🐈","STAR CAT","#ff8ec8","#1a1a1a"],
 "mystery-sticker":["🎁","SURPRISE!","#ff4b4b","#1a1a1a"]
};
// 🧡 STEP 3: Assemble a fallback illustration using ordinary HTML elements.
function makeDemoSticker(id) {
  const data = demoStickers[id] || ["✨","NEW DROP","#e8e5ff","#6854a9"];
  const stage = element("div", "demo-stage");
  stage.style.setProperty("--demo-bg",data[2]);
  stage.style.setProperty("--demo-ink",data[3]);
  const sticker = element("div","demo-diecut");
  sticker.append(element("span","demo-sparkle","✦ ★ ✦"));
  sticker.append(element("span","demo-emoji",data[0]));
  sticker.append(element("span","demo-wordmark",data[1]));
  sticker.append(element("span","demo-caption","CURBSIDE STICKERS"));
  stage.append(sticker);
  return stage;
}


/** Converts a number into a US-dollar price, like $4.00. */
function formatPrice(amount) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD"
  }).format(amount);
}

/** Allow only HTTPS links to ebay.com or one of its subdomains. */
function safeEbayUrl(value) {
  try {
    const url = new URL(value);
    const host = url.hostname.toLowerCase();
    if (url.protocol === "https:" && (host === "ebay.com" || host.endsWith(".ebay.com"))) {
      return url.href;
    }
  } catch {
    // Empty or malformed URLs are treated as not-yet-for-sale.
  }
  return null;
}

/** Tiny helper: make an element, optionally with a CSS class. */
function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text !== undefined) node.textContent = text;
  return node;
}

/** Builds ONE sticker card using the details in products.json. */
// 🧡 STEP 4: Build one card. product is one entry from products.json.
function renderProduct(product) {
  if (!product || product.visible === false) return;

  const card = element("article", "product");
  const art = element("div", "art product-image");
  const imagePath = typeof product.image === "string" ? product.image.trim() : "";
  const demo = () => makeDemoSticker(String(product.id || ""));

  if (imagePath && /^images\/[a-zA-Z0-9_./-]+\.(webp|png|jpg|jpeg)$/i.test(imagePath) && !imagePath.includes("..")) {
    const img = element("img");
    img.src = imagePath;
    img.alt = "Sticker artwork: " + String(product.name || "Untitled");
    img.loading = "lazy";
    img.decoding = "async";
    // If the filename is wrong or the upload is missing, show demo art instead.
    img.addEventListener("error", () => { img.remove(); art.append(demo()); }, { once: true });
    art.append(img);
  } else {
    // Demo art appears only when no real image path is supplied.
    art.append(demo());
  }

  const details = element("div", "details");
  const status = String(product.status || "coming-soon");
  const url = safeEbayUrl(product.ebayUrl);
  const canBuy = status === "available" && Boolean(url);
  const label = status === "sold-out" ? "SOLD OUT" : canBuy ? "LIMITED EDITION" : "COMING SOON";
  details.append(element("span", "pill", label));
  details.append(element("h3", "", String(product.name || "Untitled sticker")));
  details.append(element("p", "", String(product.description || "")));

  if (typeof product.price === "number" && Number.isFinite(product.price) && product.price >= 0) {
    details.append(element("strong", "price", formatPrice(product.price)));
  }

  const count = Number(product.editionSize);
  if (Number.isInteger(count) && count > 0) {
    details.append(element("p", "", "Limited edition of " + count));
  }

  // Stock numbers live on eBay. We deliberately do not invent live counts.
  if (canBuy) {
    const buy = element("a", "button", "Buy on eBay");
    buy.href = url;
    buy.rel = "noopener noreferrer";
    buy.target = "_blank";
    details.append(buy);
  } else {
    details.append(element("span", "button disabled", status === "sold-out" ? "Sold out" : "Coming soon"));
  }
  details.append(element("p", "muted", "Check eBay for current availability and shipping details."));

  // The artwork itself becomes the eBay link ONLY when a real listing is live.
  // Until then, it remains an ordinary image: no fake or broken checkout links.
  if (canBuy) {
    const artLink = element("a", "artwork-link");
    artLink.href = url;
    artLink.target = "_blank";
    artLink.rel = "noopener noreferrer";
    artLink.setAttribute("aria-label", "View " + String(product.name || "sticker") + " on eBay");
    artLink.append(art);
    card.append(artLink, details);
  } else {
    card.append(art, details);
  }
  productGrid.append(card);
}

/** Load the public product list whenever someone opens the website. */
// 🧡 STEP 5: Fetch JSON and draw all visible cards.
// async/await means wait for the file to finish loading.
async function loadCatalog() {
  try {
    const response = await fetch("./products.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Catalog could not be loaded.");
    const data = await response.json();
    if (!Array.isArray(data.products)) throw new Error("Invalid catalog format.");

    productGrid.replaceChildren();
    const visible = data.products.filter(p => p && p.visible !== false);
    if (!visible.length) {
      productGrid.append(element("p", "muted", "New sticker drops are on the way!"));
      return;
    }
    visible.forEach(renderProduct);
    setupStickerCarousel();
  } catch (error) {
    console.error("Catalog error:", error);
    productGrid.append(element("p", "muted", "Sticker listings are temporarily unavailable. Please check back soon."));
  }
}

if (productGrid) loadCatalog();

// 🧡 STEP 6: COVER-FLOW FOCUS EFFECT
// Swipe naturally on a phone/iPad, or use arrows and keyboard on desktop.
// The nearest card to the gallery center gets the "is-focused" class.
function setupStickerCarousel() {
  const cards = [...productGrid.querySelectorAll(".product")];
  const previous = document.querySelector("#sticker-prev");
  const next = document.querySelector("#sticker-next");
  const position = document.querySelector("#sticker-position");
  if (!cards.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  let currentIndex = 0;
  let frameRequested = false;

  function refreshFocus() {
    frameRequested = false;
    const center = productGrid.getBoundingClientRect().left + productGrid.clientWidth / 2;
    let nearest = 0;
    let distance = Infinity;
    cards.forEach((card, index) => {
      const bounds = card.getBoundingClientRect();
      const gap = Math.abs(bounds.left + bounds.width / 2 - center);
      if (gap < distance) { distance = gap; nearest = index; }
    });
    currentIndex = nearest;
    cards.forEach((card, index) => card.classList.toggle("is-focused", index === currentIndex));
    if (position) position.textContent = (currentIndex + 1) + " / " + cards.length;
    if (previous) previous.disabled = currentIndex === 0;
    if (next) next.disabled = currentIndex === cards.length - 1;
  }

  function scheduleFocus() {
    if (!frameRequested) {
      frameRequested = true;
      requestAnimationFrame(refreshFocus);
    }
  }

  function goTo(index) {
    const target = cards[Math.max(0, Math.min(cards.length - 1, index))];
    if (!target) return;
    // Center the chosen card without changing the page's vertical position.
    const left = target.offsetLeft - productGrid.offsetLeft -
      (productGrid.clientWidth - target.offsetWidth) / 2;
    productGrid.scrollTo({ left, behavior: reducedMotion.matches ? "auto" : "smooth" });
    scheduleFocus();
  }

  previous?.addEventListener("click", () => goTo(currentIndex - 1));
  next?.addEventListener("click", () => goTo(currentIndex + 1));
  productGrid.addEventListener("keydown", (event) => {
    if (event.target !== productGrid) return;
    if (event.key === "ArrowRight" || event.key === "ArrowLeft") {
      event.preventDefault();
      goTo(currentIndex + (event.key === "ArrowRight" ? 1 : -1));
    }
  });
  productGrid.addEventListener("scroll", scheduleFocus, { passive: true });
  window.addEventListener("resize", scheduleFocus);
  requestAnimationFrame(() => {
    goTo(0);
    refreshFocus();
  });
}
