import { chromium, Page } from "playwright";
import path from "path";
import fs from "fs";

const OUT_DIR = path.join(__dirname, "frames");
const BASE_URL = "http://localhost:3000";
const CHAT_URL = `${BASE_URL}/agents/content-creator/chat`;

let frameNum = 0;

async function screenshot(page: Page, label: string) {
  const filename = `frame_${String(frameNum++).padStart(3, "0")}_${label}.png`;
  await page.screenshot({
    path: path.join(OUT_DIR, filename),
    fullPage: false,
  });
  console.log(`  📸 ${filename}`);
  return filename;
}

async function sleep(ms: number) {
  return new Promise((r) => setTimeout(r, ms));
}

async function main() {
  // Clean & create output dir
  if (fs.existsSync(OUT_DIR)) {
    fs.rmSync(OUT_DIR, { recursive: true });
  }
  fs.mkdirSync(OUT_DIR, { recursive: true });

  console.log("🎬 Launching browser...");
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Clear any previous session data
  await page.goto(BASE_URL);
  await page.evaluate(() => {
    localStorage.removeItem("content-creator-sessions");
  });

  console.log("📍 Navigating to Content Creator chat...");
  await page.goto(CHAT_URL, { waitUntil: "networkidle" });
  await sleep(2000);

  // Frame 1: Empty state
  console.log("1️⃣  Empty state");
  await screenshot(page, "empty_state");

  // Frame 2: Type a message
  const prompt =
    "Write a short LinkedIn post about how AI agents can help small businesses save time on content creation. Keep it under 150 words.";
  console.log("2️⃣  Typing prompt...");
  const textarea = page.locator("textarea");
  await textarea.click();
  await sleep(300);
  await textarea.fill(prompt);
  await sleep(500);
  await screenshot(page, "typing_complete");

  // Frame 3: Submit & wait for response
  console.log("3️⃣  Submitting...");
  await page.locator('button[type="submit"]').click();
  await sleep(1500);
  await screenshot(page, "loading");

  console.log("   ⏳ Waiting for AI response (up to 3 min)...");
  try {
    await page.waitForFunction(
      () => {
        const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
        const content = document.querySelectorAll("[data-assistant-content]");
        return (
          btn &&
          !btn.disabled &&
          content.length > 0 &&
          (content[content.length - 1] as HTMLElement).innerText.length > 30
        );
      },
      { timeout: 180_000 }
    );
  } catch {
    console.log("   ⚠️  Response didn't fully complete, continuing...");
  }
  await sleep(1500);

  // Scroll to show the response well
  const chatArea = page.locator(".overflow-y-auto").first();
  await chatArea.evaluate((el) => {
    el.scrollTop = Math.max(0, el.scrollHeight - el.clientHeight - 100);
  });
  await sleep(500);

  console.log("4️⃣  Response received");
  await screenshot(page, "response");

  // Frame 5: Highlight text using real mouse drag
  console.log("5️⃣  Highlighting text with mouse drag...");
  const assistantContent = page.locator("[data-assistant-content]").last();
  const box = await assistantContent.boundingBox();

  if (!box) {
    console.log("   ❌ Could not find assistant content bounding box");
    await browser.close();
    return;
  }

  // Start drag from a point well inside the content area
  const startX = box.x + 20;
  const startY = box.y + Math.min(40, box.height / 3);
  const endX = box.x + Math.min(box.width - 20, 450);
  const endY = startY + 40; // drag across ~2 lines

  await page.mouse.move(startX, startY);
  await page.mouse.down();
  await sleep(100);
  // Drag slowly so the browser registers the selection
  const steps = 15;
  for (let i = 1; i <= steps; i++) {
    await page.mouse.move(
      startX + ((endX - startX) * i) / steps,
      startY + ((endY - startY) * i) / steps
    );
    await sleep(30);
  }
  await page.mouse.up();
  await sleep(1000);

  // Check if popover appeared
  const popoverVisible = await page.locator('input[placeholder="Ask something about this..."]').isVisible().catch(() => false);
  console.log(`   Popover visible: ${popoverVisible}`);

  console.log("6️⃣  Highlight with popover");
  await screenshot(page, "highlight_popover");

  if (popoverVisible) {
    // Frame 6: Type a custom question
    console.log("7️⃣  Typing custom question...");
    const popoverInput = page.locator('input[placeholder="Ask something about this..."]');
    await popoverInput.click();
    await sleep(300);
    await popoverInput.fill("How can I make this more engaging?");
    await sleep(800);
    await screenshot(page, "popover_question");

    // Frame 7: Click send in popover
    console.log("8️⃣  Sending follow-up...");
    // The send button is the sibling button next to the input inside a flex container
    const sendBtn = page.locator('input[placeholder="Ask something about this..."] + button, input[placeholder="Ask something about this..."] ~ button').first();
    await sendBtn.click();
    await sleep(2000);
    await screenshot(page, "followup_sent");

    // Wait for follow-up response
    console.log("   ⏳ Waiting for follow-up response...");
    try {
      await page.waitForFunction(
        () => {
          const btn = document.querySelector('button[type="submit"]') as HTMLButtonElement;
          return btn && !btn.disabled;
        },
        { timeout: 180_000 }
      );
      await sleep(2000);
    } catch {
      console.log("   ⚠️  Follow-up timed out");
    }

    // Scroll to bottom to show the follow-up
    await chatArea.evaluate((el) => {
      el.scrollTop = el.scrollHeight;
    });
    await sleep(500);
    await screenshot(page, "followup_response");
  } else {
    console.log("   ⚠️  Popover didn't appear — taking screenshot of selection anyway");
  }

  // Final frame: scroll to show full conversation
  console.log("9️⃣  Final overview");
  await chatArea.evaluate((el) => {
    el.scrollTop = 0;
  });
  await sleep(500);
  await screenshot(page, "final_top");
  await chatArea.evaluate((el) => {
    el.scrollTop = el.scrollHeight;
  });
  await sleep(500);
  await screenshot(page, "final_bottom");

  console.log("\n✅ Done! Captured frames in:", OUT_DIR);

  // Write manifest
  const frames = fs.readdirSync(OUT_DIR).filter((f) => f.endsWith(".png")).sort();
  console.log(`   ${frames.length} frames captured`);

  const manifest = {
    frames,
    voiceover_script: [
      { frame: "empty_state", text: "Here's our Content Creator agent, ready to help draft multi-platform content.", duration: 3 },
      { frame: "typing_complete", text: "Let's ask it to write a LinkedIn post about AI agents helping small businesses.", duration: 3 },
      { frame: "loading", text: "The agent gets to work, powered by Claude.", duration: 2 },
      { frame: "response", text: "In seconds, we have a polished LinkedIn post ready to go.", duration: 3 },
      { frame: "highlight_popover", text: "Now here's the new feature. Highlight any text in the response and a smart popover appears.", duration: 4 },
      { frame: "popover_question", text: "You can type a follow-up question about that specific section.", duration: 3 },
      { frame: "followup_response", text: "The AI understands the context and gives you targeted improvements. Highlight, ask, iterate. That's the workflow.", duration: 5 },
    ],
  };
  fs.writeFileSync(path.join(OUT_DIR, "manifest.json"), JSON.stringify(manifest, null, 2));

  await browser.close();
}

main().catch((e) => {
  console.error("❌ Error:", e);
  process.exit(1);
});
