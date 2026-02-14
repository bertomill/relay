import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { exchangeInstagramToken, getInstagramProfile } from "@/lib/social/oauth";

/**
 * POST /api/auth/instagram
 * Connects Instagram by exchanging the short-lived token from env for a long-lived one,
 * fetching the profile, and storing the connection.
 */
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const shortLivedToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  if (!shortLivedToken) {
    return NextResponse.json({ error: "Instagram access token not configured" }, { status: 500 });
  }

  try {
    // Exchange for long-lived token
    let accessToken: string;
    let expiresIn: number;

    try {
      const exchanged = await exchangeInstagramToken(shortLivedToken);
      accessToken = exchanged.access_token;
      expiresIn = exchanged.expires_in;
    } catch {
      // Token might already be long-lived, try using it directly
      accessToken = shortLivedToken;
      expiresIn = 5184000; // ~60 days default
    }

    // Fetch profile
    const profile = await getInstagramProfile(accessToken);

    // Upsert connection
    const { error } = await supabase.from("social_connections").upsert(
      {
        user_id: user.id,
        platform: "instagram",
        platform_user_id: profile.id,
        profile_name: profile.name || profile.username,
        profile_image: profile.profileImage || null,
        access_token: accessToken,
        token_expires_at: new Date(Date.now() + expiresIn * 1000).toISOString(),
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,platform" }
    );

    if (error) {
      console.error("Instagram connection save error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      profile: { username: profile.username, name: profile.name },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Connection failed";
    console.error("Instagram connection error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
