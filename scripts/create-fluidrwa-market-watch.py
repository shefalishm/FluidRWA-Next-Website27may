from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import textwrap

ROOT = Path(__file__).resolve().parents[1]
OUT_DIR = ROOT / "outputs" / "social"
PUBLIC_DIR = ROOT / "public" / "assets" / "social"
LOGO = ROOT / "assets" / "fluidrwa-logo.png"

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
BOLD = FONT_DIR / "Arial Bold.ttf"
REGULAR = FONT_DIR / "Arial.ttf"
BLACK = FONT_DIR / "Arial Black.ttf"


def f(path, size):
    return ImageFont.truetype(str(path), size)


def fit_logo(path, max_w, max_h):
    img = Image.open(path).convert("RGBA")
    bg = Image.new("RGBA", img.size, img.getpixel((0, 0)))
    diff = Image.alpha_composite(bg, img).convert("RGB")
    bbox = diff.getbbox()
    if bbox:
        img = img.crop(bbox)
    img.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    return img


def draw_wrapped(draw, text, box, font, fill, line_gap=5, max_lines=4):
    x, y, w, h = box
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = word if not current else current + " " + word
        if draw.textlength(test, font=font) <= w:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    lines = lines[:max_lines]
    if len(lines) == max_lines and len(" ".join(words)) > len(" ".join(lines)):
        lines[-1] = lines[-1].rstrip(".,;:") + "..."
    for line in lines:
        draw.text((x, y), line, font=font, fill=fill)
        y += font.size + line_gap


def badge(draw, center, label, fill, stroke=None):
    x, y = center
    r = 36
    draw.ellipse((x - r, y - r, x + r, y + r), fill=fill, outline=stroke or (255, 255, 255), width=3)
    font = f(BOLD, 18 if len(label) <= 4 else 15)
    tw = draw.textlength(label, font=font)
    bbox = draw.textbbox((0, 0), label, font=font)
    draw.text((x - tw / 2, y - (bbox[3] - bbox[1]) / 2 - 2), label, font=font, fill=(255, 255, 255))


updates = [
    {
        "name": "DTCC",
        "sub": "Market infra",
        "date": "15/07",
        "icon": "D",
        "color": (18, 83, 154),
        "body": "processed live tokenized U.S. securities trades across collateral, repo, lending and DvP workflows.",
    },
    {
        "name": "ISDA + GDF",
        "sub": "Collateral",
        "date": "07/07",
        "icon": "IG",
        "color": (4, 118, 122),
        "body": "published a U.S. tokenized MMF collateral report with input from 120+ firms.",
    },
    {
        "name": "Ownera",
        "sub": "Interop",
        "date": "08/07",
        "icon": "O",
        "color": (51, 96, 213),
        "body": "powered sandbox simulations for TMMF collateral mobility and near real-time settlement.",
    },
    {
        "name": "Robinhood",
        "sub": "RWA chain",
        "date": "01/07",
        "icon": "RH",
        "color": (40, 171, 91),
        "body": "launched Robinhood Chain mainnet for Stock Tokens, 24/7 access and asset productivity.",
    },
    {
        "name": "RWA.xyz",
        "sub": "Market data",
        "date": "20/07",
        "icon": "RWA",
        "color": (28, 123, 224),
        "body": "tracks tokenized RWA markets across public chains, asset classes and issuer activity.",
    },
    {
        "name": "Treasuries",
        "sub": "Tokenized debt",
        "date": "22/07",
        "icon": "T",
        "color": (13, 71, 161),
        "body": "remained the largest tokenized asset category, led by U.S. treasury products.",
    },
    {
        "name": "Nasdaq",
        "sub": "Capital markets",
        "date": "20/07",
        "icon": "N",
        "color": (7, 120, 199),
        "body": "joined DTCC's production event as tokenized market structure moves closer to launch.",
    },
    {
        "name": "Ondo",
        "sub": "Tokenized stocks",
        "date": "21/01",
        "icon": "O",
        "color": (10, 27, 54),
        "body": "brought 200+ tokenized U.S. stocks and ETFs to Solana for onchain access.",
    },
    {
        "name": "EU access",
        "sub": "Regulation",
        "date": "18/11",
        "icon": "EU",
        "color": (45, 86, 190),
        "body": "Ondo received approval to offer tokenized stocks and ETFs across the EU and EEA.",
    },
    {
        "name": "BlackRock",
        "sub": "Tokenized funds",
        "date": "09/06",
        "icon": "BR",
        "color": (20, 20, 20),
        "body": "BUIDL overtook USYC as the largest tokenized fund in May, per CoinDesk Research.",
    },
    {
        "name": "Chainlink",
        "sub": "Asset data",
        "date": "2026",
        "icon": "CL",
        "color": (43, 108, 255),
        "body": "SmartData focuses on NAV, reserves and AUM feeds for tokenized assets.",
    },
    {
        "name": "Tokenized stocks",
        "sub": "Market signal",
        "date": "09/06",
        "icon": "EQ",
        "color": (93, 54, 181),
        "body": "hit a record $2.41B in May as platforms pushed 24/7 equity exposure.",
    },
]


def create():
    W, H = 1920, 1080
    img = Image.new("RGB", (W, H), (246, 249, 252))
    draw = ImageDraw.Draw(img)

    # Subtle FluidRWA background wash
    overlay = Image.new("RGBA", (W, H), (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    od.rectangle((0, 0, W, 150), fill=(255, 255, 255, 235))
    od.rectangle((0, 150, W, H), fill=(246, 249, 252, 255))
    for x in range(0, W, 40):
        od.line((x, 150, x, H), fill=(9, 69, 134, 10), width=1)
    for y in range(150, H, 40):
        od.line((0, y, W, y), fill=(9, 69, 134, 8), width=1)
    od.ellipse((-220, -190, 720, 390), fill=(255, 226, 91, 58))
    od.ellipse((1320, 20, 2160, 740), fill=(58, 182, 226, 50))
    overlay = overlay.filter(ImageFilter.GaussianBlur(0.25))
    img = Image.alpha_composite(img.convert("RGBA"), overlay).convert("RGB")
    draw = ImageDraw.Draw(img)

    navy = (8, 20, 39)
    blue = (33, 105, 199)
    gray = (108, 119, 132)

    logo = fit_logo(LOGO, 250, 86)
    img.paste(logo, (38, 32), logo)
    draw.text((W - 245, 47), "Market Watch", font=f(REGULAR, 34), fill=navy)
    draw.line((40, 130, W - 40, 130), fill=(22, 31, 43), width=4)

    draw.text((46, 175), "Key RWA Updates You Need to Know", font=f(BLACK, 64), fill=navy)
    draw.text((48, 247), "Tokenization, collateral mobility and onchain capital markets signals", font=f(REGULAR, 28), fill=gray)

    left, top = 40, 315
    gap_x, gap_y = 20, 22
    card_w, card_h = 445, 177
    header_h = 72

    for i, item in enumerate(updates):
        col = i % 4
        row = i // 4
        x = left + col * (card_w + gap_x)
        y = top + row * (card_h + gap_y)
        shadow = Image.new("RGBA", (W, H), (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow)
        sd.rectangle((x + 8, y + 10, x + card_w + 8, y + card_h + 10), fill=(0, 0, 0, 22))
        shadow = shadow.filter(ImageFilter.GaussianBlur(12))
        img = Image.alpha_composite(img.convert("RGBA"), shadow).convert("RGB")
        draw = ImageDraw.Draw(img)

        draw.rounded_rectangle((x, y, x + card_w, y + card_h), radius=0, fill=(255, 255, 255), outline=(225, 232, 240), width=1)
        draw.rectangle((x, y, x + card_w, y + header_h), fill=(240, 244, 249))
        badge(draw, (x + 58, y + 37), item["icon"], item["color"])
        draw.text((x + 108, y + 20), item["name"], font=f(REGULAR, 30), fill=navy)
        draw.text((x + 108, y + 49), item["sub"], font=f(REGULAR, 22), fill=(128, 134, 142))
        draw.text((x + card_w - 86, y + 21), item["date"], font=f(REGULAR, 24), fill=(121, 126, 133))
        draw_wrapped(draw, item["body"], (x + 28, y + 96, card_w - 54, card_h - 112), f(REGULAR, 22), fill=(93, 101, 111), line_gap=3, max_lines=3)
        # Brand corner accent
        draw.polygon([(x + card_w - 54, y + card_h), (x + card_w, y + card_h - 54), (x + card_w, y + card_h)], fill=(255, 206, 65))
        draw.polygon([(x + card_w - 29, y + card_h), (x + card_w, y + card_h - 29), (x + card_w, y + card_h)], fill=blue)

    footer_y = 1012
    draw.line((40, footer_y, W - 40, footer_y), fill=(22, 31, 43), width=4)
    draw.text((40, 1037), "23rd July 2026", font=f(REGULAR, 34), fill=navy)
    draw.text((W - 820, 1037), "fluidrwa.com  |  Source-backed RWA market watch", font=f(REGULAR, 22), fill=navy)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    PUBLIC_DIR.mkdir(parents=True, exist_ok=True)
    out = OUT_DIR / "fluidrwa-market-watch-rwa-updates.png"
    public = PUBLIC_DIR / "fluidrwa-market-watch-rwa-updates.png"
    img.save(out, quality=95)
    img.save(public, quality=95)
    print(out)
    print(public)


if __name__ == "__main__":
    create()
