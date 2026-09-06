"""Read generated HTML without executing scripts or submitting forms."""
import collections
import json
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import urljoin, urlsplit, unquote


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1 = 0
        self.in_title = False
        self.title = ""
        self.description = ""
        self.canonical = ""
        self.links = []
        self.images = []
        self.json_ld_errors = []
        self.json_ld = None

    def handle_starttag(self, tag, attrs):
        a = dict(attrs)
        if tag == "h1":
            self.h1 += 1
        if tag == "title":
            self.in_title = True
        if tag == "meta" and a.get("name") == "description":
            self.description = a.get("content", "")
        if tag == "link" and a.get("rel") == "canonical":
            self.canonical = a.get("href", "")
        if tag == "a" and a.get("href"):
            self.links.append(a["href"])
        if tag == "img":
            self.images.append(a)
        if tag == "script" and a.get("type") == "application/ld+json":
            self.json_ld = ""

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        if self.json_ld is not None:
            self.json_ld += data

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        if tag == "script" and self.json_ld is not None:
            try:
                json.loads(self.json_ld)
            except ValueError as error:
                self.json_ld_errors.append(str(error))
            self.json_ld = None


root = Path.cwd()
built = root / ".next/server/app"
rows = []
for file in sorted(built.rglob("*.html")):
    route = "/" + str(file.relative_to(built).with_suffix(""))
    if route == "/index":
        route = "/"
    if route.startswith("/_"):
        continue
    page = Page()
    page.feed(file.read_text())
    missing_images = []
    for img in page.images:
        source = img.get("src", "")
        url = urlsplit(urljoin("https://www.fluidrwa.com" + route, source))
        if url.hostname == "www.fluidrwa.com" and url.path.startswith("/assets/"):
            if not (root / "public" / unquote(url.path.lstrip("/"))).is_file():
                missing_images.append(url.path)
    rows.append({"route": route, "title": page.title, "description": page.description,
                 "h1_count": page.h1, "canonical": page.canonical,
                 "missing_image_files": sorted(set(missing_images)),
                 "images_without_alt": sum("alt" not in i for i in page.images),
                 "json_ld_errors": page.json_ld_errors,
                 "buyer_cta": any("submit-requirement" in x for x in page.links),
                 "readiness_cta": any("tokenization-readiness" in x for x in page.links)})
titles = collections.defaultdict(list)
for row in rows:
    titles[row["title"]].append(row["route"])
report = {"scope": "Generated HTML only; excludes dynamic routes, interaction and remote asset availability.",
          "page_count": len(rows),
          "duplicate_title_groups": {k: v for k, v in titles.items() if len(v) > 1},
          "issues": [r for r in rows if r["h1_count"] != 1 or not r["description"] or not r["canonical"] or r["missing_image_files"] or r["json_ld_errors"]],
          "pages": rows}
output = Path(sys.argv[1])
output.parent.mkdir(parents=True, exist_ok=True)
output.write_text(json.dumps(report, indent=2))
print(json.dumps({"pages": len(rows), "flagged": len(report["issues"]), "duplicate_title_groups": len(report["duplicate_title_groups"]), "report": str(output)}, indent=2))
