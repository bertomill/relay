import crypto from "crypto";

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";

// --- PKCE helpers (for X/Twitter OAuth 2.0) ---

export function generateCodeVerifier(): string {
  return crypto.randomBytes(32).toString("base64url");
}

export function generateCodeChallenge(verifier: string): string {
  return crypto.createHash("sha256").update(verifier).digest("base64url");
}

export function generateState(): string {
  return crypto.randomBytes(16).toString("hex");
}

// --- X (Twitter) OAuth 2.0 ---

export function getXAuthUrl(state: string, codeChallenge: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.X_CLIENT_ID!,
    redirect_uri: `${APP_URL}/api/auth/x/callback`,
    scope: "tweet.read tweet.write users.read offline.access",
    state,
    code_challenge: codeChallenge,
    code_challenge_method: "S256",
  });
  return `https://twitter.com/i/oauth2/authorize?${params.toString()}`;
}

export async function exchangeXCode(code: string, codeVerifier: string) {
  const credentials = Buffer.from(
    `${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      code,
      grant_type: "authorization_code",
      redirect_uri: `${APP_URL}/api/auth/x/callback`,
      code_verifier: codeVerifier,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`X token exchange failed: ${err}`);
  }

  return res.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
  }>;
}

export async function refreshXToken(refreshToken: string) {
  const credentials = Buffer.from(
    `${process.env.X_CLIENT_ID}:${process.env.X_CLIENT_SECRET}`
  ).toString("base64");

  const res = await fetch("https://api.twitter.com/2/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization: `Basic ${credentials}`,
    },
    body: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`X token refresh failed: ${err}`);
  }

  return res.json() as Promise<{
    access_token: string;
    refresh_token: string;
    expires_in: number;
  }>;
}

export async function getXProfile(accessToken: string) {
  const res = await fetch("https://api.twitter.com/2/users/me?user.fields=profile_image_url", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });

  if (!res.ok) throw new Error("Failed to fetch X profile");

  const data = await res.json();
  return {
    id: data.data.id as string,
    name: data.data.name as string,
    username: data.data.username as string,
    profileImage: data.data.profile_image_url as string | undefined,
  };
}

/**
 * Upload an image to X/Twitter and return the media ID.
 * Uses the simple (non-chunked) v1.1 media/upload endpoint with base64.
 */
async function uploadXImage(accessToken: string, imageUrl: string): Promise<string | null> {
  try {
    // 1. Download the image
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      console.warn("X: failed to download image:", imageUrl);
      return null;
    }
    const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
    console.log("X: downloaded image, size:", imgBuffer.length, "bytes");

    // 2. Simple upload with base64-encoded media_data
    const uploadRes = await fetch(
      "https://upload.twitter.com/1.1/media/upload.json",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams({
          media_data: imgBuffer.toString("base64"),
        }),
      }
    );

    if (!uploadRes.ok) {
      const err = await uploadRes.text();
      console.warn("X: media upload failed:", uploadRes.status, err);
      return null;
    }

    const { media_id_string } = await uploadRes.json();
    console.log("X: image uploaded, media_id:", media_id_string);
    return media_id_string;
  } catch (err) {
    console.warn("X: image upload error:", err);
    return null;
  }
}

export async function postToX(accessToken: string, text: string, imageUrl?: string) {
  // Upload image if provided
  let mediaId: string | null = null;
  if (imageUrl) {
    mediaId = await uploadXImage(accessToken, imageUrl);
  }

  const tweetBody: Record<string, unknown> = { text };
  if (mediaId) {
    tweetBody.media = { media_ids: [mediaId] };
  }

  const res = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(tweetBody),
  });

  if (!res.ok) {
    const err = await res.text();
    if (res.status === 401) {
      throw new Error("TOKEN_EXPIRED");
    }
    throw new Error(`Failed to post to X: ${err}`);
  }

  return res.json();
}

// --- LinkedIn OAuth 2.0 (Personal — "Share on LinkedIn" product) ---

export function getLinkedInAuthUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_CLIENT_ID!,
    redirect_uri: `${APP_URL}/api/auth/linkedin/callback`,
    scope: "openid profile w_member_social",
    state,
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

export async function exchangeLinkedInCode(code: string) {
  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: `${APP_URL}/api/auth/linkedin/callback`,
      client_id: process.env.LINKEDIN_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LinkedIn token exchange failed: ${err}`);
  }

  return res.json() as Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    refresh_token_expires_in?: number;
  }>;
}

export async function getLinkedInProfile(accessToken: string) {
  let name = "LinkedIn User";
  let profileImage: string | undefined;
  let memberId: string | undefined;
  let sub: string | undefined;

  // 1. Try /v2/userinfo first to get display name (most reliable with openid scope)
  const userInfoRes = await fetch("https://api.linkedin.com/v2/userinfo", {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  if (userInfoRes.ok) {
    const data = await userInfoRes.json();
    sub = data.sub as string;
    name = (data.name as string) || name;
    profileImage = (data.picture as string) || undefined;
    console.log("LinkedIn /v2/userinfo OK — sub:", sub, "name:", name);
  } else {
    console.warn("LinkedIn /v2/userinfo failed:", userInfoRes.status);
  }

  // 2. Try /v2/me to get the legacy member ID (needed for UGC Posts API)
  const meRes = await fetch("https://api.linkedin.com/v2/me", {
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "X-Restli-Protocol-Version": "2.0.0",
    },
  });
  if (meRes.ok) {
    const data = await meRes.json();
    memberId = data.id as string;
    const firstName = data.localizedFirstName || "";
    const lastName = data.localizedLastName || "";
    if (firstName || lastName) name = `${firstName} ${lastName}`.trim();
    console.log("LinkedIn /v2/me OK — memberId:", memberId);
  } else {
    const errText = await meRes.text();
    console.warn("LinkedIn /v2/me failed:", meRes.status, errText);
  }

  // 3. Try /rest/me as another fallback for the member ID
  if (!memberId) {
    const restMeRes = await fetch("https://api.linkedin.com/rest/me", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "LinkedIn-Version": "202502",
        "X-Restli-Protocol-Version": "2.0.0",
      },
    });
    if (restMeRes.ok) {
      const data = await restMeRes.json();
      memberId = data.id as string;
      console.log("LinkedIn /rest/me OK — memberId:", memberId);
    } else {
      console.warn("LinkedIn /rest/me failed:", restMeRes.status);
    }
  }

  // Use memberId if we got it, otherwise fall back to sub
  const id = memberId || sub || "unknown";
  const idSource = memberId ? "memberId" : sub ? "sub" : "none";
  console.log(`LinkedIn profile resolved: id=${id} (from ${idSource}), name=${name}`);

  return { id, name, profileImage, sub, memberId };
}

/**
 * Upload an image to LinkedIn and return the image URN.
 * Uses the /rest/images API (initializeUpload → PUT binary).
 */
async function uploadLinkedInImage(
  accessToken: string,
  authorUrn: string,
  imageUrl: string
): Promise<string | null> {
  try {
    // 1. Download the image
    const imgRes = await fetch(imageUrl);
    if (!imgRes.ok) {
      console.warn("LinkedIn: failed to download image:", imageUrl);
      return null;
    }
    const imgBuffer = Buffer.from(await imgRes.arrayBuffer());
    const contentType = imgRes.headers.get("content-type") || "image/jpeg";

    // 2. Initialize upload
    const initRes = await fetch(
      "https://api.linkedin.com/rest/images?action=initializeUpload",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          "LinkedIn-Version": "202502",
        },
        body: JSON.stringify({
          initializeUploadRequest: { owner: authorUrn },
        }),
      }
    );

    if (!initRes.ok) {
      const err = await initRes.text();
      console.warn("LinkedIn: initializeUpload failed:", err);
      return null;
    }

    const initData = await initRes.json();
    const uploadUrl = initData.value?.uploadUrl;
    const imageUrn = initData.value?.image;

    if (!uploadUrl || !imageUrn) {
      console.warn("LinkedIn: missing uploadUrl or image URN");
      return null;
    }

    // 3. Upload the binary
    const putRes = await fetch(uploadUrl, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": contentType,
      },
      body: imgBuffer,
    });

    if (!putRes.ok) {
      const err = await putRes.text();
      console.warn("LinkedIn: image PUT failed:", err);
      return null;
    }

    console.log("LinkedIn: image uploaded:", imageUrn);
    return imageUrn;
  } catch (err) {
    console.warn("LinkedIn: image upload error:", err);
    return null;
  }
}

export async function postToLinkedIn(accessToken: string, authorId: string, authorType: "person" | "organization", text: string, imageUrl?: string) {
  const authorUrn = `urn:li:${authorType}:${authorId}`;
  console.log(`LinkedIn: posting as ${authorUrn} (${text.length} chars)${imageUrl ? " with image" : ""}`);

  // Upload image if provided
  let imageUrn: string | null = null;
  if (imageUrl) {
    imageUrn = await uploadLinkedInImage(accessToken, authorUrn, imageUrl);
  }

  // Build post body
  const postBody: Record<string, unknown> = {
    author: authorUrn,
    commentary: text,
    visibility: "PUBLIC",
    distribution: {
      feedDistribution: "MAIN_FEED",
      targetEntities: [],
      thirdPartyDistributionChannels: [],
    },
    lifecycleState: "PUBLISHED",
    isReshareDisabledByAuthor: false,
  };

  // Add image content if upload succeeded
  if (imageUrn) {
    postBody.content = {
      media: { id: imageUrn },
    };
  }

  // Try the newer /rest/posts API first (works with OpenID Connect sub values)
  const restRes = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": "202502",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify(postBody),
  });

  if (restRes.ok || restRes.status === 201) {
    const postId = restRes.headers.get("x-restli-id");
    console.log("LinkedIn post created via /rest/posts:", postId);
    return { id: postId };
  }

  const restErr = await restRes.text();
  console.warn(`LinkedIn /rest/posts failed (${restRes.status}):`, restErr);

  // Fall back to legacy /v2/ugcPosts API
  const ugcShareContent: Record<string, unknown> = imageUrn
    ? {
        shareCommentary: { text },
        shareMediaCategory: "IMAGE",
        media: [{ status: "READY", media: imageUrn }],
      }
    : {
        shareCommentary: { text },
        shareMediaCategory: "NONE",
      };

  const ugcRes = await fetch("https://api.linkedin.com/v2/ugcPosts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
      author: authorUrn,
      lifecycleState: "PUBLISHED",
      specificContent: {
        "com.linkedin.ugc.ShareContent": ugcShareContent,
      },
      visibility: {
        "com.linkedin.ugc.MemberNetworkVisibility": "PUBLIC",
      },
    }),
  });

  if (ugcRes.ok || ugcRes.status === 201) {
    const postId = ugcRes.headers.get("x-restli-id");
    console.log("LinkedIn post created via /v2/ugcPosts:", postId);
    return { id: postId };
  }

  const ugcErr = await ugcRes.text();
  console.error(`LinkedIn /v2/ugcPosts also failed (${ugcRes.status}):`, ugcErr);

  if (restRes.status === 401 || ugcRes.status === 401) {
    throw new Error("TOKEN_EXPIRED");
  }

  throw new Error(`LinkedIn posting failed. /rest/posts: ${restRes.status} — ${restErr}. /v2/ugcPosts: ${ugcRes.status} — ${ugcErr}`);
}

// --- Instagram Graph API ---

const GRAPH_API_VERSION = "v21.0";

/** Exchange a short-lived Instagram token for a long-lived one (~60 days). */
export async function exchangeInstagramToken(shortLivedToken: string) {
  const params = new URLSearchParams({
    grant_type: "ig_exchange_token",
    client_secret: process.env.INSTAGRAM_APP_SECRET!,
    access_token: shortLivedToken,
  });

  const res = await fetch(
    `https://graph.instagram.com/access_token?${params.toString()}`
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Instagram token exchange failed: ${err}`);
  }

  return res.json() as Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }>;
}

/** Refresh a long-lived Instagram token (before it expires). */
export async function refreshInstagramToken(longLivedToken: string) {
  const params = new URLSearchParams({
    grant_type: "ig_refresh_token",
    access_token: longLivedToken,
  });

  const res = await fetch(
    `https://graph.instagram.com/refresh_access_token?${params.toString()}`
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Instagram token refresh failed: ${err}`);
  }

  return res.json() as Promise<{
    access_token: string;
    token_type: string;
    expires_in: number;
  }>;
}

/** Get the Instagram user profile. */
export async function getInstagramProfile(accessToken: string) {
  const res = await fetch(
    `https://graph.instagram.com/${GRAPH_API_VERSION}/me?fields=id,username,name,profile_picture_url&access_token=${accessToken}`
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Instagram profile fetch failed: ${err}`);
  }

  const data = await res.json();
  return {
    id: data.id as string,
    username: data.username as string,
    name: (data.name as string) || data.username,
    profileImage: data.profile_picture_url as string | undefined,
  };
}

/**
 * Post to Instagram. Requires an image URL — text-only posts are not supported.
 * Flow: create media container → wait for it to finish → publish.
 */
export async function postToInstagram(
  accessToken: string,
  igUserId: string,
  caption: string,
  imageUrl: string
) {
  // 1. Create media container
  const createRes = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        image_url: imageUrl,
        caption,
        access_token: accessToken,
      }),
    }
  );

  if (!createRes.ok) {
    const err = await createRes.text();
    if (createRes.status === 401 || createRes.status === 190) {
      throw new Error("TOKEN_EXPIRED");
    }
    throw new Error(`Instagram media creation failed: ${err}`);
  }

  const { id: creationId } = await createRes.json();

  // 2. Check container status (poll briefly)
  let ready = false;
  for (let i = 0; i < 10; i++) {
    const statusRes = await fetch(
      `https://graph.facebook.com/${GRAPH_API_VERSION}/${creationId}?fields=status_code&access_token=${accessToken}`
    );
    if (statusRes.ok) {
      const statusData = await statusRes.json();
      if (statusData.status_code === "FINISHED") {
        ready = true;
        break;
      }
      if (statusData.status_code === "ERROR") {
        throw new Error("Instagram media processing failed");
      }
    }
    await new Promise((r) => setTimeout(r, 1000));
  }

  if (!ready) {
    throw new Error("Instagram media processing timed out");
  }

  // 3. Publish
  const publishRes = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${igUserId}/media_publish`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        creation_id: creationId,
        access_token: accessToken,
      }),
    }
  );

  if (!publishRes.ok) {
    const err = await publishRes.text();
    throw new Error(`Instagram publish failed: ${err}`);
  }

  const result = await publishRes.json();
  return { id: result.id as string };
}

// --- Medium API ---

export async function getMediumProfile(integrationToken: string) {
  const res = await fetch("https://api.medium.com/v1/me", {
    headers: {
      Authorization: `Bearer ${integrationToken}`,
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Medium profile fetch failed: ${err}`);
  }

  const { data } = await res.json();
  return {
    id: data.id as string,
    username: data.username as string,
    name: data.name as string,
    imageUrl: data.imageUrl as string | undefined,
  };
}

export async function postToMedium(
  integrationToken: string,
  authorId: string,
  title: string,
  content: string
) {
  const res = await fetch(
    `https://api.medium.com/v1/users/${authorId}/posts`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${integrationToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        title,
        contentFormat: "markdown",
        content,
        publishStatus: "draft",
      }),
    }
  );

  if (!res.ok) {
    const err = await res.text();
    if (res.status === 401) throw new Error("TOKEN_EXPIRED");
    throw new Error(`Medium post failed: ${err}`);
  }

  const { data } = await res.json();
  return { id: data.id as string, url: data.url as string };
}

// --- Facebook Page API ---

export async function getFacebookPageInfo(pageAccessToken: string, pageId: string) {
  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}?fields=id,name,picture&access_token=${pageAccessToken}`
  );

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`Facebook page info fetch failed: ${err}`);
  }

  const data = await res.json();
  return {
    id: data.id as string,
    name: data.name as string,
    picture: data.picture?.data?.url as string | undefined,
  };
}

export async function postToFacebook(
  pageAccessToken: string,
  pageId: string,
  message: string,
  imageUrl?: string
) {
  let endpoint: string;
  let body: Record<string, string>;

  if (imageUrl) {
    endpoint = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/photos`;
    body = { url: imageUrl, caption: message, access_token: pageAccessToken };
  } else {
    endpoint = `https://graph.facebook.com/${GRAPH_API_VERSION}/${pageId}/feed`;
    body = { message, access_token: pageAccessToken };
  }

  const res = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  if (!res.ok) {
    const err = await res.text();
    if (res.status === 401 || res.status === 190) throw new Error("TOKEN_EXPIRED");
    throw new Error(`Facebook post failed: ${err}`);
  }

  const data = await res.json();
  return { id: (data.id || data.post_id) as string };
}

// --- LinkedIn Org OAuth 2.0 (Company Page — "Community Management API" product) ---

const ORG_REDIRECT_URI = "https://www.lightenai.site/api/auth/linkedin-org/callback";

export function getLinkedInOrgAuthUrl(state: string): string {
  const params = new URLSearchParams({
    response_type: "code",
    client_id: process.env.LINKEDIN_ORG_CLIENT_ID!,
    redirect_uri: ORG_REDIRECT_URI,
    scope: "w_organization_social",
    state,
  });
  return `https://www.linkedin.com/oauth/v2/authorization?${params.toString()}`;
}

export async function exchangeLinkedInOrgCode(code: string) {
  const res = await fetch("https://www.linkedin.com/oauth/v2/accessToken", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "authorization_code",
      code,
      redirect_uri: ORG_REDIRECT_URI,
      client_id: process.env.LINKEDIN_ORG_CLIENT_ID!,
      client_secret: process.env.LINKEDIN_ORG_CLIENT_SECRET!,
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`LinkedIn Org token exchange failed: ${err}`);
  }

  return res.json() as Promise<{
    access_token: string;
    expires_in: number;
    refresh_token?: string;
    refresh_token_expires_in?: number;
  }>;
}
