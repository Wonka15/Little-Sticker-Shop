/*
 * LITTLE STICKER DROPS — CATALOG READER
 * =====================================
 * You do NOT need to edit this file to add or remove stickers.
 * Edit products.json instead. This script turns each product into a card.
 *
 * Safety: We create HTML elements and assign textContent rather than
 * inserting product text as raw HTML. This avoids HTML injection.
 * Only links to eBay HTTPS listing pages are allowed.
 */

const productGrid = document.querySelector("#products");

/* COLORFUL SAMPLE ART: replaced automatically by any uploaded image. */
const demoStickers = {
 "retro-computer-club":["🖥️","RETRO CLUB","#d8f3e8","#4a8b83"],
 "floppy-disk-friends":["💾","SAVE ME!","#dce8ff","#567ac5"],
 "pixel-heart":["💗","PIXEL LOVE","#ffe0e8","#dd6391"],
 "happy-macintosh":["🖥️","HELLO!","#fff0ce","#bd8954"],
 "space-explorer":["🚀","SPACE CLUB","#e4d9ff","#8066c6"],
 "rainbow-cassette":["📼","MIXTAPE","#ffe3d2","#e18c65"],
 "tiny-robot":["🤖","BEEP BOOP","#d6f6f3","#4a9f9a"],
 "arcade-dreams":["🕹️","HIGH SCORE","#f9d9f7","#ad62ad"],
 "cosmic-cat":["🐈","STAR CAT","#dfe5ff","#6b79bd"],
 "mystery-sticker":["🎁","SURPRISE!","#fff0c9","#c99a3f"]
};
function makeDemoSticker(id) {
  const data = demoStickers[id] || ["✨","NEW DROP","#e8e5ff","#6854a9"];
  const stage = element("div", "demo-stage");
  stage.style.setProperty("--demo-bg",data[2]);
  stage.style.setProperty("--demo-ink",data[3]);
  const sticker = element("div","demo-diecut");
  sticker.append(element("span","demo-sparkle","✦ ★ ✦"));
  sticker.append(element("span","demo-emoji",data[0]));
  sticker.append(element("span","demo-wordmark",data[1]));
  sticker.append(element("span","demo-caption","LITTLE STICKER DROPS"));
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
function renderProduct(product) {
  if (!product || product.visible === false) return;

  const card = element("article", "product");
  const art = element("div", "art product-image");
  const imagePath = typeof product.image === "string" ? product.image.trim() : "";

  if (imagePath && /^images\/[a-zA-Z0-9_./-]+\.(webp|png|jpg|jpeg)$/i.test(imagePath) && !imagePath.includes("..")) {
    const img = element("img");
    img.src = imagePath;
    img.alt = "Sticker artwork: " + String(product.name || "Untitled");
    img.loading = "lazy";
    art.append(img);
  } else {
    // Demo art appears only when no real image path is supplied.
    art.append(makeDemoSticker(String(product.id || "")));
  }

  const details = element("div", "details");
  const status = String(product.status || "coming-soon");
  const label = status === "sold-out" ? "SOLD OUT" : status === "available" ? "LIMITED EDITION" : "COMING SOON";
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
  const url = safeEbayUrl(product.ebayUrl);
  if (status === "available" && url) {
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
  if (status === "available" && url) {
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
async function loadCatalog() {
  try {
    const response = await fetch("./products.json", { cache: "no-cache" });
    if (!response.ok) throw new Error("Catalog could not be loaded.");
    const data = await response.json();
    if (!Array.isArray(data.products)) throw new Error("Invalid catalog format.");

    const visible = data.products.filter(p => p && p.visible !== false);
    if (!visible.length) {
      productGrid.append(element("p", "muted", "New sticker drops are on the way!"));
      return;
    }
    visible.forEach(renderProduct);
  } catch (error) {
    console.error("Catalog error:", error);
    productGrid.append(element("p", "muted", "Sticker listings are temporarily unavailable. Please check back soon."));
  }
}

loadCatalog();
