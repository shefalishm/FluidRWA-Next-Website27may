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


def place_logo(canvas, path, box, trim=False, max_width_ratio=0.78):
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
    logo.thumbnail((int((x2 - x1) * max_width_ratio), int((y2 - y1) * 0.72)), Image.Resampling.LANCZOS)
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
    shadow_draw.rounded_rectangle((78, 155, 1122, 526), radius=36, fill=(30, 83, 128, 52))
    canvas = Image.alpha_composite(canvas, glass.filter(ImageFilter.GaussianBlur(22)))

    draw = ImageDraw.Draw(canvas)
    draw.rounded_rectangle(
        (80, 145, 1120, 515),
        radius=34,
        fill=(248, 252, 255, 220),
        outline=(132, 184, 226, 145),
        width=2,
    )

    place_logo(canvas, FLUID_LOGO, (125, 190, 575, 470), max_width_ratio=0.78)
    place_logo(canvas, NOWPAYMENTS_LOGO, (625, 190, 1075, 470), trim=True, max_width_ratio=0.78)

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    canvas.convert("RGB").save(OUTPUT, optimize=True)
    print(OUTPUT)


if __name__ == "__main__":
    create()
