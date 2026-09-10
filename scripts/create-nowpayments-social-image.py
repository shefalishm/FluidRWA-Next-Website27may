from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont


ROOT = Path(__file__).resolve().parents[1]
BACKGROUND = ROOT / "public" / "assets" / "social" / "nowpayments-vetted-vendor-background-v2.png"
FLUID_LOGO = ROOT / "assets" / "fluidrwa-small-logo.png"
NOWPAYMENTS_LOGO = ROOT / "public" / "assets" / "company-logos" / "nowpayments.png"
OUTPUT = ROOT / "public" / "assets" / "social" / "nowpayments-vetted-vendor-social-v2.png"
FONT_DIR = Path("/System/Library/Fonts/Supplemental")


def font(name, size):
    return ImageFont.truetype(str(FONT_DIR / name), size)


def cover_crop(image, size):
    target_w, target_h = size
    scale = max(target_w / image.width, target_h / image.height)
    resized = image.resize((round(image.width * scale), round(image.height * scale)), Image.Resampling.LANCZOS)
    left = (resized.width - target_w) // 2
    top = (resized.height - target_h) // 2
    return resized.crop((left, top, left + target_w, top + target_h))


def trim_white(image):
    rgb = image.convert("RGB")
    pixels = rgb.load()
    points = [
        (x, y)
        for y in range(rgb.height)
        for x in range(rgb.width)
        if min(pixels[x, y]) < 245
    ]
    if not points:
        return image
    xs, ys = zip(*points)
    return image.crop((min(xs), min(ys), max(xs) + 1, max(ys) + 1))


def place_logo(canvas, path, box, trim=False):
    x1, y1, x2, y2 = box
    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(box, radius=18, fill=(255, 255, 255, 246), outline=(255, 255, 255, 170), width=1)
    logo = Image.open(path).convert("RGBA")
    if trim:
        logo = trim_white(logo)
    else:
        alpha_box = logo.getbbox()
        if alpha_box:
            logo = logo.crop(alpha_box)
    logo.thumbnail((int((x2 - x1) * 0.78), int((y2 - y1) * 0.58)), Image.Resampling.LANCZOS)
    canvas.alpha_composite(logo, (int((x1 + x2 - logo.width) / 2), int((y1 + y2 - logo.height) / 2)))


def centered_text(draw, text, y, typeface, fill, canvas_width):
    box = draw.textbbox((0, 0), text, font=typeface)
    draw.text(((canvas_width - (box[2] - box[0])) / 2, y), text, font=typeface, fill=fill)


def create():
    size = (1200, 675)
    background = cover_crop(Image.open(BACKGROUND).convert("RGB"), size).convert("RGBA")
    tint = Image.new("RGBA", size, (255, 255, 255, 28))
    canvas = Image.alpha_composite(background, tint)

    glass = Image.new("RGBA", size, (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(glass)
    shadow_draw.rounded_rectangle((69, 47, 1131, 614), radius=30, fill=(30, 83, 128, 62))
    glass = glass.filter(ImageFilter.GaussianBlur(18))
    canvas = Image.alpha_composite(canvas, glass)

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        (70, 38, 1130, 605),
        radius=28,
        fill=(248, 252, 255, 232),
        outline=(132, 184, 226, 150),
        width=2,
    )

    eyebrow = font("Arial Bold.ttf", 17)
    label = "NEW VETTED VENDOR  |  STABLECOIN INFRASTRUCTURE PROVIDERS"
    centered_text(draw, label, 70, eyebrow, (35, 105, 169, 255), size[0])

    place_logo(canvas, FLUID_LOGO, (280, 118, 550, 220))
    place_logo(canvas, NOWPAYMENTS_LOGO, (650, 118, 920, 220), trim=True)
    draw = ImageDraw.Draw(canvas)
    centered_text(draw, "+", 145, font("Arial.ttf", 40), (69, 116, 158, 230), size[0])

    centered_text(draw, "FluidRWA welcomes", 269, font("Arial Bold.ttf", 39), (11, 35, 64, 255), size[0])
    centered_text(draw, "NOWPayments", 315, font("Arial Black.ttf", 67), (11, 35, 64, 255), size[0])
    centered_text(draw, "as a new vetted vendor under the", 401, font("Arial.ttf", 29), (49, 73, 101, 255), size[0])
    centered_text(
        draw,
        "Stablecoin Infrastructure Providers directory",
        444,
        font("Arial Bold.ttf", 31),
        (40, 117, 187, 255),
        size[0],
    )

    draw.line((120, 528, 1080, 528), fill=(78, 135, 184, 95), width=1)
    draw.text((120, 554), "fluidrwa.com", font=font("Arial Bold.ttf", 18), fill=(28, 67, 104, 235))
    footer = "VETTED VENDOR ECOSYSTEM"
    footer_font = font("Arial Bold.ttf", 15)
    footer_box = draw.textbbox((0, 0), footer, font=footer_font)
    draw.text((1080 - (footer_box[2] - footer_box[0]), 556), footer, font=footer_font, fill=(53, 104, 150, 220))

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUTPUT, optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    create()
