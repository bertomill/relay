#!/usr/bin/env python3
"""
Lighten AI — One-Pager PDF Generator
Creates a professional single-page sales PDF for Shopify vendor outreach.
"""

from reportlab.lib.pagesizes import letter
from reportlab.lib.colors import HexColor, white, Color
from reportlab.lib.units import inch, mm
from reportlab.pdfgen import canvas
from reportlab.lib.enums import TA_LEFT, TA_CENTER, TA_RIGHT
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
import os

# ─── COLORS ───
GREEN = HexColor("#6B8F71")
GREEN_DARK = HexColor("#5A7D60")
GREEN_LIGHT = HexColor("#E8F5E9")
GREEN_BG = HexColor("#F4F9F5")
TEXT_DARK = HexColor("#1C1C1C")
TEXT_MUTED = HexColor("#666666")
TEXT_LIGHT = HexColor("#888888")
BG_PAGE = HexColor("#FAFAF8")
BORDER = HexColor("#E8E6E1")
WHITE = HexColor("#FFFFFF")
WARM_BG = HexColor("#F9FBF5")

# ─── PAGE SETUP ───
WIDTH, HEIGHT = letter  # 612 x 792
MARGIN_LEFT = 36
MARGIN_RIGHT = 36
MARGIN_TOP = 36
MARGIN_BOTTOM = 28
CONTENT_WIDTH = WIDTH - MARGIN_LEFT - MARGIN_RIGHT

OUTPUT_PATH = "/Users/bertomill/lighten/lighten-ai-one-pager.pdf"


def draw_rounded_rect(c, x, y, w, h, radius, fill_color=None, stroke_color=None, stroke_width=0.5):
    """Draw a rounded rectangle."""
    c.saveState()
    if fill_color:
        c.setFillColor(fill_color)
    if stroke_color:
        c.setStrokeColor(stroke_color)
        c.setLineWidth(stroke_width)

    p = c.beginPath()
    p.roundRect(x, y, w, h, radius)

    if fill_color and stroke_color:
        c.drawPath(p, fill=1, stroke=1)
    elif fill_color:
        c.drawPath(p, fill=1, stroke=0)
    elif stroke_color:
        c.drawPath(p, fill=0, stroke=1)
    c.restoreState()


def draw_feather(c, x, y, size=18):
    """Draw a simple feather icon."""
    c.saveState()
    c.setStrokeColor(GREEN)
    c.setFillColor(GREEN)
    c.setLineWidth(0.8)

    # Feather shape using bezier curves
    s = size / 18.0
    cx, cy = x, y

    # Main quill line
    c.setLineWidth(1.0 * s)
    p = c.beginPath()
    p.moveTo(cx, cy)
    p.lineTo(cx + 3*s, cy + 16*s)
    c.drawPath(p, fill=0, stroke=1)

    # Left vane
    c.setFillColor(Color(0.42, 0.56, 0.44, alpha=0.25))
    p = c.beginPath()
    p.moveTo(cx + 3*s, cy + 16*s)
    p.curveTo(cx - 5*s, cy + 13*s, cx - 4*s, cy + 6*s, cx, cy)
    c.drawPath(p, fill=1, stroke=0)

    # Right vane
    c.setFillColor(Color(0.42, 0.56, 0.44, alpha=0.35))
    p = c.beginPath()
    p.moveTo(cx + 3*s, cy + 16*s)
    p.curveTo(cx + 10*s, cy + 12*s, cx + 8*s, cy + 5*s, cx, cy)
    c.drawPath(p, fill=1, stroke=0)

    # Stroke outline
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.6 * s)
    p = c.beginPath()
    p.moveTo(cx + 3*s, cy + 16*s)
    p.curveTo(cx - 5*s, cy + 13*s, cx - 4*s, cy + 6*s, cx, cy)
    c.drawPath(p, fill=0, stroke=1)

    p = c.beginPath()
    p.moveTo(cx + 3*s, cy + 16*s)
    p.curveTo(cx + 10*s, cy + 12*s, cx + 8*s, cy + 5*s, cx, cy)
    c.drawPath(p, fill=0, stroke=1)

    c.restoreState()


def wrap_text(c, text, max_width, font_name, font_size):
    """Simple word-wrap returning list of lines."""
    words = text.split()
    lines = []
    current = ""
    for word in words:
        test = f"{current} {word}".strip()
        if c.stringWidth(test, font_name, font_size) <= max_width:
            current = test
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)
    return lines


def draw_text_wrapped(c, text, x, y, max_width, font_name, font_size, color, leading=None):
    """Draw wrapped text, return the y position after the last line."""
    if leading is None:
        leading = font_size * 1.35
    c.setFont(font_name, font_size)
    c.setFillColor(color)
    lines = wrap_text(c, text, max_width, font_name, font_size)
    for line in lines:
        c.drawString(x, y, line)
        y -= leading
    return y


def create_one_pager():
    c = canvas.Canvas(OUTPUT_PATH, pagesize=letter)
    c.setTitle("Lighten AI — Fractional AI Officer for Shopify Brands")
    c.setAuthor("Robert Berto Mill")

    # ─── PAGE BACKGROUND ───
    c.setFillColor(BG_PAGE)
    c.rect(0, 0, WIDTH, HEIGHT, fill=1, stroke=0)

    # Subtle green gradient circles (decorative)
    c.saveState()
    c.setFillColor(Color(0.42, 0.56, 0.44, alpha=0.03))
    c.circle(WIDTH - 80, HEIGHT - 100, 180, fill=1, stroke=0)
    c.setFillColor(Color(0.83, 0.90, 0.84, alpha=0.08))
    c.circle(60, 200, 140, fill=1, stroke=0)
    c.restoreState()

    y = HEIGHT - MARGIN_TOP

    # ═══════════════════════════════════════
    # 1. HEADER
    # ═══════════════════════════════════════
    header_h = 32

    # Logo + brand name
    draw_feather(c, MARGIN_LEFT + 2, y - 22, size=16)

    c.setFont("Helvetica-Bold", 13)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN_LEFT + 24, y - 11, "Lighten AI")

    c.setFont("Helvetica", 7)
    c.setFillColor(TEXT_MUTED)
    c.drawString(MARGIN_LEFT + 24, y - 22, "Fractional AI Officer for Shopify Brands")

    # Contact info (right side)
    rx = WIDTH - MARGIN_RIGHT
    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(TEXT_DARK)
    c.drawRightString(rx, y - 8, 'Robert "Berto" — Founder')

    c.setFont("Helvetica", 6.5)
    c.setFillColor(TEXT_MUTED)
    c.drawRightString(rx, y - 18, "Toronto, ON  |  berto@lightenai.co")
    c.drawRightString(rx, y - 27, "lightenai.co  |  linkedin.com/in/bertomill")

    y -= header_h

    # Divider
    c.setStrokeColor(BORDER)
    c.setLineWidth(0.5)
    c.line(MARGIN_LEFT, y, WIDTH - MARGIN_RIGHT, y)
    y -= 10

    # ═══════════════════════════════════════
    # 2. HERO SECTION
    # ═══════════════════════════════════════

    # Badge
    badge_text = "Built for Shopify Brand Founders"
    badge_w = c.stringWidth(badge_text, "Helvetica-Bold", 6) + 16
    draw_rounded_rect(c, MARGIN_LEFT, y - 12, badge_w, 14, 3, fill_color=GREEN_BG, stroke_color=GREEN, stroke_width=0.4)
    c.setFont("Helvetica-Bold", 6)
    c.setFillColor(GREEN_DARK)
    c.drawString(MARGIN_LEFT + 8, y - 9, badge_text)
    y -= 20

    # Headline
    c.setFont("Helvetica-Bold", 17)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN_LEFT, y, "Scale Your Shopify Store With AI.")
    y -= 20
    c.setFont("Helvetica-Bold", 17)
    c.setFillColor(GREEN)
    c.drawString(MARGIN_LEFT, y, "Without Scaling Your Team.")
    y -= 14

    # Subtext
    subtext = "I embed as your fractional AI officer and build AI-powered systems \u2014 content engines, customer support bots, marketing automation, and operations intelligence \u2014 all custom-built for your Shopify store. You grow revenue without growing headcount."
    c.setFont("Helvetica", 7.5)
    y = draw_text_wrapped(c, subtext, MARGIN_LEFT, y, CONTENT_WIDTH, "Helvetica", 7.5, TEXT_MUTED, leading=10)
    y -= 6

    # Stats row
    stats = [
        ("200+", "AI Systems Built"),
        ("3x", "Content Output"),
        ("70%", "Less Production Time"),
        ("$0", "New Hires Needed"),
    ]
    stat_w = CONTENT_WIDTH / 4
    stats_y = y

    draw_rounded_rect(c, MARGIN_LEFT, stats_y - 30, CONTENT_WIDTH, 32, 5, fill_color=WHITE, stroke_color=BORDER, stroke_width=0.4)

    for i, (num, label) in enumerate(stats):
        sx = MARGIN_LEFT + i * stat_w + stat_w / 2
        c.setFont("Helvetica-Bold", 13)
        c.setFillColor(GREEN)
        c.drawCentredString(sx, stats_y - 12, num)
        c.setFont("Helvetica", 5.5)
        c.setFillColor(TEXT_LIGHT)
        c.drawCentredString(sx, stats_y - 22, label)

        # Vertical divider
        if i < 3:
            c.setStrokeColor(BORDER)
            c.setLineWidth(0.3)
            dx = MARGIN_LEFT + (i + 1) * stat_w
            c.line(dx, stats_y - 5, dx, stats_y - 27)

    y = stats_y - 38

    # ═══════════════════════════════════════
    # 3. PROBLEM BAR
    # ═══════════════════════════════════════
    problem_text = "Sound familiar? You\u2019re writing product descriptions one at a time. Customer support tickets pile up overnight. Your marketing feels inconsistent because nobody has time. You tried ChatGPT but everything sounds generic. You need a system \u2014 not another tool to figure out."

    pb_lines = wrap_text(c, problem_text, CONTENT_WIDTH - 20, "Helvetica", 6.5)
    pb_h = len(pb_lines) * 9 + 10

    draw_rounded_rect(c, MARGIN_LEFT, y - pb_h, CONTENT_WIDTH, pb_h, 4, fill_color=HexColor("#FFF8F0"), stroke_color=HexColor("#E8D5C0"), stroke_width=0.4)

    c.setFont("Helvetica-Bold", 6.5)
    c.setFillColor(HexColor("#8B6914"))
    py = y - 10

    # Draw "Sound familiar?" bold, rest normal
    bold_part = "Sound familiar?"
    rest_part = problem_text[len(bold_part):]

    c.setFont("Helvetica-Bold", 6.5)
    bw = c.stringWidth(bold_part, "Helvetica-Bold", 6.5)
    c.drawString(MARGIN_LEFT + 10, py, bold_part)

    c.setFont("Helvetica", 6.5)
    c.setFillColor(HexColor("#7A5F2A"))
    # Re-wrap from the rest
    full_lines = wrap_text(c, problem_text, CONTENT_WIDTH - 20, "Helvetica", 6.5)
    py = y - 10
    for li, line in enumerate(full_lines):
        if li == 0:
            # First line: bold "Sound familiar?" then normal
            c.setFont("Helvetica-Bold", 6.5)
            c.setFillColor(HexColor("#8B6914"))
            c.drawString(MARGIN_LEFT + 10, py, bold_part)
            c.setFont("Helvetica", 6.5)
            c.setFillColor(HexColor("#7A5F2A"))
            c.drawString(MARGIN_LEFT + 10 + bw, py, line[len(bold_part):])
        else:
            c.drawString(MARGIN_LEFT + 10, py, line)
        py -= 9

    y -= pb_h + 8

    # ═══════════════════════════════════════
    # 4 & 5. TWO-COLUMN LAYOUT
    # ═══════════════════════════════════════
    col_gap = 14
    left_w = CONTENT_WIDTH * 0.52
    right_w = CONTENT_WIDTH - left_w - col_gap
    left_x = MARGIN_LEFT
    right_x = MARGIN_LEFT + left_w + col_gap

    col_top_y = y

    # ─── LEFT COLUMN: Four AI Systems ───
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(GREEN)
    c.drawString(left_x, y, "The Four AI Systems I Build For Your Store")
    y -= 4

    # Underline
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.5)
    uw = c.stringWidth("The Four AI Systems I Build For Your Store", "Helvetica-Bold", 8)
    c.line(left_x, y, left_x + uw, y)
    y -= 10

    systems = [
        ("Content Engine", "AI generates product descriptions, collection pages, email flows, and social content \u2014 all in your brand voice. Launch faster, list more, rank higher.", "DATA \u2192 BRAND VOICE AI \u2192 DESCRIPTIONS + SEO + EMAILS + SOCIAL"),
        ("Customer Support AI", "Smart chatbots handle FAQs, order status, returns, and sizing questions 24/7. Your team focuses on complex issues while AI handles the volume.", "QUERY \u2192 AI TRIAGE \u2192 INSTANT ANSWER OR ESCALATE"),
        ("Marketing Automation", "AI-powered ad copy, SEO optimization, campaign automation, and personalization. Every customer gets the right message at the right time.", "AUDIENCE \u2192 AI COPY + TARGETING \u2192 PERSONALIZED CAMPAIGNS"),
        ("Operations Intelligence", "Inventory forecasting, order automation, and sales analytics. Make data-driven decisions without hiring a data team.", "STORE DATA \u2192 AI ANALYSIS \u2192 FORECASTS + ALERTS + INSIGHTS"),
    ]

    icons = ["\u2605", "\u2606", "\u25B2", "\u25C6"]  # Geometric shapes as fallback
    icon_labels = ["01", "02", "03", "04"]

    for i, (title, desc, flow) in enumerate(systems):
        # Card background
        card_lines = wrap_text(c, desc, left_w - 36, "Helvetica", 6)
        card_h = 12 + len(card_lines) * 8.5 + 16

        draw_rounded_rect(c, left_x, y - card_h, left_w, card_h, 4, fill_color=WHITE, stroke_color=BORDER, stroke_width=0.3)

        # Number badge
        draw_rounded_rect(c, left_x + 6, y - 15, 16, 12, 3, fill_color=GREEN)
        c.setFont("Helvetica-Bold", 6.5)
        c.setFillColor(WHITE)
        c.drawCentredString(left_x + 14, y - 12, icon_labels[i])

        # Title
        c.setFont("Helvetica-Bold", 7.5)
        c.setFillColor(TEXT_DARK)
        c.drawString(left_x + 28, y - 13, title)

        # Description
        c.setFont("Helvetica", 6)
        c.setFillColor(TEXT_MUTED)
        dy = y - 24
        for line in card_lines:
            c.drawString(left_x + 28, dy, line)
            dy -= 8.5

        # Flow line
        dy -= 1
        c.setFont("Helvetica", 4.5)
        c.setFillColor(GREEN)
        flow_display = flow
        if c.stringWidth(flow_display, "Helvetica", 4.5) > left_w - 40:
            flow_display = flow_display[:60] + "..."
        c.drawString(left_x + 28, dy, flow_display)

        y -= card_h + 4

    left_bottom_y = y

    # ─── RIGHT COLUMN ───
    y = col_top_y

    # Section: How It Works
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(GREEN)
    c.drawString(right_x, y, "How It Works")
    y -= 4
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.5)
    c.line(right_x, y, right_x + c.stringWidth("How It Works", "Helvetica-Bold", 8), y)
    y -= 10

    steps = [
        ("Store Audit", "I map your workflows, identify bottlenecks, and find where AI creates the biggest impact."),
        ("Custom AI Build", "Systems trained on your brand voice, products, and customers \u2014 not generic templates."),
        ("Integration & Launch", "Plugged into your Shopify stack \u2014 Klaviyo, Gorgias, Notion, your apps."),
        ("Monthly Optimization", "As your fractional AI officer, I refine, expand, and keep you ahead."),
    ]

    for i, (title, desc) in enumerate(steps):
        # Step number circle
        c.setFillColor(GREEN)
        c.circle(right_x + 8, y - 5, 7, fill=1, stroke=0)
        c.setFont("Helvetica-Bold", 6)
        c.setFillColor(WHITE)
        c.drawCentredString(right_x + 8, y - 7.5, str(i + 1))

        # Connecting line
        if i < 3:
            c.setStrokeColor(HexColor("#D0DDD2"))
            c.setLineWidth(0.5)
            c.setDash(1, 2)
            c.line(right_x + 8, y - 12, right_x + 8, y - 28)
            c.setDash()

        # Title + desc
        c.setFont("Helvetica-Bold", 7)
        c.setFillColor(TEXT_DARK)
        c.drawString(right_x + 20, y - 4, title)

        desc_lines = wrap_text(c, desc, right_w - 24, "Helvetica", 5.5)
        c.setFont("Helvetica", 5.5)
        c.setFillColor(TEXT_MUTED)
        dy = y - 14
        for line in desc_lines:
            c.drawString(right_x + 20, dy, line)
            dy -= 7.5

        y = dy - 6

    y -= 2

    # Section: Expected Impact
    c.setFont("Helvetica-Bold", 8)
    c.setFillColor(GREEN)
    c.drawString(right_x, y, "Expected Impact")
    y -= 4
    c.setStrokeColor(GREEN)
    c.setLineWidth(0.5)
    c.line(right_x, y, right_x + c.stringWidth("Expected Impact", "Helvetica-Bold", 8), y)
    y -= 8

    impacts = [
        ("3x", "Content Output"),
        ("70%", "Faster Production"),
        ("24/7", "Customer Support"),
        ("10x", "Listings / Day"),
    ]

    imp_w = right_w / 2
    imp_h = 32

    for i, (num, label) in enumerate(impacts):
        row = i // 2
        col = i % 2
        ix = right_x + col * (imp_w + 4)
        iy = y - row * (imp_h + 4)

        draw_rounded_rect(c, ix, iy - imp_h, imp_w - 4, imp_h, 4, fill_color=GREEN_BG, stroke_color=HexColor("#D0DDD2"), stroke_width=0.3)

        c.setFont("Helvetica-Bold", 14)
        c.setFillColor(GREEN)
        c.drawCentredString(ix + (imp_w - 4) / 2, iy - 14, num)

        c.setFont("Helvetica", 5.5)
        c.setFillColor(TEXT_MUTED)
        c.drawCentredString(ix + (imp_w - 4) / 2, iy - 24, label)

    y -= 2 * (imp_h + 4) + 4

    # Quote
    quote_y = y
    c.setStrokeColor(GREEN)
    c.setLineWidth(2)
    c.line(right_x, quote_y, right_x, quote_y - 24)

    draw_rounded_rect(c, right_x + 6, quote_y - 28, right_w - 8, 28, 3, fill_color=WARM_BG)

    c.setFont("Helvetica-Oblique", 6)
    c.setFillColor(HexColor("#555555"))
    quote = '"You should be building your brand and talking to customers \u2014 not grinding out product descriptions and email sequences every week."'
    q_lines = wrap_text(c, quote, right_w - 18, "Helvetica-Oblique", 6)
    qy = quote_y - 8
    for ql in q_lines:
        c.drawString(right_x + 10, qy, ql)
        qy -= 8

    c.setFont("Helvetica-Bold", 5)
    c.setFillColor(TEXT_LIGHT)
    c.drawString(right_x + 10, qy - 2, "\u2014 Berto, Founder of Lighten AI")

    y = min(left_bottom_y, quote_y - 36)

    # ═══════════════════════════════════════
    # 7. PERFECT FOR strip
    # ═══════════════════════════════════════
    y -= 2

    perfect_items = [
        "Shopify brands\nscaling fast",
        "DTC founders\n$10K\u2013$500K/mo",
        "Small teams,\ntoo many hats",
        "AI-curious,\nno time to build",
        "Canadian\ne-commerce",
    ]

    strip_h = 28
    draw_rounded_rect(c, MARGIN_LEFT, y - strip_h, CONTENT_WIDTH, strip_h, 5, fill_color=GREEN, stroke_color=None)

    item_w = CONTENT_WIDTH / 5
    for i, item in enumerate(perfect_items):
        parts = item.split("\n")
        ix = MARGIN_LEFT + i * item_w + item_w / 2

        c.setFont("Helvetica-Bold", 6)
        c.setFillColor(WHITE)
        c.drawCentredString(ix, y - 10, parts[0])

        if len(parts) > 1:
            c.setFont("Helvetica", 5.5)
            c.setFillColor(Color(1, 1, 1, alpha=0.8))
            c.drawCentredString(ix, y - 19, parts[1])

        # Divider
        if i < 4:
            c.setStrokeColor(Color(1, 1, 1, alpha=0.25))
            c.setLineWidth(0.3)
            dx = MARGIN_LEFT + (i + 1) * item_w
            c.line(dx, y - 5, dx, y - strip_h + 5)

    y -= strip_h + 6

    # ═══════════════════════════════════════
    # 8. RETAINER INCLUDES
    # ═══════════════════════════════════════
    retainer_h = 52
    draw_rounded_rect(c, MARGIN_LEFT, y - retainer_h, CONTENT_WIDTH, retainer_h, 5, fill_color=WHITE, stroke_color=BORDER, stroke_width=0.4)

    c.setFont("Helvetica-Bold", 7.5)
    c.setFillColor(TEXT_DARK)
    c.drawString(MARGIN_LEFT + 10, y - 10, "Your Monthly Retainer Includes")

    retainer_items_left = [
        ("Dedicated fractional AI officer", "\u2014 on your team, not a vendor"),
        ("All four AI systems", "built, maintained, and optimized"),
        ("Brand voice AI training", "\u2014 sounds like you, not a chatbot"),
    ]
    retainer_items_right = [
        ("Shopify + tool integrations", "\u2014 Klaviyo, Gorgias, Notion"),
        ("Team training & onboarding", "\u2014 everyone confident in 1 week"),
        ("Slack access", "\u2014 direct line when you need me"),
    ]

    ry = y - 22
    for bold_part, rest in retainer_items_left:
        c.setFont("Helvetica-Bold", 5.5)
        c.setFillColor(GREEN)
        c.drawString(MARGIN_LEFT + 14, ry, "\u2726")

        c.setFillColor(TEXT_DARK)
        c.drawString(MARGIN_LEFT + 24, ry, bold_part)
        bw = c.stringWidth(bold_part, "Helvetica-Bold", 5.5)

        c.setFont("Helvetica", 5.5)
        c.setFillColor(TEXT_MUTED)
        c.drawString(MARGIN_LEFT + 24 + bw + 2, ry, rest)
        ry -= 9

    ry = y - 22
    mid_x = MARGIN_LEFT + CONTENT_WIDTH / 2 + 10
    for bold_part, rest in retainer_items_right:
        c.setFont("Helvetica-Bold", 5.5)
        c.setFillColor(GREEN)
        c.drawString(mid_x, ry, "\u2726")

        c.setFillColor(TEXT_DARK)
        c.drawString(mid_x + 10, ry, bold_part)
        bw = c.stringWidth(bold_part, "Helvetica-Bold", 5.5)

        c.setFont("Helvetica", 5.5)
        c.setFillColor(TEXT_MUTED)
        c.drawString(mid_x + 10 + bw + 2, ry, rest)
        ry -= 9

    y -= retainer_h + 5

    # ═══════════════════════════════════════
    # 9. CREDIBILITY BAR
    # ═══════════════════════════════════════
    cred_h = 14
    draw_rounded_rect(c, MARGIN_LEFT, y - cred_h, CONTENT_WIDTH, cred_h, 3, fill_color=HexColor("#F5F5F3"))

    creds = [
        "200+ AI agents built",
        "Ex-KPMG AI & Tax Technology",
        "Shopify Ecosystem",
        "MakersLounge Toronto (500+ members)",
    ]

    # Calculate total width for centering
    c.setFont("Helvetica-Bold", 5.5)
    total_w = sum(c.stringWidth(cr, "Helvetica-Bold", 5.5) for cr in creds) + 30 * (len(creds) - 1)
    start_x = MARGIN_LEFT + (CONTENT_WIDTH - total_w) / 2

    cx = start_x
    for i, cr in enumerate(creds):
        c.setFont("Helvetica-Bold", 5.5)
        c.setFillColor(TEXT_DARK)
        c.drawString(cx, y - cred_h + 4, cr)
        cx += c.stringWidth(cr, "Helvetica-Bold", 5.5)

        if i < len(creds) - 1:
            cx += 10
            c.setFillColor(GREEN)
            c.circle(cx + 2, y - cred_h + 6.5, 1.5, fill=1, stroke=0)
            cx += 16

    y -= cred_h + 5

    # ═══════════════════════════════════════
    # 10. CTA BAR
    # ═══════════════════════════════════════
    cta_h = 34
    draw_rounded_rect(c, MARGIN_LEFT, y - cta_h, CONTENT_WIDTH, cta_h, 5, fill_color=GREEN)

    # Left text
    c.setFont("Helvetica-Bold", 9)
    c.setFillColor(WHITE)
    c.drawString(MARGIN_LEFT + 12, y - 13, "Let\u2019s audit your Shopify store \u2014 free.")

    c.setFont("Helvetica", 6.5)
    c.setFillColor(Color(1, 1, 1, alpha=0.85))
    c.drawString(MARGIN_LEFT + 12, y - 24, "30 minutes. I\u2019ll show you exactly where AI fits your brand.")

    # Right contact info
    contacts = [
        ("berto@lightenai.co", "Email"),
        ("lightenai.co", "Website"),
        ("linkedin.com/in/bertomill", "LinkedIn"),
    ]

    crx = WIDTH - MARGIN_RIGHT - 12
    for val, lbl in reversed(contacts):
        c.setFont("Helvetica-Bold", 6)
        c.setFillColor(WHITE)
        c.drawRightString(crx, y - 11, val)

        c.setFont("Helvetica", 5)
        c.setFillColor(Color(1, 1, 1, alpha=0.65))
        c.drawRightString(crx, y - 20, lbl)

        crx -= max(c.stringWidth(val, "Helvetica-Bold", 6), c.stringWidth(lbl, "Helvetica", 5)) + 20

        # Divider
        if lbl != "Email":
            c.setStrokeColor(Color(1, 1, 1, alpha=0.25))
            c.setLineWidth(0.3)
            c.line(crx + 10, y - 6, crx + 10, y - 28)

    # ─── SAVE ───
    c.save()
    print(f"PDF saved to: {OUTPUT_PATH}")
    print(f"File size: {os.path.getsize(OUTPUT_PATH) / 1024:.1f} KB")


if __name__ == "__main__":
    create_one_pager()
