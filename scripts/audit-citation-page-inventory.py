import csv
import hashlib
import json
import re
import sys
import subprocess
from pathlib import Path
from urllib.parse import urlparse

root = Path(sys.argv[1])
source = Path("/Users/shefalisharma/Downloads/fluidrwa.com_AIPageStatsReport_11_16_2026.csv")
rows = list(csv.DictReader(source.open(encoding="utf-8-sig", newline="")))
prerender = json.loads((root / ".next/prerender-manifest.json").read_text())["routes"]
redirects = json.loads((root / ".next/routes-manifest.json").read_text())["redirects"]
results = []
for row in rows:
    route = urlparse(row["Page"]).path.rstrip("/") or "/"
    slug = route.rsplit("/", 1)[-1]
    md = root / "content/blog" / (slug + ".md")
    html_path = root / route.lstrip("/") / "index.html"
    if route == "/":
        html_path = root / "index.html"
    if not html_path.exists():
        html_path = root / (route.lstrip("/") + ".html")
    text = md.read_text() if md.exists() else ""
    body = text.split("---", 2)[2] if text else ""
    previous = subprocess.run(["git", "show", "4fbe686:" + str(md.relative_to(root))], cwd=root, capture_output=True, text=True).stdout if text else ""
    previous_body = previous.split("---", 2)[2] if previous else ""
    html = html_path.read_text() if html_path.exists() else ""
    dynamic = route.startswith("/use-cases/") and ('slug: "' + slug + '"') in (root / "lib/useCases.ts").read_text()
    results.append({
        "url": row["Page"], "reportedCitations": int(row["Citations"]),
        "citationDelta": None,
        "lossStatus": "Not determinable from aggregate export",
        "routeFoundLocally": bool(text or html or dynamic or route in prerender or any(r["source"] == route for r in redirects)),
        "sourceType": "blog-markdown" if text else "dynamic-use-case" if dynamic else "static-html" if html else "built-route" if route in prerender else "redirect" if any(r["source"] == route for r in redirects) else "needs-route-review",
        "sourceWords": len(re.findall(r"\b\w+(?:[-'][\w]+)*\b", body)) if body else None,
        "previousSourceWords": len(re.findall(r"\b\w+(?:[-'][\w]+)*\b", previous_body)) if previous_body else None,
        "bodyUpdatedInThisRelease": body != previous_body if body else route == "/use-cases/digital-asset-tax-reporting-cost-basis-operations",
        "externalSourceLinks": len(set(re.findall(r"https?://[^\s)\"<>]+", body))) if body else None,
        "faqSchema": "FAQPage" in html if html else None,
        "modifiedDate": (re.search(r'^modifiedDate: "([^"]+)"', text, re.M).group(1) if re.search(r'^modifiedDate: "([^"]+)"', text, re.M) else None),
        "liveRetest": "Not performed by this local inventory",
    })
output = {"source": str(source), "sourceSha256": hashlib.sha256(source.read_bytes()).hexdigest(), "exportDate": "2026-11-16", "auditDate": "2026-11-19", "periodStart": None, "periodEnd": None, "caveat": "Aggregate totals are not daily loss evidence. No before/after deltas or live citation outcomes have been invented.", "pages": results}
if len(sys.argv) > 2:
    Path(sys.argv[2]).write_text(json.dumps(output, indent=2) + "\n")
print(json.dumps({"pages": len(results), "blogPages": sum(r["sourceType"] == "blog-markdown" for r in results), "below1000Words": sum(r["sourceWords"] is not None and r["sourceWords"] < 1000 for r in results), "routeReview": [r["url"] for r in results if not r["routeFoundLocally"]]}, indent=2))
