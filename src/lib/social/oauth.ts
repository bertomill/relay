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

export async function postToX(accessToken: string, text: string) {
  const res = await fetch("https://api.twitter.com/2/tweets", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text }),
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

export async function postToLinkedIn(accessToken: string, authorId: string, authorType: "person" | "organization", text: string) {
  const authorUrn = `urn:li:${authorType}:${authorId}`;
  console.log(`LinkedIn: posting as ${authorUrn} (${text.length} chars)`);

  // Try the newer /rest/posts API first (works with OpenID Connect sub values)
  const restRes = await fetch("https://api.linkedin.com/rest/posts", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      "LinkedIn-Version": "202502",
      "X-Restli-Protocol-Version": "2.0.0",
    },
    body: JSON.stringify({
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
    }),
  });

  if (restRes.ok || restRes.status === 201) {
    const postId = restRes.headers.get("x-restli-id");
    console.log("LinkedIn post created via /rest/posts:", postId);
    return { id: postId };
  }

  const restErr = await restRes.text();
  console.warn(`LinkedIn /rest/posts failed (${restRes.status}):`, restErr);

  // Fall back to legacy /v2/ugcPosts API
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
        "com.linkedin.ugc.ShareContent": {
          shareCommentary: { text },
          shareMediaCategory: "NONE",
        },
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
