# 🎨 Otter Stickers — Color-Coded Editing Handbook

Welcome! This guide is your **map of the website code**. You can edit everything from an iPad using GitHub's pencil (Edit) button. No programming experience required.

## 🗺️ Quick color key

| Color | Area | Edit this file |
| --- | --- | --- |
| 🩷 PINK | Sticker designs, prices, eBay links | [products.json](products.json) |
| 💜 PURPLE | Graphic design portfolio projects | [projects.json](projects.json) |
| 💙 BLUE | Homepage headings, text, section order | [index.html](index.html) |
| 💚 GREEN | Colors, fonts, spacing, card appearance | [style.css](style.css) |
| 🧡 ORANGE | How sticker cards work | [catalog.js](catalog.js) |
| 🟨 YELLOW | How portfolio cards work | [portfolio.js](portfolio.js) |
| ⚪ WHITE | Shipping and returns wording | [policies.html](policies.html) |

**Rule of thumb:** Most of the time, edit only **products.json** or **projects.json**. JavaScript files are the machinery; you can leave them alone.

---

## 🩷 01 — STICKER DESIGNS (products.json)

Each object inside the `products` list is **one sticker design**. The first edition is **10 unique designs × 10 copies each**. The website does **not** track real-time eBay stock.

```json
{
  "id": "retro-computer-club",
  "name": "Retro Computer Club",
  "description": "A cheerful retro computer sticker.",
  "price": 4,
  "editionSize": 10,
  "image": "images/retro-computer.webp",
  "ebayUrl": "",
  "status": "coming-soon",
  "visible": true
}
```

### ✏️ What to change
- **name:** sticker title visitors see.
- **description:** short product description.
- **price:** example display price in US dollars; keep it consistent with eBay.
- **editionSize:** planned total number of copies, usually `10`.
- **image:** exact path to an uploaded image, such as `images/retro-computer.webp`.
- **ebayUrl:** paste your **real** HTTPS eBay listing URL after publishing the listing.
- **status:** `coming-soon`, `available`, or `sold-out`.
- **visible:** `true` shows the card; `false` hides it.

### 🧹 Replace, hide, or delete
**Replace artwork:** Upload the new image to `images/` and update `image`.

**Hide a design:** Change `"visible": true` to `"visible": false`. This is safer than deleting it.

**Delete a design:** Remove its entire `{ ... }` entry from the `products` array and fix the comma separating entries. Keep a copy first; GitHub commit history can help restore mistakes.

**Make the image open eBay:** Set `"status": "available"` **and** add a valid eBay URL. Until both are present, the image is not a purchase link.

> ⚠️ eBay is the source of truth for payments, actual quantity, shipping, and availability. Your GitHub site is a showcase, not an order database.

---

## 🖼️ 02 — IMAGE FORMAT AND DIMENSIONS

| Use | Recommended format | Size |
| --- | --- | --- |
| Sticker artwork on website | **WebP** (best default) | **1200 × 1200 px** |
| Transparent artwork export | **PNG** | **1200 × 1200 px** or larger |
| Photo of physical stickers | **JPG** or WebP | **1200 × 1200 px** |
| Print master | Vector PDF/SVG/AI or high-res PNG/TIFF | **300 DPI at final print size**, follow printer specs |
| Graphic design portfolio thumbnail | WebP/JPG/PNG | **1600 × 1200 px** (4:3), as a starting point |

**Website images:** Use **sRGB** color, leave some space around the sticker, and aim for roughly **200–500 KB per image** when possible. WebP can have transparency. PNG is great for preserving crisp transparent artwork, but can be larger. JPG does not support transparency.

**Important:** Keep original design files and print masters separate. Do not print from the compressed website thumbnail. Check the printer's bleed and cut-line requirements.

### 📁 Uploading an image on iPad
1. Open the GitHub repository and navigate to (or create) the `images` folder.
2. Choose **Add file → Upload files** (the exact mobile interface may vary).
3. Upload `retro-computer.webp` and commit.
4. Open `products.json`, tap Edit, and set `"image": "images/retro-computer.webp"`.
5. Commit again. Refresh the website after GitHub Pages publishes the update.

**Use simple filenames:** lowercase letters, numbers, and hyphens. The website accepts `.webp`, `.png`, `.jpg`, and `.jpeg`.

---

## 💜 03 — GRAPHIC DESIGN PORTFOLIO (projects.json)

This section is **separate from sticker sales**. Showcase branding, posters, typography, illustrations, or personal experiments. The homepage also says **Open for graphic design projects** and links to your [GitHub profile](https://github.com/Wonka15).

```json
{
  "title": "My poster series",
  "category": "Typography",
  "description": "A colorful personal design exploration.",
  "image": "images/poster-series.webp",
  "url": "",
  "visible": true
}
```

- **title / category / description:** the text shown on the portfolio card.
- **image:** upload the image first, then enter its path.
- **url:** optional public HTTPS link to the project.
- **visible:** `false` hides a project without deleting it.

Only upload client work if you have permission to publish it.

---

## 💙 04 — HOMEPAGE TEXT (index.html)

This is the website's structure. Find these landmarks:
- **HEADER / NAVIGATION:** links across the top.
- **HERO:** large headline and welcome text.
- **PRODUCT CATALOG:** the swipeable 10-sticker showcase.
- **GRAPHIC DESIGN PORTFOLIO:** your work, GitHub link, and availability statement.
- **INFO / FOOTER:** collector notes and policies.

**Easy text edits:** Change the words **between** HTML tags, but leave the tags (such as `<h2>` and `</h2>`) in place.

---

## 💚 05 — COLORS AND LAYOUT (style.css)

The file is divided into numbered sections with comments. Look for:
- **1:** global colors and defaults.
- **2:** header and navigation.
- **3:** hero.
- **4:** general sections.
- **5–7:** sticker card styling.
- **8–9:** footer and mobile layout.
- **10–11:** sticker gallery and swipe behavior.
- **12–13:** portfolio cards and the availability/GitHub callout.

CSS colors use hexadecimal codes, such as `#e8e5ff` (lavender). Change **one value at a time**, commit, and refresh to see what happened.

---

## 🧡 06 — STICKER CARD LOGIC (catalog.js)

This script reads `products.json`, creates sticker cards, and only makes artwork clickable when there is a valid HTTPS eBay URL **and** the product is marked available. You usually **do not need to edit this file**.

## 🟨 07 — PORTFOLIO CARD LOGIC (portfolio.js)

This script reads `projects.json` and displays portfolio cards. You usually **do not need to edit this file**.

---

## 🛡️ 08 — SAFETY AND GITHUB PAGES

- Never publish passwords, API keys, customer addresses, or private order details.
- GitHub commit history can help you undo edits.
- Keep backups of your original artwork and your repository.
- **GitHub Pages has restrictions on commercial/e-commerce hosting.** Sending buyers to eBay is **not** a guaranteed exception. Review GitHub's current terms before relying on it as a storefront.
- Use eBay for checkout and shipping/order management.

## 🧩 09 — QUICK TROUBLESHOOTING

**Image not showing?** Check spelling and capitalization of the `images/...webp` path; GitHub paths are case-sensitive.

**Sticker not clickable?** Confirm the real eBay URL is present and `status` is `available`.

**Sticker disappeared?** Check `visible` is `true`.

**Website not updating?** Wait for the GitHub Pages deployment and refresh. Check the repository's **Actions** tab if deployment fails.

**Catalog broke after editing?** JSON requires double quotes, commas between entries, no trailing comma after the last entry, and `true`/`false` without quotes. Use GitHub's history to restore a working version.

---

### ⭐ Your easiest routine

**Design → export WebP → upload to images/ → edit products.json → commit → preview → publish eBay listing → paste eBay URL → mark available.**

That's it. Have fun making things! ✨


---

## 🛹 10 — YOUR OTTER CONTROL ROOM

Open **[Otter Control Room](image-jar.html)** from your iPad. Bookmark it: it is intentionally **not linked from the customer storefront**.

This is a **public, read-only maintainer helper**, not a private login or an upload system. Anyone with the URL can view it. Never put passwords, API keys, or customer data there.

### 🫙 01 · Published sticker images
The meter measures only images linked from `products.json`. The suggested goal is **500 KB per image**, with a **5 MB collection budget**. These are speed guidelines, **not** GitHub storage limits. Unlinked images and other website files are not included.

### 📷 02 · Check images before upload
Choose images from your iPad to see their file sizes. This does **not** upload them. When happy, use the GitHub images folder link and upload normally.

### 📦 04 · Sticker inventory overview
The panel counts designs, visible items, and statuses in `products.json`. It does **not** know how many copies eBay has sold.

### 🔧 05 · Quick edit links
Tap the GitHub links to edit your products, portfolio, and images or check deployment progress. GitHub may ask you to sign in.

### 🧑‍🎨 Beginner rule
**HTML** builds the page, **CSS** styles it, **JavaScript** reads your catalog and updates the dashboard, and **JSON** stores your sticker information. You can safely start by editing JSON only.

---

## 🧑‍💻 11 — READ THE NEW COLOR-CODED SOURCE COMMENTS

All eight website source/data files now include beginner explanations. In HTML, look for `<!-- 💙 ... -->`; in CSS/JavaScript, look for `/* 💚 ... */` or `// 🧡 ...`. **Comments explain code but do not appear as normal website text.**

| Color | File | What it teaches |
| --- | --- | --- |
| 💙 Blue | [index.html](index.html) | Sections, navigation, and gallery containers |
| 💚 Green | [style.css](style.css) | Selectors, CSS variables, sizes, and mobile layouts |
| 🧡 Orange | [catalog.js](catalog.js) | Loading JSON, demo art, and sticker cards |
| 💛 Yellow | [portfolio.js](portfolio.js) | Building portfolio cards |
| 🩷 Pink | [products.json](products.json) | Every editable sticker field |
| 💜 Purple | [projects.json](projects.json) | Every editable project field |
| 🩵 Cyan | [image-jar.html](image-jar.html) | Dashboard and image budget calculations |
| 🤍 White | [policies.html](policies.html) | Customer policy wording |

**Why JSON looks different:** JSON does not allow ordinary `//` comments. Its explanatory text lives in fields called `_beginnerGuide` and `_fieldGuide`, which the website ignores.

**Best learning order:** Start with products.json, then index.html, then style.css. Save JavaScript for later. Change one thing at a time and check the result on your website.

**Important:** GitHub's editor may use its own syntax-highlighting colors. Our emoji labels make the file categories recognizable even if your editor theme changes.
