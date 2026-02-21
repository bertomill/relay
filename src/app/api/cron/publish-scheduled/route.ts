import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import {
  postToX,
  postToLinkedIn,
  postToInstagram,
  postToMedium,
  postToFacebook,
  refreshXToken,
  refreshInstagramToken,
} from "@/lib/social/oauth";

import sharp from "sharp";

async function getPublicImageUrl(imageUrl: string): Promise<string> {
  const supabase = createAdminClient();
  const imgRes = await fetch(imageUrl);
  if (!imgRes.ok) throw new Error("Failed to download image for re-upload");
  const buffer = Buffer.from(await imgRes.arrayBuffer());
  const jpegBuffer = await sharp(buffer).jpeg({ quality: 90 }).toBuffer();
  const fileName = `social/${Date.now()}.jpg`;
  const { error } = await supabase.storage
    .from("visuals")
    .upload(fileName, jpegBuffer, { contentType: "image/jpeg", upsert: false });
  if (error) throw new Error(`Storage upload failed: ${error.message}`);
  const { data } = supabase.storage.from("visuals").getPublicUrl(fileName);
  return data.publicUrl;
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  const authHeader = request.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;

  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();

  // Find all pending posts that are due
  const { data: duePosts, error: fetchError } = await admin
    .from("scheduled_posts")
    .select("*")
    .eq("status", "pending")
    .lte("scheduled_at", new Date().toISOString())
    .order("scheduled_at", { ascending: true });

  if (fetchError) {
    return NextResponse.json({ error: fetchError.message }, { status: 500 });
  }

  if (!duePosts || duePosts.length === 0) {
    return NextResponse.json({ published: 0 });
  }

  let published = 0;
  let failed = 0;

  for (const post of duePosts) {
    try {
      // Determine the platform to look up in social_connections
      const dbPlatform = post.platform;

      // Fetch the user's connection for this platform
      const { data: connection, error: connError } = await admin
        .from("social_connections")
        .select("*")
        .eq("user_id", post.user_id)
        .eq("platform", dbPlatform)
        .single();

      if (connError || !connection) {
        throw new Error(`No ${dbPlatform} connection found for user`);
      }

      let accessToken = connection.access_token;

      // Refresh token if expired
      if (connection.token_expires_at && new Date(connection.token_expires_at) < new Date()) {
        const basePlatform = dbPlatform === "linkedin_org" ? "linkedin" : dbPlatform;
        if (basePlatform === "x" && connection.refresh_token) {
          const refreshed = await refreshXToken(connection.refresh_token);
          accessToken = refreshed.access_token;
          await admin
            .from("social_connections")
            .update({
              access_token: refreshed.access_token,
              refresh_token: refreshed.refresh_token,
              token_expires_at: new Date(Date.now() + refreshed.expires_in * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", post.user_id)
            .eq("platform", dbPlatform);
        } else if (basePlatform === "instagram") {
          const refreshed = await refreshInstagramToken(accessToken);
          accessToken = refreshed.access_token;
          await admin
            .from("social_connections")
            .update({
              access_token: refreshed.access_token,
              token_expires_at: new Date(Date.now() + refreshed.expires_in * 1000).toISOString(),
              updated_at: new Date().toISOString(),
            })
            .eq("user_id", post.user_id)
            .eq("platform", dbPlatform);
        } else {
          throw new Error("TOKEN_EXPIRED");
        }
      }

      // Publish to the platform
      let postId: string | null | undefined;
      const platform = dbPlatform === "linkedin_org" ? "linkedin" : dbPlatform;

      if (platform === "medium") {
        const mdContent = post.markdown_content || post.text;
        const titleMatch = mdContent.match(/^#\s+(.+)$/m) || mdContent.match(/^(.+)$/m);
        const title = titleMatch ? titleMatch[1].replace(/[#*_`]/g, "").trim() : "Untitled";
        const authorId = connection.platform_user_id;
        const result = await postToMedium(accessToken, authorId, title, mdContent);
        postId = result.id;
      } else if (platform === "facebook") {
        const pageId = connection.platform_user_id;
        let fbImageUrl = post.image_url;
        if (fbImageUrl) {
          fbImageUrl = await getPublicImageUrl(fbImageUrl);
        }
        const result = await postToFacebook(accessToken, pageId, post.text, fbImageUrl);
        postId = result.id;
      } else if (platform === "instagram") {
        if (!post.image_url) {
          throw new Error("Instagram requires an image");
        }
        const publicUrl = await getPublicImageUrl(post.image_url);
        const igUserId = connection.platform_user_id;
        const result = await postToInstagram(accessToken, igUserId, post.text, publicUrl);
        postId = result.id;
      } else if (platform === "x") {
        const result = await postToX(accessToken, post.text, post.image_url || undefined);
        postId = result.data?.id;
      } else if (dbPlatform === "linkedin_org") {
        const orgId = connection.org_id;
        if (!orgId) throw new Error("No org ID configured");
        const result = await postToLinkedIn(accessToken, orgId, "organization", post.text, post.image_url || undefined);
        postId = result.id;
      } else {
        // LinkedIn personal
        const authorId = connection.platform_user_id;
        if (!authorId || authorId === "unknown") {
          throw new Error("LinkedIn personal posting unavailable");
        }
        const result = await postToLinkedIn(accessToken, authorId, "person", post.text, post.image_url || undefined);
        postId = result.id;
      }

      // Mark as published
      await admin
        .from("scheduled_posts")
        .update({
          status: "published",
          post_id: postId || null,
          published_at: new Date().toISOString(),
        })
        .eq("id", post.id);

      published++;
    } catch (err) {
      const errMessage = err instanceof Error ? err.message : "Unknown error";
      console.error(`Failed to publish scheduled post ${post.id}:`, errMessage);

      await admin
        .from("scheduled_posts")
        .update({
          status: "failed",
          error_message: errMessage,
        })
        .eq("id", post.id);

      failed++;
    }
  }

  return NextResponse.json({ published, failed, total: duePosts.length });
}
