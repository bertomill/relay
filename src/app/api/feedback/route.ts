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

export async function POST(request: NextRequest) {
  try {
    const { email, page_url, category, message } = await request.json();

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json(
        { error: "Message is required" },
        { status: 400 }
      );
    }

    const validCategories = ["bug", "improvement", "feature", "other"];
    const safeCategory = validCategories.includes(category) ? category : "other";

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("feedback")
      .insert([
        {
          email: email || null,
          page_url: page_url || null,
          category: safeCategory,
          message: message.trim(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error.message, error.details, error.hint);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
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
      { error: "Internal server error" },
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
