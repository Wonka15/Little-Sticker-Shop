## 🎨 Start here: Color-coded editing handbook

**New to editing the site?** Open [HANDBOOK.md](HANDBOOK.md) for the color-coded map of every file, sticker image export sizes, editing instructions, portfolio projects, and eBay links.

# Little Sticker Drops — Beginner's Guide 🎨

Welcome! Your storefront is a static HTML/CSS/JavaScript site with a **single product catalog file**. No database or checkout server is required.

> **Important hosting note:** GitHub Pages is free for public projects, but GitHub's policy disallows using Pages as free hosting for an e-commerce site. Keep this repository as your code home and use a commerce-permitting host before selling. https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits

## Your project map

| File | What it does |
| --- | --- |
| `products.json` | ⭐ **Edit this to add, hide, or change stickers** |
| `catalog.js` | Reads products.json and creates the cards automatically |
| `index.html` | The home page structure |
| `style.css` | Colors, layout, mobile design |
| `policies.html` | Draft shipping and returns information |
| `images/` | Put optimized sticker pictures here (create this folder when needed) |

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

## Future rebrand

The shop name is intentionally unchanged until a final name is selected. To rebrand, update the visible name in `index.html` and `policies.html`, the page titles, and the copy in the README and handbook. Rename the GitHub repository only if you also plan to update the GitHub Pages address and any external links.
