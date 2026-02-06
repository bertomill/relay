import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

/**
 * POST /api/content
 * Create a theme, topic, or post.
 * Body: { type: "theme" | "topic" | "post", data: { ... } }
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, data } = body;

    if (!type || !data) {
      return NextResponse.json(
        { error: "type and data are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    let table: string;

    switch (type) {
      case "theme":
        table = "themes";
        break;
      case "topic":
        table = "topics";
        break;
      case "post":
        table = "posts";
        break;
      default:
        return NextResponse.json(
          { error: "type must be theme, topic, or post" },
          { status: 400 }
        );
    }

    const { data: result, error } = await supabase
      .from(table)
      .insert([data])
      .select();

    if (error) {
      console.error("Supabase error:", error.message, error.details, error.hint);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

/**
 * PATCH /api/content
 * Update a theme, topic, or post.
 * Body: { type: "theme" | "topic" | "post", id: string, data: { ... } }
 */
export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { type, id, data } = body;

    if (!type || !id || !data) {
      return NextResponse.json(
        { error: "type, id, and data are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();
    let table: string;

    switch (type) {
      case "theme":
        table = "themes";
        break;
      case "topic":
        table = "topics";
        break;
      case "post":
        table = "posts";
        break;
      default:
        return NextResponse.json(
          { error: "type must be theme, topic, or post" },
          { status: 400 }
        );
    }

    // If publishing a post, auto-set published_at
    if (type === "post" && data.status === "published" && !data.published_at) {
      data.published_at = new Date().toISOString();
    }

    const { data: result, error } = await supabase
      .from(table)
      .update(data)
      .eq("id", id)
      .select();

    if (error) {
      console.error("Supabase error:", error.message, error.details, error.hint);
      return NextResponse.json(
        { error: `Database error: ${error.message}` },
        { status: 500 }
      );
    }

    if (!result || result.length === 0) {
      return NextResponse.json(
        { error: "Record not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: result });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
