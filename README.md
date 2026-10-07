# UtilityHub

Simple, fast online tools for everyday tasks — no login required.

**Tools:** Image Compressor · Image Resizer (with background removal) · PDF Editor · QR Generator · Text Tools · Password Generator · URL Encoder/Decoder · Calculator Tools

## Structure

```
public/          # everything served to visitors
  index.html     # homepage (search + categories)
  app.js         # homepage search/filter logic
  tools/         # one self-contained page per tool
  404.html  _headers  favicon.svg
wrangler.jsonc   # Cloudflare Workers static assets config
seo.py           # adds canonical URLs, sitemap.xml and robots.txt
```

## Run locally

```
npx wrangler dev
```

## Deploy

```
npx wrangler deploy
```

## SEO (after you know your domain)

```
python3 seo.py https://your-domain.com
```

## Adding a tool

1. Add `public/tools/<name>.html` (include a unique title and meta description).
2. Add a card to `public/index.html` with `data-category` and `data-name` keywords.
3. Re-run `seo.py` to refresh the sitemap.
