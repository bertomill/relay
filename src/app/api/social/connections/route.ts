import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { data, error } = await supabase
    .from("social_connections")
    .select("platform, platform_user_id, profile_name, profile_image, token_expires_at, org_id, org_name")
    .eq("user_id", user.id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const connections = (data || []).map((c) => ({
    platform: c.platform,
    platformUserId: c.platform_user_id,
    profileName: c.profile_name,
    profileImage: c.profile_image,
    isExpired: c.token_expires_at ? new Date(c.token_expires_at) < new Date() : false,
    orgId: c.org_id,
    orgName: c.org_name,
  }));

  return NextResponse.json({ connections });
}

export async function PATCH(request: NextRequest) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { platform, orgId, orgName } = await request.json();

  if (!platform || !["x", "linkedin", "instagram"].includes(platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }

  const { error } = await supabase
    .from("social_connections")
    .update({ org_id: orgId || null, org_name: orgName || null, updated_at: new Date().toISOString() })
    .eq("user_id", user.id)
    .eq("platform", platform);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const platform = searchParams.get("platform");

  if (!platform || !["x", "linkedin", "linkedin_org", "instagram"].includes(platform)) {
    return NextResponse.json({ error: "Invalid platform" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { error } = await supabase
    .from("social_connections")
    .delete()
    .eq("user_id", user.id)
    .eq("platform", platform);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
