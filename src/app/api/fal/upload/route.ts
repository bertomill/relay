import { fal } from "@fal-ai/client";
import { NextRequest, NextResponse } from "next/server";

const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"];

export async function POST(request: NextRequest) {
  try {
    const falKey = process.env.FAL_KEY;
    if (!falKey) {
      return NextResponse.json({ error: "FAL_KEY not configured" }, { status: 500 });
    }

    fal.config({ credentials: falKey });

    const formData = await request.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: `File type ${file.type} not allowed. Accepted: JPEG, PNG, WebP, GIF` },
        { status: 400 }
      );
    }

    // Upload to fal.ai storage — returns a permanent CDN URL
    const url = await fal.storage.upload(file);

    return NextResponse.json({
      success: true,
      url,
      fileName: file.name,
      mimeType: file.type,
    });
  } catch (error) {
    console.error("Fal upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
