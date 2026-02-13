import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { createClient } from "@/lib/supabase/server";
import { exchangeXCode, getXProfile } from "@/lib/social/oauth";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const error = searchParams.get("error");

  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

  if (error) {
    return NextResponse.redirect(`${appUrl}/admin?social_error=${encodeURIComponent(error)}`);
  }

  if (!code || !state) {
    return NextResponse.redirect(`${appUrl}/admin?social_error=missing_params`);
  }

  const cookieStore = await cookies();
  const savedState = cookieStore.get("x_oauth_state")?.value;
  const codeVerifier = cookieStore.get("x_code_verifier")?.value;

  // Clean up cookies
  cookieStore.delete("x_oauth_state");
  cookieStore.delete("x_code_verifier");

  if (!savedState || state !== savedState) {
    return NextResponse.redirect(`${appUrl}/admin?social_error=state_mismatch`);
  }

  if (!codeVerifier) {
    return NextResponse.redirect(`${appUrl}/admin?social_error=missing_verifier`);
  }

  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.redirect(`${appUrl}/login`);
    }

    // Exchange code for tokens
    const tokens = await exchangeXCode(code, codeVerifier);
    const profile = await getXProfile(tokens.access_token);

    const expiresAt = new Date(Date.now() + tokens.expires_in * 1000).toISOString();

    // Upsert connection
    await supabase.from("social_connections").upsert(
      {
        user_id: user.id,
        platform: "x",
        access_token: tokens.access_token,
        refresh_token: tokens.refresh_token,
        token_expires_at: expiresAt,
        platform_user_id: profile.id,
        profile_name: `@${profile.username}`,
        profile_image: profile.profileImage || null,
        updated_at: new Date().toISOString(),
      },
      { onConflict: "user_id,platform" }
    );

    return NextResponse.redirect(`${appUrl}/admin?social_connected=x`);
  } catch (err) {
    console.error("X OAuth callback error:", err);
    return NextResponse.redirect(`${appUrl}/admin?social_error=token_exchange_failed`);
  }
}
