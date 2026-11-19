import csv
import hashlib
import json
from pathlib import Path

root = Path(__file__).resolve().parents[1]
folder = Path("/Users/shefalisharma/Downloads")
files = [folder / "www.fluidrwa.com_AIPageStatsReport_11_19_2026.csv", folder / "www.fluidrwa.com_AIPageStatsReport_11_19_2026 (1).csv"]
def read(file):
    return {row["Page"]: int(row["Citations"]) for row in csv.DictReader(file.open(encoding="utf-8-sig", newline=""))}
before, after = [read(file) for file in files]
pages = []
for url in sorted(set(before) | set(after)):
    a, b = before.get(url, 0), after.get(url, 0)
    pages.append({"url": url, "beforeReported": a, "afterReported": b, "deltaReported": b-a, "declinePercent": round(100*(a-b)/a, 2) if a else None, "status": "not_in_later_export" if a and url not in after else "declined" if b<a else "increased" if b>a else "unchanged", "queryAttribution": "Not supplied by the page export", "replacementCitation": None})
pages.sort(key=lambda row: row["deltaReported"])
report = {"observedAt": "2026-11-20", "site": "https://www.fluidrwa.com/", "beforePeriod": {"start": "2026-10-20", "end": "2026-11-02", "days": 14}, "afterPeriod": {"start": "2026-11-05", "end": "2026-11-18", "days": 14}, "sourceEvidence": "Downloaded through Bing AI Performance Pages UI after observing each custom date range. Export filename date differs from download date.", "sourceFiles": [{"name": file.name, "sha256": hashlib.sha256(file.read_bytes()).hexdigest()} for file in files], "caveat": "Bing describes this report as a sample of overall activity. Absence means not listed in that export, not proof of zero citations in every AI response. No causal or competitor attribution follows from a page count.", "summary": {"beforePages": len(before), "afterPages": len(after), "beforeReportedCitations": sum(before.values()), "afterReportedCitations": sum(after.values()), "declined": sum(row["deltaReported"]<0 for row in pages), "noLongerListed": sum(row["status"]=="not_in_later_export" for row in pages), "increased": sum(row["deltaReported"]>0 for row in pages)}, "pages": pages}
(root / "data/bing-citation-period-comparison-2026-11-20.json").write_text(json.dumps(report, indent=2)+"\n")
print(json.dumps({"summary":report["summary"], "topDeclines":pages[:20]}, indent=2))
