# 🦦 Otter Stickers

[![🌐 OPEN THE LIVE OTTER STICKERS WEBSITE](https://img.shields.io/badge/%F0%9F%8C%90_OPEN_THE_WEBSITE-OTTER_STICKERS-167f85?style=for-the-badge)](https://wonka15.github.io/Little-Sticker-Shop/)

**🔗 [Tap here to visit the live website](https://wonka15.github.io/Little-Sticker-Shop/)** — works on iPhone, iPad, and desktop.

---

## 🎨 Start here: Color-coded editing handbook

**New to editing the site?** Open [HANDBOOK.md](HANDBOOK.md) for the color-coded map of every file, sticker image export sizes, editing instructions, portfolio projects, and eBay links.

# Otter Stickers — Beginner's Guide 🎨

Welcome! Your storefront is a static HTML/CSS/JavaScript site with a **single product catalog file**. No database or checkout server is required.

> **Important hosting note:** GitHub Pages is free for public projects, but GitHub's policy disallows using Pages as free hosting for an e-commerce site. Keep this repository as your code home and use a commerce-permitting host before selling. https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## 🚚 Moving Otter Stickers to another web host

**[Read the step-by-step hosting migration guide](HOSTING-MIGRATION.md).** It explains how to download a complete backup, upload the website to a host such as HoboHost, keep your `images/` folder and JSON files together, test your site, and switch a custom domain.

The public storefront uses **relative file paths**, so it is not locked to GitHub Pages. No database or build process is needed. On a new host, edits made on GitHub **will not automatically publish** unless you configure deployment syncing. The Control Room's editing shortcuts still point to GitHub.

## 🧰 Control Room: new maintenance tools

Open [the Otter Control Room](image-jar.html) for a visual thumbnail gallery, automated website health checks, a browser-saved sticker launch checklist, and a one-click link to GitHub's ZIP archive. The image size meter remains a performance suggestion, not a hosting quota.

**Important:** The Control Room is a public page, not a secure admin area. The checklist is saved in the current browser only. Health checks cannot verify live eBay stock or all possible website issues.

Read [ARTWORK-RIGHTS.md](ARTWORK-RIGHTS.md) for copyright notice wording, advice on protecting print-ready masters, and practical limits of public preview protection. Keep ZIP backups somewhere private; the GitHub ZIP includes committed source and images only.

## Your project map

| File | What it does |
| --- | --- |
| `products.json` | ⭐ **Edit this to add, hide, or change stickers** |
| `catalog.js` | Reads products.json and creates the cards automatically |
| `index.html` | The home page structure |
| `style.css` | Colors, layout, mobile design |
| `policies.html` | Draft shipping and returns information |
| `images/` | 📁 Existing folder for sticker and portfolio pictures |

## 🖼️ How to upload sticker images (iPad-friendly)

**Your picture library is the [images/ folder](https://github.com/Wonka15/Little-Sticker-Shop/tree/main/images).** You do not need a separate HTML file for each image. Upload the image once, then reference its path in `products.json`.

### 1. Upload the picture to GitHub

1. Export your sticker as a `.png`, `.jpg`, or `.webp` image. For web previews, aim for around **1200 × 1200 pixels** and **500 KB or less** when practical.
2. Open the [images/ folder on GitHub](https://github.com/Wonka15/Little-Sticker-Shop/tree/main/images).
3. Sign in and choose **Add file → Upload files** (the mobile interface may look slightly different).
4. Select your picture from the iPad Files or Photos picker. Example filename: `robot-sticker.png`.
5. Review the filename and **Commit changes**. GitHub now stores the image at `images/robot-sticker.png`.

**Beginner tip:** Use lowercase filenames with hyphens, no spaces, e.g. `retro-computer.png`. Filenames and capital letters must match exactly.

### 2. Tell your sticker card which image to use

1. Open [products.json](https://github.com/Wonka15/Little-Sticker-Shop/blob/main/products.json) and tap **Edit** (pencil icon).
2. Find the sticker you want to update, for example the one whose `id` is `tiny-robot`.
3. Change its `image` field from an empty string to the exact image path:

```json
"image": "images/robot-sticker.png"
```

4. **Commit changes**. After GitHub Pages deploys, the website's `catalog.js` reads `products.json` and displays the picture automatically.

### 3. Understand how the files connect

```text
images/
  README.md             ← notes about this folder
  robot-sticker.png     ← your uploaded artwork (example)
products.json           ← "image": "images/robot-sticker.png"
catalog.js              ← reads the image path and builds the card
index.html              ← displays the sticker gallery
```

The filenames above are **examples**, not promises that those images have already been uploaded.

### 4. Check your picture size before uploading

Open the [Otter Control Room / Image Jar](https://wonka15.github.io/Little-Sticker-Shop/image-jar.html) to inspect files selected on your iPad. This **does not upload them**. Its **500 KB per image** and **5 MB total** numbers are *suggested website-performance budgets*, not GitHub storage quotas. It measures only images referenced by the product catalog, not every file in the repository.

### Troubleshooting

- **Picture missing?** Confirm the file really exists in `images/` and the path matches its name and capitalization.
- **Still seeing demo art?** Make sure you changed the correct product's `image` field and committed the JSON edit.
- **Changes not showing?** Wait for GitHub Pages deployment, then refresh the website. Check the repository's **Actions** tab for errors.
- **Large PNG?** Consider exporting a smaller WebP preview; keep the original high-resolution artwork backed up privately.

---

## Add a sticker using an iPad

1. Open [products.json](https://github.com/Wonka15/Little-Sticker-Shop/blob/main/products.json).
2. Tap the pencil icon to edit (Safari's Request Desktop Website may help).
3. Copy the existing product object (everything between its `{` and `}`).
4. Add a comma after the previous object and paste the copy below it.
5. Change `id` (must be unique), `name`, `description`, `price`, and `editionSize`.
6. Change `image` to something like `images/my-sticker.webp` once you've uploaded it.
7. Commit your change. Your site will refresh after deployment.

**JSON rules:** names and text use double quotes, prices and edition sizes are numbers, and `true`/`false` have no quotes. There is **no comma after the last product**.

## Hide or retire a sticker

- `"visible": false` hides the card without deleting the history.
- `"status": "sold-out"` shows the sticker as sold out.
- `"status": "coming-soon"` disables purchasing.
- `"status": "available"` enables purchasing **only when a valid HTTPS eBay URL exists**.
- To delete a product permanently, remove its entire object from the array, including the appropriate separating comma.

## Add a sticker image

Create an `images` folder in the repository by uploading a file at `images/your-sticker.webp`. Then enter that exact path in the product's `image` field. Use WebP if possible; aim for around 200–500 KB per image. Keep print-quality masters separately.

## Connect eBay

Put your real listing URL in `ebayUrl` and set status to `available`. The site only allows HTTPS eBay URLs and never handles payments. **Inventory is NOT synchronized.** Configure the actual quantity and shipping settings on eBay.

## Example product

```json
{
  "id": "retro-computer-club",
  "name": "Retro Computer Club",
  "description": "A cheerful tribute to classic computers.",
  "price": 4,
  "editionSize": 10,
  "image": "",
  "ebayUrl": "",
  "status": "coming-soon",
  "visible": true
}
```

## Security and maintenance

Never upload API keys, account passwords, addresses, order details, or private data. Use two-factor authentication on GitHub and eBay. Keep the return policy consistent with your eBay listing and applicable law.

## Rights

Artwork and branding are reserved by the shop owner; no reuse license is granted.

## Swipeable 10-design showcase

The homepage is now a **horizontal swipe gallery**. It reads the ten example slots in `products.json`. Every design has an edition size of **10**, and all are **coming soon** until you upload artwork and publish real eBay listings.

- Add a photo: upload `images/your-design.webp` and set `image` to that path.
- Make an image clickable: add a real `https://www.ebay.com/itm/...` URL and set `status` to `available`.
- Hide a design: set `visible` to `false`.
- Mark sold out: set `status` to `sold-out`.
- Never store customer orders or shipping addresses here: eBay handles those.

The ten designs currently display **colorful sample illustrations**, not finished print-ready artwork or real inventory. Upload your own image to replace each sample.

**Hosting caution:** GitHub Pages has restrictions on using it to host e-commerce sites, even when checkout happens elsewhere. A gallery with eBay links is not a guaranteed exception.

## Before your first eBay sale — quick checklist

1. Upload your finished image into `images/` (WebP, PNG, JPG or JPEG; a 1200 × 1200 px square is a good starting point).
2. Change that design's `image` in `products.json` to the **exact filename**, e.g. `images/kickflip.webp`. A missing image now falls back to the sample illustration.
3. Create the real listing on eBay and configure quantity, shipping, price and returns there.
4. Paste the real HTTPS eBay listing into `ebayUrl` and set `status` to `available`. Both are required before the site enables its purchase button.
5. Confirm the image, link, price, policy and mobile layout on the published website. **The site does not sync inventory or process payments.**

For a beginner-friendly map of files, see [HANDBOOK.md](HANDBOOK.md). You can also use `projects.json` to add or hide graphic design work.

## Brand and editing

The public website uses **Otter Stickers / Cartoon Club** branding. The GitHub repository name and Pages URL intentionally remain unchanged. The homepage and policy page share the brand name, and the editable color palette lives at the end of `style.css` under `OTTER CARTOON CLUB — BRAND THEME`. Sticker names, images, and eBay URLs remain editable in `products.json` without touching code. The artwork in the catalog is demo art, not print-ready inventory.
