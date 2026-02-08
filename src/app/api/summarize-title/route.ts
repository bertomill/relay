import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { messages } = await request.json();

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return NextResponse.json({ title: "New conversation" });
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    // Fallback: first user message truncated
    const first = messages.find((m: { role: string }) => m.role === "user");
    return NextResponse.json({ title: first?.content?.slice(0, 40) || "New conversation" });
  }

  // Build a compact summary of the conversation (first 3 messages max)
  const snippet = messages
    .slice(0, 3)
    .map((m: { role: string; content: string }) => `${m.role}: ${m.content.slice(0, 200)}`)
    .join("\n");

  try {
    const res = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 30,
        messages: [
          {
            role: "user",
            content: `Summarize this chat session into a short title (3-6 words). Return ONLY the title, no quotes, no punctuation at the end.\n\n${snippet}`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const first = messages.find((m: { role: string }) => m.role === "user");
      return NextResponse.json({ title: first?.content?.slice(0, 40) || "New conversation" });
    }

    const data = await res.json();
    const title = data.content?.[0]?.text?.trim() || "New conversation";
    return NextResponse.json({ title });
  } catch {
    const first = messages.find((m: { role: string }) => m.role === "user");
    return NextResponse.json({ title: first?.content?.slice(0, 40) || "New conversation" });
  }
}
