import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { Resend } from "resend";

const getResend = () => process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;

function escapeHtml(str: string | null | undefined): string {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB
const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp"];

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    const message = formData.get("message") as string | null;
    const category = formData.get("category") as string | null;
    const email = formData.get("email") as string | null;
    const page_url = formData.get("page_url") as string | null;
    const screenshot = formData.get("screenshot") as File | null;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const validCategories = ["bug", "improvement", "feature", "other"];
    const safeCategory = validCategories.includes(category || "") ? category : "other";

    const supabase = createAdminClient();

    // Upload screenshot if provided
    let screenshot_url: string | null = null;
    if (screenshot && screenshot.size > 0) {
      if (screenshot.size > MAX_FILE_SIZE) {
        return NextResponse.json(
          { error: "Screenshot must be under 5MB" },
          { status: 400 }
        );
      }
      if (!ALLOWED_TYPES.includes(screenshot.type)) {
        return NextResponse.json(
          { error: "Screenshot must be PNG, JPEG, or WebP" },
          { status: 400 }
        );
      }

      const ext = screenshot.type.split("/")[1] === "jpeg" ? "jpg" : screenshot.type.split("/")[1];
      const filename = `${Date.now()}-${crypto.randomUUID()}.${ext}`;
      const buffer = Buffer.from(await screenshot.arrayBuffer());

      const { error: uploadError } = await supabase.storage
        .from("feedback-screenshots")
        .upload(filename, buffer, { contentType: screenshot.type });

      if (uploadError) {
        console.error("Screenshot upload error:", uploadError.message);
        return NextResponse.json(
          { error: `Screenshot upload failed: ${uploadError.message}` },
          { status: 500 }
        );
      }

      const { data: urlData } = supabase.storage
        .from("feedback-screenshots")
        .getPublicUrl(filename);
      screenshot_url = urlData.publicUrl;
    }

    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          email: email || null,
          page_url: page_url || null,
          category: safeCategory,
          message: message.trim(),
          screenshot_url,
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error.message, error.details, error.hint, error.code);
      return NextResponse.json(
        {
          error: `Database error: ${error.message}`,
          details: error.details,
          hint: error.hint,
          code: error.code,
        },
        { status: 500 }
      );
    }

    // Send email notification (non-blocking)
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    const resend = getResend();
    if (notificationEmail && resend) {
      resend.emails
        .send({
          from: "Lighten AI <onboarding@resend.dev>",
          to: notificationEmail,
          subject: `New Feedback: ${safeCategory}`,
          html: `
            <h2>New feedback from lightenai.com</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Category</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(safeCategory)}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Message</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(message)}</td></tr>
              ${email ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(email)}</td></tr>` : ""}
              ${page_url ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Page</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(page_url)}</td></tr>` : ""}
              ${screenshot_url ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Screenshot</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="${escapeHtml(screenshot_url)}">View screenshot</a></td></tr>` : ""}
            </table>
          `,
        })
        .then((result) => console.log("Resend result:", JSON.stringify(result)))
        .catch((err) => console.error("Resend error:", err));
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      {
        error: "Internal server error",
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("feedback")
      .select("*")
      .order("addressed", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const { id, addressed } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("feedback")
      .update({ addressed: addressed ?? true })
      .eq("id", id)
      .select();

    if (error) {
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
