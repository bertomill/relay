import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getFacebookPageInfo } from "@/lib/social/oauth";

/**
 * POST /api/auth/facebook
 * Connects Facebook Page using the same Page Access Token as Instagram
 * and FACEBOOK_PAGE_ID from env vars.
 */
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const pageAccessToken = process.env.INSTAGRAM_PAGE_ACCESS_TOKEN;
  const pageId = process.env.FACEBOOK_PAGE_ID;

  if (!pageAccessToken) {
    return NextResponse.json({ error: "Facebook Page Access Token not configured" }, { status: 500 });
  }
  if (!pageId) {
    return NextResponse.json({ error: "Facebook Page ID not configured" }, { status: 500 });
  }

  try {
    const pageInfo = await getFacebookPageInfo(pageAccessToken, pageId);
    console.log("Facebook page fetched:", pageInfo.name, pageInfo.id);

    const { error } = await supabase.from("social_connections").upsert(
      {
        user_id: user.id,
        platform: "facebook",
        platform_user_id: pageId,
        profile_name: pageInfo.name,
        profile_image: pageInfo.picture || null,
        access_token: pageAccessToken,
        token_expires_at: new Date(Date.now() + 5184000 * 1000).toISOString(), // ~60 days (same as Instagram)
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,platform" }
    );

    if (error) {
      console.error("Facebook connection save error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      profile: { name: pageInfo.name, id: pageInfo.id },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Connection failed";
    console.error("Facebook connection error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
