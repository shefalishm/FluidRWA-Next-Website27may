import csv
import html
import json
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urlparse


class Page(HTMLParser):
    def __init__(self, source):
        super().__init__()
        self.in_title = False
        self.title = ""
        self.images = []
        self.links = []
        self.canonical = None
        self.feed(source)

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == "title":
            self.in_title = True
        if tag == "img":
            self.images.append(attrs)
        if tag == "a":
            self.links.append(attrs.get("href", ""))
        if tag == "link" and attrs.get("rel") == "canonical":
            self.canonical = attrs.get("href")

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False

    def handle_data(self, value):
        if self.in_title:
            self.title += value


with open("docs/bing-site-scan-title-urls-2026-11-19.csv", encoding="utf-8-sig", newline="") as source:
    rows = list(csv.reader(source))[1:]
assert len(rows) == 189
paths = list(dict.fromkeys(urlparse(row[0]).path for row in rows))
assert len(paths) == 163
for path in paths:
    source = Path(f".next/server/app{path}.html").read_text()
    page = Page(source)
    assert 0 < len(page.title) < 70, (path, len(page.title), page.title)
    assert page.canonical, f"Missing canonical: {path}"
    if path == "/tokenization-readiness-assessment-tool":
        assert "?" not in page.canonical, "Campaign variants need the clean canonical"

for path in ["/index", "/vendors/smart-contract-development-companies"]:
    page = Page(Path(f".next/server/app{path}.html").read_text())
    assert page.images
    assert all(image.get("alt", "").strip() for image in page.images), (path, page.images)

directory = Path(".next/server/app/web3vendorecosystem.html").read_text()
size = len(directory.encode())
assert size < 1_000_000, f"Directory HTML still too large: {size}"
assert 'data-src="/assets/datasets/vendor-search-index.json"' in directory
assert directory.count('class="vendor-card ') >= 270, "Existing vendor cards must remain server rendered"
assert '/fluidrwa/tokenizer-estate' in directory, "Company profile links must remain crawlable"
asset = json.loads(Path("public/assets/datasets/vendor-search-index.json").read_text())
assert len(asset) == 835, "The search index must preserve every existing row"
assert all(row.get("name") and row.get("href") for row in asset)
assert Path("assets/site.js").read_bytes() == Path("public/assets/site.js").read_bytes()
assert 'alt={`News illustration: ${item.title}`}' in Path("app/news/page.tsx").read_text()
titles = json.loads(Path("data/search-titles.json").read_text())
assert all(0 < len(title) < 70 for title in titles.values())
assert len(set(titles.values())) == len(titles), "Reviewed search titles must be unique"
print(f"PASS: all 189 title URLs ({len(paths)} paths), clean canonicals, image labels, all 835 search records and crawlable vendor cards; directory HTML {size:,} bytes.")
