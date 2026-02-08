import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { name, type, linkedin_url, notes, outreach_date, source } =
      await request.json();

    if (!name || typeof name !== "string" || !name.trim()) {
      return NextResponse.json({ error: "Name is required" }, { status: 400 });
    }

    const validTypes = ["warm", "cold", "referral"];
    if (!validTypes.includes(type)) {
      return NextResponse.json(
        { error: "Type must be warm, cold, or referral" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("outreach_contacts")
      .insert([
        {
          name: name.trim(),
          type,
          linkedin_url: linkedin_url || null,
          notes: notes || null,
          outreach_date: outreach_date || new Date().toISOString().split("T")[0],
          source: source || null,
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

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error("API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const type = searchParams.get("type");
    const status = searchParams.get("status");
    const from = searchParams.get("from");
    const to = searchParams.get("to");

    const supabase = createAdminClient();

    let query = supabase
      .from("outreach_contacts")
      .select("*")
      .order("outreach_date", { ascending: false })
      .order("created_at", { ascending: false });

    if (type) {
      query = query.eq("type", type);
    }
    if (status) {
      query = query.eq("status", status);
    }
    if (from) {
      query = query.gte("outreach_date", from);
    }
    if (to) {
      query = query.lte("outreach_date", to);
    }

    const { data, error } = await query;

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
    const { id, ...updates } = await request.json();

    if (!id) {
      return NextResponse.json({ error: "id is required" }, { status: 400 });
    }

    // Only allow updating specific fields
    const allowed: Record<string, unknown> = {};
    if (updates.status !== undefined) allowed.status = updates.status;
    if (updates.notes !== undefined) allowed.notes = updates.notes;
    if (updates.linkedin_url !== undefined) allowed.linkedin_url = updates.linkedin_url;
    if (updates.name !== undefined) allowed.name = updates.name;
    if (updates.type !== undefined) allowed.type = updates.type;

    if (Object.keys(allowed).length === 0) {
      return NextResponse.json(
        { error: "No valid fields to update" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("outreach_contacts")
      .update(allowed)
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
