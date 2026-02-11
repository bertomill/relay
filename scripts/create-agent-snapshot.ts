/**
 * Creates a Vercel Sandbox snapshot pre-loaded with:
 * - @anthropic-ai/claude-code (CLI the SDK spawns)
 * - @anthropic-ai/claude-agent-sdk
 * - runner.mjs (generic script that calls query() and outputs SSE)
 *
 * Usage:
 *   npx tsx scripts/create-agent-snapshot.ts
 *
 * Store the printed snapshot ID as AGENT_SANDBOX_SNAPSHOT_ID in .env.local
 * Re-run every 7 days (snapshots expire).
 */

import { config } from "dotenv";
config({ path: ".env.local" });

import { Sandbox } from "@vercel/sandbox";
import * as fs from "fs";
import * as path from "path";

async function main() {
  console.log("Creating sandbox with node22 runtime...");
  const sandbox = await Sandbox.create({ runtime: "node22", timeout: 300_000 });
  console.log(`Sandbox created: ${sandbox.sandboxId}`);

  // Initialize a package.json in the working directory so npm install works locally
  console.log("Initializing package.json...");
  const initResult = await sandbox.runCommand("npm", ["init", "-y"]);
  if (initResult.exitCode !== 0) {
    console.error("npm init failed:", await initResult.stderr());
    await sandbox.stop();
    process.exit(1);
  }

  // Install the Agent SDK locally (so ESM imports resolve from /vercel/sandbox)
  console.log("Installing @anthropic-ai/claude-agent-sdk...");
  const installSdkResult = await sandbox.runCommand("npm", [
    "install",
    "@anthropic-ai/claude-agent-sdk",
  ]);
  if (installSdkResult.exitCode !== 0) {
    console.error("SDK install failed:", await installSdkResult.stderr());
    await sandbox.stop();
    process.exit(1);
  }
  console.log("SDK installed locally.");

  // Install fal.ai client and tsx for running scripts in sandbox
  console.log("Installing @fal-ai/client and tsx...");
  const installFalResult = await sandbox.runCommand("npm", [
    "install",
    "@fal-ai/client",
    "tsx",
  ]);
  if (installFalResult.exitCode !== 0) {
    console.error("fal/tsx install failed:", await installFalResult.stderr());
    await sandbox.stop();
    process.exit(1);
  }
  console.log("@fal-ai/client and tsx installed locally.");

  // Install Claude Code CLI globally (the subprocess the SDK spawns)
  console.log("Installing @anthropic-ai/claude-code globally...");
  const installCliResult = await sandbox.runCommand("npm", [
    "install",
    "-g",
    "@anthropic-ai/claude-code",
  ]);
  if (installCliResult.exitCode !== 0) {
    console.error("CLI install failed:", await installCliResult.stderr());
    await sandbox.stop();
    process.exit(1);
  }
  console.log("Claude Code CLI installed globally.");

  // Upload runner.mjs into the sandbox
  const runnerPath = path.join(__dirname, "agent-runner.mjs");
  const runnerContent = fs.readFileSync(runnerPath);
  await sandbox.writeFiles([{ path: "runner.mjs", content: Buffer.from(runnerContent) }]);
  console.log("runner.mjs uploaded.");

  // Upload generate-image.ts into the sandbox (for content-creator image generation)
  const generateImagePath = path.join(__dirname, "content-creator", "generate-image.ts");
  if (fs.existsSync(generateImagePath)) {
    const generateImageContent = fs.readFileSync(generateImagePath);
    await sandbox.writeFiles([
      {
        path: "scripts/content-creator/generate-image.ts",
        content: Buffer.from(generateImageContent),
      },
    ]);
    console.log("generate-image.ts uploaded.");
  } else {
    console.warn("generate-image.ts not found, skipping.");
  }

  // Take a snapshot (this stops the sandbox automatically)
  console.log("Taking snapshot...");
  const snapshot = await sandbox.snapshot();
  console.log(`\nSnapshot created!`);
  console.log(`  Snapshot ID: ${snapshot.snapshotId}`);
  console.log(`  Size: ${(snapshot.sizeBytes / 1024 / 1024).toFixed(1)} MB`);
  console.log(`  Expires: ${snapshot.expiresAt.toISOString()}`);
  console.log(`\nAdd to .env.local:`);
  console.log(`  AGENT_SANDBOX_SNAPSHOT_ID=${snapshot.snapshotId}`);
}

main().catch((err) => {
  console.error("Fatal:", err);
  process.exit(1);
});
