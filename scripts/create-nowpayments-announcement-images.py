from pathlib import Path
import math

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
FLUID_LOGO = ROOT / "assets" / "fluidrwa-small-logo.png"
NOWPAYMENTS_LOGO = ROOT / "public" / "assets" / "company-logos" / "nowpayments.png"
OUT_DIR = ROOT / "public" / "assets" / "news"
FONT_DIR = Path("/System/Library/Fonts/Supplemental")


def font(name, size):
    return ImageFont.truetype(str(FONT_DIR / name), size)


def fit_logo(path, max_w, max_h, trim_white=False):
    image = Image.open(path).convert("RGBA")
    if trim_white:
        rgb = image.convert("RGB")
        pixels = rgb.load()
        points = [
            (x, y)
            for y in range(rgb.height)
            for x in range(rgb.width)
            if min(pixels[x, y]) < 245
        ]
        if points:
            xs, ys = zip(*points)
            image = image.crop((min(xs), min(ys), max(xs) + 1, max(ys) + 1))
    else:
        box = image.getbbox()
        if box:
            image = image.crop(box)
    image.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    return image


def draw_logo_card(canvas, center, logo_path, trim_white=False):
    w, h = canvas.size
    card_w, card_h = int(w * 0.25), int(h * 0.18)
    x, y = int(center[0] - card_w / 2), int(center[1] - card_h / 2)
    shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
    ImageDraw.Draw(shadow).rounded_rectangle(
        (x, y + 12, x + card_w, y + card_h + 12), radius=20, fill=(0, 0, 0, 72)
    )
    canvas.alpha_composite(shadow.filter(ImageFilter.GaussianBlur(18)))
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        (x, y, x + card_w, y + card_h), radius=20, fill=(255, 255, 255, 250), outline=(255, 255, 255, 90)
    )
    logo = fit_logo(logo_path, int(card_w * 0.82), int(card_h * 0.62), trim_white=trim_white)
    canvas.alpha_composite(logo, (int(center[0] - logo.width / 2), int(center[1] - logo.height / 2)))


def draw_centered_wrapped(draw, text, y, typeface, fill, max_width, gap):
    words, lines, current = text.split(), [], ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        if draw.textbbox((0, 0), trial, font=typeface)[2] <= max_width:
            current = trial
        else:
            lines.append(current)
            current = word
    if current:
        lines.append(current)
    for line in lines:
        box = draw.textbbox((0, 0), line, font=typeface)
        draw.text(((draw._image.width - (box[2] - box[0])) / 2, y), line, font=typeface, fill=fill)
        y += box[3] - box[1] + gap


def create(size, filename):
    w, h = size
    image = Image.new("RGB", size, "#071426")
    pixels = image.load()
    for y in range(h):
        for x in range(w):
            nx, ny = x / w, y / h
            blue_glow = max(0, 1 - math.hypot(nx - 0.82, ny - 0.25) * 1.7)
            pixels[x, y] = (
                int(7 + 8 * nx),
                int(20 + 25 * nx + 28 * blue_glow),
                int(38 + 42 * nx + 55 * blue_glow),
            )
    image = image.convert("RGBA")
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    overlay_draw = ImageDraw.Draw(overlay)
    for x in range(0, w, max(60, w // 18)):
        overlay_draw.line((x, 0, x, h), fill=(255, 255, 255, 9), width=1)
    for y in range(0, h, max(60, h // 12)):
        overlay_draw.line((0, y, w, y), fill=(255, 255, 255, 7), width=1)
    image = Image.alpha_composite(image, overlay)
    draw = ImageDraw.Draw(image)

    top = font("Arial Bold.ttf", int(w * 0.014))
    small = font("Arial Bold.ttf", int(w * 0.012))
    title_face = font("Arial Black.ttf", int(w * 0.028))
    body = font("Arial.ttf", int(w * 0.022))
    footer = font("Arial Bold.ttf", int(w * 0.013))
    accent = (100, 172, 255, 255)
    muted = (177, 190, 207, 220)

    draw.text((w * 0.047, h * 0.062), "V E T T E D   V E N D O R   A N N O U N C E M E N T", font=top, fill=accent)
    label = "STABLECOIN INFRASTRUCTURE"
    label_box = draw.textbbox((0, 0), label, font=small)
    draw.text((w - (label_box[2] - label_box[0]) - w * 0.047, h * 0.062), label, font=small, fill=muted)

    logo_y = h * 0.31
    draw_logo_card(image, (w * 0.35, logo_y), FLUID_LOGO)
    draw_logo_card(image, (w * 0.65, logo_y), NOWPAYMENTS_LOGO, trim_white=True)
    bridge = font("Arial.ttf", int(w * 0.03))
    draw.text((w * 0.5, logo_y), ">", font=bridge, fill=muted, anchor="mm")

    headline = "FluidRWA welcomes NOWPayments as a new vetted vendor"
    box = draw.textbbox((0, 0), headline, font=title_face)
    draw.text(((w - (box[2] - box[0])) / 2, h * 0.43), headline, font=title_face, fill="white")
    draw_centered_wrapped(
        draw,
        "NOWPayments joins FluidRWA as a new vetted vendor for crypto payments, stablecoin settlement, treasury tools and Mass Payouts.",
        h * 0.55,
        body,
        (226, 232, 242, 238),
        w * 0.64,
        int(h * 0.018),
    )

    draw.line((w * 0.047, h * 0.82, w * 0.953, h * 0.82), fill=(255, 255, 255, 45), width=1)
    draw.text((w * 0.047, h * 0.855), "fluidrwa.com  |  NOWPayments", font=footer, fill=muted)
    right = "30 STABLECOIN PROVIDERS"
    right_box = draw.textbbox((0, 0), right, font=footer)
    draw.text((w - (right_box[2] - right_box[0]) - w * 0.047, h * 0.855), right, font=footer, fill=muted)

    OUT_DIR.mkdir(parents=True, exist_ok=True)
    image.convert("RGB").save(OUT_DIR / filename, quality=94, optimize=True)


if __name__ == "__main__":
    create((1200, 675), "nowpayments-featured-on-fluidrwa-og.jpg")
    create((1600, 900), "nowpayments-featured-on-fluidrwa-cover.jpg")
    print("Created NOWPayments announcement images.")
