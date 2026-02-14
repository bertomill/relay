import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function GET() {
  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("generated_visuals")
      .select("id, url, name, preset, created_at")
      .order("created_at", { ascending: false })
      .limit(20);

    if (error) {
      console.error("Visuals fetch error:", error);
      return NextResponse.json({ error: "Failed to fetch visuals" }, { status: 500 });
    }

    return NextResponse.json({ data });
  } catch (err) {
    console.error("Visuals list error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
