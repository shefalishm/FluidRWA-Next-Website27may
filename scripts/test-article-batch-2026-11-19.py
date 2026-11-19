import json
import re
import sys
from html.parser import HTMLParser
from pathlib import Path
from urllib.request import urlopen

ROOT = Path(__file__).resolve().parents[1]
BATCH = json.loads((ROOT / "data/article-batch-2026-11-19.json").read_text())
BASE_URL = sys.argv[1].rstrip("/") if len(sys.argv) > 1 else None


class Page(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags = []
        self.title = ""
        self.h1 = ""
        self.scripts = []
        self.capture = None
        self.buffer = ""

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        self.tags.append((tag, attrs))
        if tag in ("title", "h1") or (tag == "script" and attrs.get("type") == "application/ld+json"):
            self.capture = tag
            self.buffer = ""

    def handle_data(self, data):
        if self.capture:
            self.buffer += data

    def handle_endtag(self, tag):
        if tag == self.capture:
            if tag == "script":
                self.scripts.append(json.loads(self.buffer))
            else:
                setattr(self, tag, self.buffer)
            self.capture = None


results = []
all_paragraphs = set()
for item in BATCH:
    slug = item["slug"]
    source = (ROOT / "content/blog" / f"{slug}.md").read_text()
    body = source.split("---", 2)[2]
    readable = re.sub(r"\[([^]]+)\]\([^)]+\)", r"\1", body)
    words = len(re.findall(r"\b\w+(?:[-'][\w]+)*\b", readable))
    assert words >= 3000, (slug, words)
    assert "\u2014" not in source, slug
    paragraphs = [p for p in body.split("\n\n") if len(p.split()) > 35 and not p.startswith("|")]
    for paragraph in paragraphs:
        assert paragraph not in all_paragraphs, f"Repeated long paragraph: {slug}"
        all_paragraphs.add(paragraph)
    if BASE_URL:
        with urlopen(f"{BASE_URL}/blog/{slug}", timeout=30) as response:
            assert response.status == 200, slug
            html = response.read().decode()
    else:
        html = (ROOT / "blog" / slug / "index.html").read_text()
    page = Page()
    page.feed(html)
    assert 0 < len(page.title) < 70, (slug, page.title)
    assert len([1 for tag, _ in page.tags if tag == "h1"]) == 1, slug
    canonical = f"https://www.fluidrwa.com/blog/{slug}"
    assert any(tag == "link" and attrs.get("rel") == "canonical" and attrs.get("href") == canonical for tag, attrs in page.tags), slug
    description = next(attrs["content"] for tag, attrs in page.tags if tag == "meta" and attrs.get("name") == "description")
    assert 80 <= len(description) <= 180, (slug, len(description))
    graph = []
    for script in page.scripts:
        graph.extend(script.get("@graph", [script]))
    faq = next(part for part in graph if part["@type"] == "FAQPage")
    assert len(faq["mainEntity"]) >= 4, slug
    assert 'class="faq-list"' in html and 'class="answer-box"' in html, slug
    article = next(part for part in graph if part["@type"] == "Article")
    assert article["datePublished"] == "2026-11-19", slug
    assert len(article["citation"]) >= 2, slug
    for tag, attrs in page.tags:
        if tag == "img":
            assert attrs.get("alt"), (slug, attrs)
        if tag == "a" and attrs.get("href", "").startswith("/blog/"):
            target = attrs["href"].split("#")[0].split("?")[0].strip("/")
            assert (ROOT / target / "index.html").exists(), (slug, target)
    ids = [attrs["id"] for _, attrs in page.tags if "id" in attrs]
    assert len(ids) == len(set(ids)), (slug, "duplicate IDs")
    for href in re.findall(r'href="(#.*?)"', html):
        assert href[1:] in ids, (slug, href)
    images = dict(re.findall(r'^(image|socialImage): "([^"]+)"$', source, re.M))
    for image in images.values():
        relative = Path(image.lstrip("/"))
        assert (ROOT / relative).read_bytes() == (ROOT / "public" / relative).read_bytes(), slug
    assert (ROOT / images["image"].lstrip("/")).stat().st_size < 81920, slug
    for index in ["blog.html", "sitemap.xml", "llms.txt"]:
        assert f"/blog/{slug}" in (ROOT / index).read_text(), (slug, index)
    results.append({"slug": slug, "bodyWords": words, "titleLength": len(page.title), "faqs": len(faq["mainEntity"]), "sources": len(article["citation"])})

print(json.dumps(results, indent=2))
print("PASS: seven 3,000+ word articles, unique prose, metadata, FAQs, source links, internal links, images and discovery.")
