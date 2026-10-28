# 🚚 Otter Stickers — Move Your Website to Another Host

**Beginner-friendly migration guide** · Works with conventional static-file hosting, including HoboHost **if your chosen plan supports uploading HTML, CSS, JavaScript, JSON, and images**.

## 💙 The simple idea

Your public website is made of ordinary files. **No database, Node.js server, build command, or GitHub Pages feature is required to run the storefront.**

- `index.html` — the home page (must be in the web root).
- `style.css` — colors, layout, and responsive design.
- `catalog.js` — reads `products.json` to display stickers.
- `portfolio.js` — reads `projects.json` to display projects.
- `products.json` — sticker titles, prices, image paths, and eBay links.
- `projects.json` — graphic design portfolio entries.
- `policies.html` — customer-facing policy page.
- `images/` — the image library, including your actual PNG/WebP/JPG files.
- `image-jar.html` — optional public-access maintainer utility; **not password-protected**.

**Important:** The `images/` folder must travel with the website. The JSON files contain paths like `images/robot-sticker.png`, not the image bytes themselves.

## 🟨 Step 1 — Download a complete backup from GitHub

1. Open [the Otter Stickers repository](https://github.com/Wonka15/Little-Sticker-Shop).
2. Choose **Code → Download ZIP**.
3. Save the ZIP to your iPad Files app or computer.
4. Extract/uncompress it. The ZIP usually contains a parent folder named something like `Little-Sticker-Shop-main`.
5. Keep the original ZIP as your backup.

**Never upload only `index.html`!** The website also needs CSS, JS, JSON, and image files.

## 🟩 Step 2 — Upload to your new hosting account

1. Log in to your host's control panel or file manager. Look for a website document root such as `public_html/`, `htdocs/`, or `www/`. The exact name depends on the host.
2. Open that web-root folder for your domain.
3. Upload the **contents inside** the extracted `Little-Sticker-Shop-main` folder, not the enclosing folder, unless you intentionally want the site in a subdirectory.
4. Preserve the original file and folder names, including `images/`.
5. If your host accepts ZIP uploads, upload and **extract** the ZIP in the correct location, then move the inner files up one level if necessary.
6. Enable HTTPS for your domain using your host's SSL settings.

### 📁 Example layout on your host

```text
public_html/                 ← the domain's web root (example name)
├── index.html               ← home page
├── style.css                ← design
├── catalog.js               ← sticker gallery
├── portfolio.js             ← portfolio gallery
├── products.json            ← sticker details
├── projects.json            ← portfolio details
├── policies.html            ← shipping/returns
├── image-jar.html           ← optional maintainer utility
└── images/                  ← keep this folder!
    ├── README.md
    └── robot-sticker.png    ← example artwork you upload
```

The `robot-sticker.png` filename above is an **example**; your actual uploaded image names will vary.

## 🧡 Step 3 — Test the new website

Visit your new domain over HTTPS and verify:

- [ ] The homepage loads with its styling.
- [ ] The sticker gallery shows products from `products.json`.
- [ ] Uploaded artwork appears; there are no missing-image icons.
- [ ] The portfolio appears if projects are marked visible.
- [ ] The shipping and returns page opens.
- [ ] The layout works on iPad and phone.
- [ ] Real eBay buttons open the correct external listings (if configured).
- [ ] `image-jar.html` can read the catalog, if you choose to publish it.

**Important:** Open the site through a real `https://` web address, **not** by tapping `index.html` directly in the Files app. The browser may block `fetch()` requests for JSON from local `file://` pages.

## 🩷 Step 4 — Connect your domain

If you own a domain, update its DNS records according to the new hosting provider's instructions. DNS changes may take time to propagate. Test the new host before switching DNS so your existing site stays available during the move.

## 🩵 Step 5 — Know what changes after leaving GitHub Pages

**The storefront is host-independent.** It uses relative paths like `./products.json`, `style.css`, and `images/your-art.png`. Those work when all files are kept together.

**GitHub editing links are different:** The Control Room has shortcuts that open files in your GitHub repository. If you edit GitHub after moving, those changes **will not automatically appear on your new host** unless you set up a separate deployment/sync process. Without syncing, you must upload changed files to the new host yourself.

The Control Room is **not a secure admin panel**. Do not upload passwords, secret API keys, or customer records into it. If you want it private, leave `image-jar.html` off the public host and manage your source locally or through an authenticated host panel.

## 🛠️ Troubleshooting

| Problem | Likely cause | What to check |
| --- | --- | --- |
| Homepage gives 404 | `index.html` in the wrong folder | Move the site files to the domain's actual web root |
| Page has no colors | Missing `style.css` | Upload it next to `index.html` |
| Stickers don't appear | Missing `products.json` or JS | Upload `catalog.js` and `products.json`; check browser console |
| Artwork missing | Image path doesn't match | Check `images/` and exact capitalization |
| Editing GitHub doesn't update new site | No automatic sync | Upload changed files to the new host or configure deployment |
| JSON file fails to load | Host permissions, routing, or configuration | Confirm the `.json` file is publicly readable and returns JSON |
| Domain shows old site | DNS or cache | Check DNS, HTTPS, and browser cache |

## 🧰 Beginner-friendly update routine after migration

**Edit your sticker → save `products.json` → upload the changed file to the new host → refresh your website.**

For new artwork: **upload `images/new-sticker.png` → update `products.json` with that path → upload the updated JSON → refresh.**

### Hosting checklist before choosing a provider

Confirm the plan supports: static HTML/CSS/JavaScript, public `.json` files, file uploads or FTP/SFTP, a custom domain, HTTPS/SSL, and enough storage/bandwidth for your images. Ask the provider whether its terms allow your intended storefront and external eBay links.

This guide does not assume a particular HoboHost control panel or guarantee that every HoboHost plan supports these features.
