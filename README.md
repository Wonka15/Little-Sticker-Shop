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
  "editionSize": 25,
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
