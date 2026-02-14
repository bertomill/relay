import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";

export async function POST(request: NextRequest) {
  try {
    const { imageUrl, name, preset } = await request.json();

    if (!imageUrl || !name) {
      return NextResponse.json({ error: "imageUrl and name are required" }, { status: 400 });
    }

    const supabase = createAdminClient();

    // Fetch the image from fal.ai CDN
    const imageRes = await fetch(imageUrl);
    if (!imageRes.ok) {
      return NextResponse.json({ error: "Failed to fetch image from CDN" }, { status: 502 });
    }

    const imageBuffer = await imageRes.arrayBuffer();
    const contentType = imageRes.headers.get("content-type") || "image/png";
    const ext = contentType.includes("jpeg") || contentType.includes("jpg") ? "jpg" : "png";
    const fileName = `${Date.now()}-${name.slice(0, 50).replace(/[^a-zA-Z0-9-_]/g, "_")}.${ext}`;

    // Upload to Supabase Storage
    const { error: uploadError } = await supabase.storage
      .from("visuals")
      .upload(fileName, imageBuffer, {
        contentType,
        upsert: false,
      });

    if (uploadError) {
      console.error("Storage upload error:", uploadError);
      return NextResponse.json({ error: "Failed to upload to storage" }, { status: 500 });
    }

    // Get public URL
    const { data: urlData } = supabase.storage.from("visuals").getPublicUrl(fileName);

    // Insert metadata row
    const { data: row, error: insertError } = await supabase
      .from("generated_visuals")
      .insert({
        url: urlData.publicUrl,
        name,
        preset: preset || "hero",
        storage_path: fileName,
      })
      .select()
      .single();

    if (insertError) {
      console.error("Insert error:", insertError);
      return NextResponse.json({ error: "Failed to save metadata" }, { status: 500 });
    }

    return NextResponse.json({ data: row });
  } catch (err) {
    console.error("Visuals save error:", err);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
