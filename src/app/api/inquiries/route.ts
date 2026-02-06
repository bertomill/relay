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
    const {
      email,
      first_name,
      last_name,
      company,
      role,
      website,
      company_size,
      annual_revenue,
      project_budget,
      services,
      message,
    } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("inquiries")
      .insert([
        {
          email,
          first_name,
          last_name,
          company,
          role,
          website,
          company_size,
          annual_revenue,
          project_budget,
          services,
          message,
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

    // Send email notification (non-blocking — don't let email failure break the form)
    const notificationEmail = process.env.NOTIFICATION_EMAIL;
    const resend = getResend();
    if (notificationEmail && resend) {
      resend.emails
        .send({
          from: "Lighten AI <onboarding@resend.dev>",
          to: notificationEmail,
          subject: `New Inquiry: ${escapeHtml(first_name)} ${escapeHtml(last_name)} at ${escapeHtml(company)}`,
          html: `
            <h2>New inquiry from lightenai.com</h2>
            <table style="border-collapse:collapse;width:100%;max-width:600px;font-family:sans-serif;">
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Name</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(first_name)} ${escapeHtml(last_name)}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Email</td><td style="padding:8px 12px;border-bottom:1px solid #eee;"><a href="mailto:${encodeURI(email)}">${escapeHtml(email)}</a></td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Company</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(company)}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Role</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(role)}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Website</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(website)}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Company Size</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(company_size)}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Annual Revenue</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(annual_revenue) || "—"}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Project Budget</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(project_budget)}</td></tr>
              <tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Services</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(services)}</td></tr>
              ${message ? `<tr><td style="padding:8px 12px;font-weight:bold;color:#555;border-bottom:1px solid #eee;">Additional Info</td><td style="padding:8px 12px;border-bottom:1px solid #eee;">${escapeHtml(message)}</td></tr>` : ""}
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
