import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { getMediumProfile } from "@/lib/social/oauth";

/**
 * POST /api/auth/medium
 * Connects Medium using an integration token from env vars.
 */
export async function POST() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const integrationToken = process.env.MEDIUM_INTEGRATION_TOKEN;

  if (!integrationToken) {
    return NextResponse.json({ error: "Medium integration token not configured" }, { status: 500 });
  }

  try {
    const profile = await getMediumProfile(integrationToken);
    console.log("Medium profile fetched:", profile.username, profile.id);

    const { error } = await supabase.from("social_connections").upsert(
      {
        user_id: user.id,
        platform: "medium",
        platform_user_id: profile.id,
        profile_name: profile.name || profile.username,
        profile_image: profile.imageUrl || null,
        access_token: integrationToken,
        token_expires_at: null, // Integration tokens don't expire
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,platform" }
    );

    if (error) {
      console.error("Medium connection save error:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      profile: { username: profile.username, name: profile.name },
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Connection failed";
    console.error("Medium connection error:", message);
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
