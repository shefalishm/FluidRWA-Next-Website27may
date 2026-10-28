#!/usr/bin/env python3
"""Check structural parity of the full Spanish pages before deployment."""

import importlib.util
import re
from collections import Counter
from pathlib import Path

from lxml import html

ROOT = Path(__file__).resolve().parent.parent
spec = importlib.util.spec_from_file_location("spanish_builder", ROOT / "scripts" / "build-spanish-full-pages.py")
builder = importlib.util.module_from_spec(spec)
spec.loader.exec_module(builder)


def count(document, expression):
    return len(document.xpath(expression))


errors = []
for route, relative in builder.SOURCES.items():
    source = html.fromstring((ROOT / relative).read_text(encoding="utf-8"))
    output_path = builder.OUTPUT / f"{builder.local_path(route)}.html"
    if not output_path.exists():
        errors.append(f"{route}: full page missing")
        continue
    output_text = output_path.read_text(encoding="utf-8")
    target = html.fromstring(output_text)
    if target.get("lang") != "es":
        errors.append(f"{route}: wrong document language")
    if not target.xpath("//link[@rel='canonical' and starts-with(@href,'https://www.fluidrwa.com/es')]"):
        errors.append(f"{route}: Spanish canonical missing")
    if not target.xpath("//link[@rel='alternate' and @hreflang='en']"):
        errors.append(f"{route}: English alternate missing")
    if re.search(r"(?:⟦(?:BRAND|MARCA|ZK)\d+Z?⟧|\bZK\d+Z\b)", output_text):
        errors.append(f"{route}: translation placeholder leaked")
    for calque in ("ojeada", "financiamiento fiduciario", "las permisos", "encendido/apagado", "Commerciantes", "Repuestaquiz", "Cuidador calificado", "valores cotizados en moneda fiduciaria"):
        if calque.lower() in output_text.lower():
            errors.append(f"{route}: unreviewed literal translation: {calque}")
    for label, expression in {
        "headings": "//main//h1|//main//h2|//main//h3",
        "tables": "//main//table",
        "images": "//main//img",
        "anchors": "//main//a[@href]",
    }.items():
        original = count(source, expression)
        actual = count(target, expression)
        if route == "/vendors/crypto-custody-providers" and label == "anchors":
            original += 2
        if actual != original:
            errors.append(f"{route}: {label} changed from {original} to {actual}")
    image_without_alt = target.xpath("//main//img[not(@alt)]")
    if image_without_alt:
        errors.append(f"{route}: {len(image_without_alt)} main images lack alt text")
    english_words = len(re.findall(r"\b[A-Za-zÀ-ÿ]+\b", " ".join(source.xpath("//main//text()"))))
    spanish_words = len(re.findall(r"\b[A-Za-zÀ-ÿ]+\b", " ".join(target.xpath("//main//text()"))))
    if english_words and spanish_words < english_words * 0.7:
        errors.append(f"{route}: translated body unexpectedly short ({spanish_words}/{english_words})")
    source_main = " ".join(source.xpath("//main//text()"))
    target_main = " ".join(target.xpath("//main//text()"))
    for name in builder.EXTRA_NAMES:
        if name in source_main and name not in target_main:
            errors.append(f"{route}: company name lost: {name}")
    source_vendors = [item.text_content().strip() for item in source.xpath("//*[contains(concat(' ', normalize-space(@class), ' '), ' vendor-card ')]//h3")]
    target_vendors = [item.text_content().strip() for item in target.xpath("//*[contains(concat(' ', normalize-space(@class), ' '), ' vendor-card ')]//h3")]
    if source_vendors != target_vendors:
        errors.append(f"{route}: vendor card names changed")
    source_profiles = [item.text_content().strip() for item in source.xpath("//*[contains(concat(' ', normalize-space(@class), ' '), ' vendor-profile-index-card ')]//a")]
    target_profiles = [item.text_content().strip() for item in target.xpath("//*[contains(concat(' ', normalize-space(@class), ' '), ' vendor-profile-index-card ')]//a")]
    if source_profiles != target_profiles:
        errors.append(f"{route}: profile index names changed")
    source_marks = [item.text_content().strip() for item in source.xpath("//*[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-mark ')]")]
    target_marks = [item.text_content().strip() for item in target.xpath("//*[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-mark ')]")]
    if (sorted(source_marks) != sorted(target_marks) if route == "/vendors/tokenization-platforms" else source_marks != target_marks):
        errors.append(f"{route}: vendor monogram changed")
    if route == "/vendors/tokenization-platforms":
        cards = target.xpath("//div[contains(concat(' ', normalize-space(@class), ' '), ' bc-company-grid ')]/article")
        if len(cards) < 10 or cards[9].get("id") != "zoniqx":
            errors.append(f"{route}: Zoniqx is not in the tenth position")
    source_links = Counter(builder.rewrite_link(link, route) for link in source.xpath("//main//a/@href"))
    if route == "/vendors/crypto-custody-providers":
        source_links.update([
            "/blog/crypto-custody-insurance-coverage-due-diligence",
            "/blog/wallet-apis-asset-tokenization-platforms",
        ])
    target_links = Counter(target.xpath("//main//a/@href"))
    if source_links != target_links:
        errors.append(f"{route}: main content links changed")
    print(f"{route}: {spanish_words} words, {count(target, '//main//table')} tables, {count(target, '//main//img')} images")

if errors:
    raise SystemExit("\n".join(errors))
print("Spanish full-page structure verified")
