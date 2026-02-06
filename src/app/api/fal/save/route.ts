import { NextRequest, NextResponse } from "next/server";
import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, filename, type } = body as {
      url: string;
      filename: string;
      type: "image" | "video";
    };

    if (!url || !filename) {
      return NextResponse.json(
        { error: "Missing url or filename" },
        { status: 400 }
      );
    }

    // Fetch the asset from Fal's CDN
    const response = await fetch(url);
    if (!response.ok) {
      return NextResponse.json(
        { error: "Failed to fetch asset from URL" },
        { status: 500 }
      );
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // Ensure the generated directory exists
    const generatedDir = path.join(process.cwd(), "public", "generated");
    await mkdir(generatedDir, { recursive: true });

    // Sanitize filename and add extension if needed
    const sanitizedFilename = filename.replace(/[^a-zA-Z0-9-_]/g, "-");
    const extension = type === "video" ? ".mp4" : ".png";
    const finalFilename = sanitizedFilename.endsWith(extension)
      ? sanitizedFilename
      : `${sanitizedFilename}${extension}`;

    // Write the file
    const filePath = path.join(generatedDir, finalFilename);
    await writeFile(filePath, buffer);

    // Return the public URL
    const publicUrl = `/generated/${finalFilename}`;

    return NextResponse.json({
      success: true,
      publicUrl,
      filename: finalFilename,
      size: buffer.length,
    });
  } catch (error) {
    console.error("Save error:", error);
    return NextResponse.json(
      { error: "Failed to save asset" },
      { status: 500 }
    );
  }
}
