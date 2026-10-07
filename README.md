# UtilityHub

Simple, fast online tools for everyday tasks — no login required.

**Live:** https://tools.aspmovies.dpdns.org/

**Tools:** Image Compressor · Image Resizer (with background removal) · PDF Editor · Merge PDF · QR Generator · Text Tools · Password Generator · URL Encoder/Decoder · JSON Formatter · Unit Converter · Calculator Tools

## Structure

```
public/          # everything served to visitors
  index.html     # homepage (search + categories)
  app.js         # homepage search/filter logic
  tools/         # one self-contained page per tool
  tool.css       # styles shared by the tool pages (linked before each page's own <style>)
  sitemap.xml  robots.txt
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

## SEO

After adding or removing a tool page, refresh canonical URLs, the sitemap and robots.txt:

```
python3 seo.py https://tools.aspmovies.dpdns.org
```

## Adding a tool

1. Add `public/tools/<name>.html` (include a unique title and meta description).
2. Add a card to `public/index.html` with `data-category` and `data-name` keywords.
3. Re-run `seo.py` to refresh canonical URLs and the sitemap.
4. For a new tool page, link `/tool.css` before its `<style>` and define the theme variables (`--bg`, `--text`, `--panel`, …) in `:root` — see `json-formatter.html` as a template.
