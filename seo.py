#!/usr/bin/env python3
"""Usage: python3 seo.py https://your-domain.com
Adds canonical + og:url to every page and writes public/sitemap.xml and public/robots.txt.
Safe to re-run."""
import sys, re, pathlib
if len(sys.argv) != 2: sys.exit(__doc__)
base = sys.argv[1].rstrip("/")
pub = pathlib.Path(__file__).parent / "public"
urls = []
for f in sorted(pub.rglob("*.html")):
    if f.name == "404.html": continue
    rel = f.relative_to(pub).as_posix()
    url = base + "/" + ("" if rel == "index.html" else rel)
    urls.append(url)
    s = open(f, newline="").read()
    nl = "\r\n" if "\r\n" in s else "\n"
    s = re.sub(r'\s*<link rel="canonical"[^>]*>|\s*<meta property="og:url"[^>]*>', "", s)
    tag = f'{nl}    <link rel="canonical" href="{url}">{nl}    <meta property="og:url" content="{url}">'
    s = s.replace("</title>", "</title>" + tag, 1)
    open(f, "w", newline="").write(s)
(pub / "sitemap.xml").write_text('<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n' + "".join(f"  <url><loc>{u}</loc></url>\n" for u in urls) + "</urlset>\n")
(pub / "robots.txt").write_text(f"User-agent: *\nAllow: /\n\nSitemap: {base}/sitemap.xml\n")
print(f"Done: {len(urls)} pages")
