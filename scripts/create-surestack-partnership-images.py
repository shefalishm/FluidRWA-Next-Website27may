from PIL import Image, ImageDraw, ImageFont, ImageFilter
from pathlib import Path
import math

ROOT = Path(__file__).resolve().parents[1]
FLUID_LOGO = ROOT / "assets" / "fluidrwa-small-logo.png"
SURESTACK_LOGO = Path("/Users/shefalisharma/Downloads/SureStack_Logo_Transparent.png")
SURESTACK_WHITE_LOGO = Path("/Users/shefalisharma/Downloads/SST White Background.png")
OUT_DIRS = [ROOT / "assets" / "news", ROOT / "public" / "assets" / "news"]

FONT_DIR = Path("/System/Library/Fonts/Supplemental")
BOLD = FONT_DIR / "Arial Bold.ttf"
REGULAR = FONT_DIR / "Arial.ttf"
BLACK = FONT_DIR / "Arial Black.ttf"


def font(path, size):
    return ImageFont.truetype(str(path), size)


def rounded_rect(draw, box, radius, fill, outline=None, width=1):
    draw.rounded_rectangle(box, radius=radius, fill=fill, outline=outline, width=width)


def fit_logo(path, max_w, max_h, trim_white=False, invert_dark=False, remove_white=False):
    img = Image.open(path).convert("RGBA")
    if trim_white:
        rgb = img.convert("RGB")
        pix = rgb.load()
        xs = []
        ys = []
        for y in range(rgb.height):
            for x in range(rgb.width):
                r, g, b = pix[x, y]
                if min(r, g, b) < 246:
                    xs.append(x)
                    ys.append(y)
        if xs and ys:
            pad = 24
            img = img.crop((max(min(xs) - pad, 0), max(min(ys) - pad, 0), min(max(xs) + pad, img.width), min(max(ys) + pad, img.height)))
    else:
        alpha_box = img.getbbox()
        if alpha_box:
            img = img.crop(alpha_box)
        else:
            bg = Image.new("RGBA", img.size, img.getpixel((0, 0)))
            diff = Image.alpha_composite(bg, img).convert("RGB")
            img = img.crop(diff.getbbox() or (0, 0, img.width, img.height))
    if invert_dark:
        px = img.load()
        for y in range(img.height):
            for x in range(img.width):
                r, g, b, a = px[x, y]
                if remove_white and min(r, g, b) > 245:
                    px[x, y] = (255, 255, 255, 0)
                    continue
                if a and max(r, g, b) < 95:
                    px[x, y] = (246, 250, 255, a)
    img.thumbnail((max_w, max_h), Image.Resampling.LANCZOS)
    return img


def draw_wrapped(draw, text, xy, font_obj, fill, max_width, line_gap=10, anchor=None):
    words = text.split()
    lines = []
    current = ""
    for word in words:
        trial = word if not current else f"{current} {word}"
        if draw.textbbox((0, 0), trial, font=font_obj)[2] <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    x, y = xy
    total_h = sum(draw.textbbox((0, 0), line, font=font_obj)[3] for line in lines) + line_gap * (len(lines) - 1)
    if anchor == "mm":
        y -= total_h / 2
    for line in lines:
        bbox = draw.textbbox((0, 0), line, font=font_obj)
        line_w = bbox[2] - bbox[0]
        draw.text((x - line_w / 2 if anchor in ("mm", "ma") else x, y), line, font=font_obj, fill=fill)
        y += (bbox[3] - bbox[1]) + line_gap
    return y


def background(size):
    w, h = size
    img = Image.new("RGB", size, "#071426")
    px = img.load()
    for y in range(h):
        for x in range(w):
            nx = x / w
            ny = y / h
            r = int(8 + 8 * nx + 5 * (1 - ny))
            g = int(19 + 30 * nx + 5 * math.sin(nx * math.pi))
            b = int(38 + 45 * nx + 12 * (1 - ny))
            if x > w * 0.66 and y < h * 0.55:
                g += 15
                b += 10
            px[x, y] = (min(r, 35), min(g, 75), min(b, 100))
    overlay = Image.new("RGBA", size, (0, 0, 0, 0))
    od = ImageDraw.Draw(overlay)
    for x in range(0, w, 80):
        od.line((x, 0, x, h), fill=(255, 255, 255, 10), width=1)
    for y in range(0, h, 80):
        od.line((0, y, w, y), fill=(255, 255, 255, 8), width=1)
    for i in range(9):
        cx = int(w * (0.78 + (i % 3) * 0.08))
        cy = int(h * (0.58 + (i // 3) * 0.11))
        s = int(32 + i * 3)
        od.rounded_rectangle((cx, cy, cx + s, cy + s), radius=8, outline=(70, 190, 210, 25), width=2)
    return Image.alpha_composite(img.convert("RGBA"), overlay)


def logo_card(canvas, center, logo_path, max_w, max_h, card_size, draw_card=True, trim_white=False, invert_dark=False, remove_white=False):
    card_w, card_h = card_size
    x = int(center[0] - card_w / 2)
    y = int(center[1] - card_h / 2)
    if draw_card:
        shadow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        sd = ImageDraw.Draw(shadow)
        rounded_rect(sd, (x, y + 12, x + card_w, y + card_h + 12), 18, (0, 0, 0, 72))
        shadow = shadow.filter(ImageFilter.GaussianBlur(18))
        canvas.alpha_composite(shadow)
        d = ImageDraw.Draw(canvas)
        rounded_rect(d, (x, y, x + card_w, y + card_h), 18, (255, 255, 255, 247), (255, 255, 255, 80), 1)
    logo = fit_logo(logo_path, max_w, max_h, trim_white=trim_white, invert_dark=invert_dark, remove_white=remove_white)
    lx = int(center[0] - logo.width / 2)
    ly = int(center[1] - logo.height / 2)
    if not draw_card:
        glow = Image.new("RGBA", canvas.size, (0, 0, 0, 0))
        gd = ImageDraw.Draw(glow)
        gd.rounded_rectangle((lx - 20, ly - 16, lx + logo.width + 20, ly + logo.height + 16), radius=20, fill=(2, 8, 18, 115))
        glow = glow.filter(ImageFilter.GaussianBlur(16))
        canvas.alpha_composite(glow)
    canvas.alpha_composite(logo, (lx, ly))


def create(size, output_name):
    w, h = size
    img = background(size)
    draw = ImageDraw.Draw(img)

    top_font = font(BOLD, int(w * 0.014))
    small_font = font(BOLD, int(w * 0.012))
    title_font = font(BLACK, int(w * 0.043))
    sub_font = font(REGULAR, int(w * 0.023))
    footer_font = font(BOLD, int(w * 0.013))

    teal = (71, 224, 216, 255)
    muted = (169, 181, 198, 220)
    white = (255, 255, 255, 255)

    draw.text((w * 0.047, h * 0.062), "P A R T N E R S H I P   A N N O U N C E M E N T", font=top_font, fill=teal)
    right_label = "NEW VETTED"
    rb = draw.textbbox((0, 0), right_label, font=small_font)
    draw.text((w - (rb[2] - rb[0]) - w * 0.047, h * 0.062), right_label, font=small_font, fill=muted)

    logo_y = h * 0.31
    card_w = int(w * 0.235)
    card_h = int(h * 0.165)
    logo_card(img, (w * 0.355, logo_y), FLUID_LOGO, int(card_w * 0.98), int(card_h * 0.9), (card_w, card_h), draw_card=True)
    logo_card(img, (w * 0.645, logo_y), SURESTACK_LOGO, int(card_w * 0.96), int(card_h * 0.82), (card_w, card_h), draw_card=True)
    x_font = font(REGULAR, int(w * 0.032))
    draw.text((w * 0.5, logo_y), "×", font=x_font, fill=(135, 151, 174, 160), anchor="mm")

    title = "FluidRWA welcomes SureStack"
    tb = draw.textbbox((0, 0), title, font=title_font)
    draw.text((w / 2 - (tb[2] - tb[0]) / 2, h * 0.43), title, font=title_font, fill=white)

    subtitle = "SureStack joins FluidRWA as a New Vetted Risk Management & Security Partner for Web3, digital asset and tokenization teams."
    draw_wrapped(draw, subtitle, (w / 2, h * 0.535), sub_font, (226, 232, 242, 238), w * 0.58, line_gap=int(h * 0.018), anchor="ma")

    line_y = h * 0.82
    draw.line((w * 0.047, line_y, w * 0.953, line_y), fill=(255, 255, 255, 45), width=1)
    draw.text((w * 0.047, h * 0.855), "fluidrwa.com  •  SureStack", font=footer_font, fill=(177, 190, 207, 220))
    footer = "1000+ VENDORS  •  30+ CATEGORIES"
    fb = draw.textbbox((0, 0), footer, font=footer_font)
    draw.text((w - (fb[2] - fb[0]) - w * 0.047, h * 0.855), footer, font=footer_font, fill=(177, 190, 207, 185))

    for out_dir in OUT_DIRS:
        out_dir.mkdir(parents=True, exist_ok=True)
        img.convert("RGB").save(out_dir / output_name, quality=94, optimize=True)


if __name__ == "__main__":
    create((1200, 675), "fluidrwa-surestack-partnership-og.jpg")
    create((1600, 900), "fluidrwa-surestack-partnership-cover.jpg")
    print("Created SureStack partnership images.")
