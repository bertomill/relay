import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { postToX, postToLinkedIn, refreshXToken } from "@/lib/social/oauth";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { platform, text, asOrganization } = await request.json();

  if (!platform || !["x", "linkedin"].includes(platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }

  if (!text || typeof text !== "string" || text.trim().length === 0) {
    return NextResponse.json({ error: "Text is required" }, { status: 400 });
  }

  // For org posting, use the separate linkedin_org connection
  const dbPlatform = (platform === "linkedin" && asOrganization) ? "linkedin_org" : platform;

  // Fetch stored connection
  const { data: connection, error: fetchError } = await supabase
    .from("social_connections")
    .select("*")
    .eq("user_id", user.id)
    .eq("platform", dbPlatform)
    .single();

  if (fetchError || !connection) {
    if (asOrganization) {
      return NextResponse.json({ error: "Company page not connected. Click 'Connect Company Page' first." }, { status: 404 });
    }
    return NextResponse.json({ error: "Platform not connected" }, { status: 404 });
  }

  let accessToken = connection.access_token;

  // Check if token is expired and try to refresh
  if (connection.token_expires_at && new Date(connection.token_expires_at) < new Date()) {
    if (platform === "x" && connection.refresh_token) {
      try {
        const refreshed = await refreshXToken(connection.refresh_token);
        accessToken = refreshed.access_token;

        await supabase
          .from("social_connections")
          .update({
            access_token: refreshed.access_token,
            refresh_token: refreshed.refresh_token,
            token_expires_at: new Date(Date.now() + refreshed.expires_in * 1000).toISOString(),
            updated_at: new Date().toISOString(),
          })
          .eq("user_id", user.id)
          .eq("platform", "x");
      } catch {
        return NextResponse.json(
          { error: "TOKEN_EXPIRED", message: "Please reconnect your X account" },
          { status: 401 }
        );
      }
    } else {
      return NextResponse.json(
        { error: "TOKEN_EXPIRED", message: `Please reconnect your ${platform === "x" ? "X" : "LinkedIn"} account` },
        { status: 401 }
      );
    }
  }

  try {
    if (platform === "x") {
      const result = await postToX(accessToken, text.trim());
      return NextResponse.json({ success: true, postId: result.data?.id });
    } else if (asOrganization) {
      // Org posting uses the linkedin_org connection's token + org_id
      const orgId = connection.org_id;
      if (!orgId) {
        return NextResponse.json({ error: "No org ID configured" }, { status: 400 });
      }
      const result = await postToLinkedIn(accessToken, orgId, "organization", text.trim());
      return NextResponse.json({ success: true, postId: result.id });
    } else {
      // Personal posting
      const authorId = connection.platform_user_id;
      if (!authorId || authorId === "unknown") {
        return NextResponse.json(
          { error: "LinkedIn personal posting unavailable. Please disconnect and reconnect LinkedIn." },
          { status: 400 }
        );
      }
      const result = await postToLinkedIn(accessToken, authorId, "person", text.trim());
      return NextResponse.json({ success: true, postId: result.id });
    }
  } catch (err) {
    const errMessage = err instanceof Error ? err.message : "Post failed";
    console.error(`Social post error (${platform}):`, errMessage);
    if (errMessage === "TOKEN_EXPIRED") {
      return NextResponse.json(
        { error: "TOKEN_EXPIRED", message: `Please reconnect your ${platform === "x" ? "X" : "LinkedIn"} account` },
        { status: 401 }
      );
    }
    return NextResponse.json({ error: errMessage, details: errMessage }, { status: 500 });
  }
}
