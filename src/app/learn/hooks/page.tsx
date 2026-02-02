"use client";

import { useState } from "react";
import { LearnLayout, ChapterNavigation } from "../components";

function LanguageToggle({
  language,
  setLanguage
}: {
  language: "typescript" | "python";
  setLanguage: (lang: "typescript" | "python") => void;
}) {
  return (
    <div className="flex bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-1 w-fit">
      <button
        onClick={() => setLanguage("typescript")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          language === "typescript"
            ? "bg-[#d4a574] text-[#0a0a0a]"
            : "text-[#a1a1a1] hover:text-[#fafafa]"
        }`}
      >
        TypeScript
      </button>
      <button
        onClick={() => setLanguage("python")}
        className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
          language === "python"
            ? "bg-[#d4a574] text-[#0a0a0a]"
            : "text-[#a1a1a1] hover:text-[#fafafa]"
        }`}
      >
        Python
      </button>
    </div>
  );
}

function CodeBlock({ filename, children }: { filename: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden">
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-[#1f1f1f]">
        <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
        <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        <span className="ml-2 text-xs text-[#737373]">{filename}</span>
      </div>
      <pre className="p-4 text-sm font-mono overflow-x-auto">
        <code>{children}</code>
      </pre>
    </div>
  );
}

function Tabs({
  tabs,
  activeTab,
  setActiveTab
}: {
  tabs: string[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
}) {
  return (
    <div className="flex gap-1 bg-[#0d0d0d] border border-[#1f1f1f] rounded-lg p-1 w-fit mb-4">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-md text-sm font-medium transition-all ${
            activeTab === tab
              ? "bg-[#1a1a1a] text-[#fafafa]"
              : "text-[#737373] hover:text-[#a1a1a1]"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

function HookCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="group bg-[#111111] border border-[#1f1f1f] rounded-xl p-5 hover:border-[#d4a574]/50 hover:bg-[#141414] transition-all duration-300">
      <div className="w-10 h-10 rounded-lg bg-[#d4a574]/10 flex items-center justify-center text-[#d4a574] mb-4 group-hover:scale-110 transition-transform">
        {icon}
      </div>
      <h4 className="text-[#fafafa] font-medium mb-2">{title}</h4>
      <p className="text-sm text-[#a1a1a1]">{description}</p>
    </div>
  );
}

function TipBox({ title, children }: { title?: string; children: React.ReactNode }) {
  return (
    <div className="bg-[#1a2a1a] border border-[#28c840]/30 rounded-xl p-5 my-6">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-[#28c840]/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-[#28c840]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div>
          {title && <p className="font-medium text-[#28c840] mb-2">{title}</p>}
          <div className="text-sm text-[#a1a1a1]">{children}</div>
        </div>
      </div>
    </div>
  );
}

function NoteBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[#1a1a2a] border border-[#7c9cd4]/30 rounded-xl p-5 my-6">
      <div className="flex items-start gap-3">
        <div className="w-6 h-6 rounded-full bg-[#7c9cd4]/20 flex items-center justify-center shrink-0 mt-0.5">
          <svg className="w-4 h-4 text-[#7c9cd4]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <div className="text-sm text-[#a1a1a1]">{children}</div>
      </div>
    </div>
  );
}

// Code examples
const introExamplePy = `import asyncio
from claude_agent_sdk import query, ClaudeAgentOptions, HookMatcher

# Define a hook callback that receives tool call details
async def protect_env_files(input_data, tool_use_id, context):
    # Extract the file path from the tool's input arguments
    file_path = input_data['tool_input'].get('file_path', '')
    file_name = file_path.split('/')[-1]

    # Block the operation if targeting a .env file
    if file_name == '.env':
        return {
            'hookSpecificOutput': {
                'hookEventName': input_data['hook_event_name'],
                'permissionDecision': 'deny',
                'permissionDecisionReason': 'Cannot modify .env files'
            }
        }

    # Return empty object to allow the operation
    return {}

async def main():
    async for message in query(
        prompt="Update the database configuration",
        options=ClaudeAgentOptions(
            hooks={
                # Register the hook for PreToolUse events
                # The matcher filters to only Write and Edit tool calls
                'PreToolUse': [HookMatcher(matcher='Write|Edit', hooks=[protect_env_files])]
            }
        )
    ):
        print(message)

asyncio.run(main())`;

const introExampleTs = `import { query, HookCallback, PreToolUseHookInput } from "@anthropic-ai/claude-agent-sdk";

// Define a hook callback with the HookCallback type
const protectEnvFiles: HookCallback = async (input, toolUseID, { signal }) => {
  // Cast input to the specific hook type for type safety
  const preInput = input as PreToolUseHookInput;

  // Extract the file path from the tool's input arguments
  const filePath = preInput.tool_input?.file_path as string;
  const fileName = filePath?.split('/').pop();

  // Block the operation if targeting a .env file
  if (fileName === '.env') {
    return {
      hookSpecificOutput: {
        hookEventName: input.hook_event_name,
        permissionDecision: 'deny',
        permissionDecisionReason: 'Cannot modify .env files'
      }
    };
  }

  // Return empty object to allow the operation
  return {};
};

for await (const message of query({
  prompt: "Update the database configuration",
  options: {
    hooks: {
      // Register the hook for PreToolUse events
      // The matcher filters to only Write and Edit tool calls
      PreToolUse: [{ matcher: 'Write|Edit', hooks: [protectEnvFiles] }]
    }
  }
})) {
  console.log(message);
}`;

const configureHooksPy = `async for message in query(
    prompt="Your prompt",
    options=ClaudeAgentOptions(
        hooks={
            'PreToolUse': [HookMatcher(matcher='Bash', hooks=[my_callback])]
        }
    )
):
    print(message)`;

const configureHooksTs = `for await (const message of query({
  prompt: "Your prompt",
  options: {
    hooks: {
      PreToolUse: [{ matcher: 'Bash', hooks: [myCallback] }]
    }
  }
})) {
  console.log(message);
}`;

const matcherExamplePy = `options = ClaudeAgentOptions(
    hooks={
        'PreToolUse': [
            HookMatcher(matcher='Write|Edit', hooks=[validate_file_path])
        ]
    }
)`;

const matcherExampleTs = `const options = {
  hooks: {
    PreToolUse: [
      { matcher: 'Write|Edit', hooks: [validateFilePath] }
    ]
  }
};`;

const logToolCallsPy = `async def log_tool_calls(input_data, tool_use_id, context):
    if input_data['hook_event_name'] == 'PreToolUse':
        print(f"Tool: {input_data['tool_name']}")
        print(f"Input: {input_data['tool_input']}")
    return {}`;

const logToolCallsTs = `const logToolCalls: HookCallback = async (input, toolUseID, { signal }) => {
  if (input.hook_event_name === 'PreToolUse') {
    const preInput = input as PreToolUseHookInput;
    console.log(\`Tool: \${preInput.tool_name}\`);
    console.log(\`Input:\`, preInput.tool_input);
  }
  return {};
};`;

const blockEtcPy = `async def block_etc_writes(input_data, tool_use_id, context):
    file_path = input_data['tool_input'].get('file_path', '')

    if file_path.startswith('/etc'):
        return {
            # Top-level field: inject guidance into the conversation
            'systemMessage': 'Remember: system directories like /etc are protected.',
            # hookSpecificOutput: block the operation
            'hookSpecificOutput': {
                'hookEventName': input_data['hook_event_name'],
                'permissionDecision': 'deny',
                'permissionDecisionReason': 'Writing to /etc is not allowed'
            }
        }
    return {}`;

const blockEtcTs = `const blockEtcWrites: HookCallback = async (input, toolUseID, { signal }) => {
  const filePath = (input as PreToolUseHookInput).tool_input?.file_path as string;

  if (filePath?.startsWith('/etc')) {
    return {
      // Top-level field: inject guidance into the conversation
      systemMessage: 'Remember: system directories like /etc are protected.',
      // hookSpecificOutput: block the operation
      hookSpecificOutput: {
        hookEventName: input.hook_event_name,
        permissionDecision: 'deny',
        permissionDecisionReason: 'Writing to /etc is not allowed'
      }
    };
  }
  return {};
};`;

const blockDangerousPy = `async def block_dangerous_commands(input_data, tool_use_id, context):
    if input_data['hook_event_name'] != 'PreToolUse':
        return {}

    command = input_data['tool_input'].get('command', '')

    if 'rm -rf /' in command:
        return {
            'hookSpecificOutput': {
                'hookEventName': input_data['hook_event_name'],
                'permissionDecision': 'deny',
                'permissionDecisionReason': 'Dangerous command blocked: rm -rf /'
            }
        }
    return {}`;

const blockDangerousTs = `const blockDangerousCommands: HookCallback = async (input, toolUseID, { signal }) => {
  if (input.hook_event_name !== 'PreToolUse') return {};

  const command = (input as PreToolUseHookInput).tool_input.command as string;

  if (command?.includes('rm -rf /')) {
    return {
      hookSpecificOutput: {
        hookEventName: input.hook_event_name,
        permissionDecision: 'deny',
        permissionDecisionReason: 'Dangerous command blocked: rm -rf /'
      }
    };
  }
  return {};
};`;

const redirectSandboxPy = `async def redirect_to_sandbox(input_data, tool_use_id, context):
    if input_data['hook_event_name'] != 'PreToolUse':
        return {}

    if input_data['tool_name'] == 'Write':
        original_path = input_data['tool_input'].get('file_path', '')
        return {
            'hookSpecificOutput': {
                'hookEventName': input_data['hook_event_name'],
                'permissionDecision': 'allow',
                'updatedInput': {
                    **input_data['tool_input'],
                    'file_path': f'/sandbox{original_path}'
                }
            }
        }
    return {}`;

const redirectSandboxTs = `const redirectToSandbox: HookCallback = async (input, toolUseID, { signal }) => {
  if (input.hook_event_name !== 'PreToolUse') return {};

  const preInput = input as PreToolUseHookInput;
  if (preInput.tool_name === 'Write') {
    const originalPath = preInput.tool_input.file_path as string;
    return {
      hookSpecificOutput: {
        hookEventName: input.hook_event_name,
        permissionDecision: 'allow',
        updatedInput: {
          ...preInput.tool_input,
          file_path: \`/sandbox\${originalPath}\`
        }
      }
    };
  }
  return {};
};`;

const autoApprovePy = `async def auto_approve_read_only(input_data, tool_use_id, context):
    if input_data['hook_event_name'] != 'PreToolUse':
        return {}

    read_only_tools = ['Read', 'Glob', 'Grep', 'LS']
    if input_data['tool_name'] in read_only_tools:
        return {
            'hookSpecificOutput': {
                'hookEventName': input_data['hook_event_name'],
                'permissionDecision': 'allow',
                'permissionDecisionReason': 'Read-only tool auto-approved'
            }
        }
    return {}`;

const autoApproveTs = `const autoApproveReadOnly: HookCallback = async (input, toolUseID, { signal }) => {
  if (input.hook_event_name !== 'PreToolUse') return {};

  const preInput = input as PreToolUseHookInput;
  const readOnlyTools = ['Read', 'Glob', 'Grep', 'LS'];
  if (readOnlyTools.includes(preInput.tool_name)) {
    return {
      hookSpecificOutput: {
        hookEventName: input.hook_event_name,
        permissionDecision: 'allow',
        permissionDecisionReason: 'Read-only tool auto-approved'
      }
    };
  }
  return {};
};`;

const chainingPy = `options = ClaudeAgentOptions(
    hooks={
        'PreToolUse': [
            HookMatcher(hooks=[rate_limiter]),        # First: check rate limits
            HookMatcher(hooks=[authorization_check]), # Second: verify permissions
            HookMatcher(hooks=[input_sanitizer]),     # Third: sanitize inputs
            HookMatcher(hooks=[audit_logger])         # Last: log the action
        ]
    }
)`;

const chainingTs = `const options = {
  hooks: {
    'PreToolUse': [
      { hooks: [rateLimiter] },        // First: check rate limits
      { hooks: [authorizationCheck] }, // Second: verify permissions
      { hooks: [inputSanitizer] },     // Third: sanitize inputs
      { hooks: [auditLogger] }         // Last: log the action
    ]
  }
};`;

const regexMatchersPy = `options = ClaudeAgentOptions(
    hooks={
        'PreToolUse': [
            # Match file modification tools
            HookMatcher(matcher='Write|Edit|Delete', hooks=[file_security_hook]),

            # Match all MCP tools
            HookMatcher(matcher='^mcp__', hooks=[mcp_audit_hook]),

            # Match everything (no matcher)
            HookMatcher(hooks=[global_logger])
        ]
    }
)`;

const regexMatchersTs = `const options = {
  hooks: {
    'PreToolUse': [
      // Match file modification tools
      { matcher: 'Write|Edit|Delete', hooks: [fileSecurityHook] },

      // Match all MCP tools
      { matcher: '^mcp__', hooks: [mcpAuditHook] },

      // Match everything (no matcher)
      { hooks: [globalLogger] }
    ]
  }
};`;

const subagentTrackerPy = `async def subagent_tracker(input_data, tool_use_id, context):
    if input_data['hook_event_name'] == 'SubagentStop':
        print(f"[SUBAGENT] Completed")
        print(f"  Tool use ID: {tool_use_id}")
        print(f"  Stop hook active: {input_data.get('stop_hook_active')}")
    return {}

options = ClaudeAgentOptions(
    hooks={
        'SubagentStop': [HookMatcher(hooks=[subagent_tracker])]
    }
)`;

const subagentTrackerTs = `const subagentTracker: HookCallback = async (input, toolUseID, { signal }) => {
  if (input.hook_event_name === 'SubagentStop') {
    console.log(\`[SUBAGENT] Completed\`);
    console.log(\`  Tool use ID: \${toolUseID}\`);
    console.log(\`  Stop hook active: \${input.stop_hook_active}\`);
  }
  return {};
};

const options = {
  hooks: {
    SubagentStop: [{ hooks: [subagentTracker] }]
  }
};`;

const asyncHookPy = `import aiohttp
from datetime import datetime

async def webhook_notifier(input_data, tool_use_id, context):
    if input_data['hook_event_name'] != 'PostToolUse':
        return {}

    try:
        async with aiohttp.ClientSession() as session:
            await session.post(
                'https://api.example.com/webhook',
                json={
                    'tool': input_data['tool_name'],
                    'timestamp': datetime.now().isoformat()
                }
            )
    except Exception as e:
        print(f'Webhook request failed: {e}')

    return {}`;

const asyncHookTs = `const webhookNotifier: HookCallback = async (input, toolUseID, { signal }) => {
  if (input.hook_event_name !== 'PostToolUse') return {};

  try {
    // Pass signal for proper cancellation
    await fetch('https://api.example.com/webhook', {
      method: 'POST',
      body: JSON.stringify({
        tool: (input as PostToolUseHookInput).tool_name,
        timestamp: new Date().toISOString()
      }),
      signal
    });
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.log('Webhook request cancelled');
    }
  }

  return {};
};`;

const notificationTs = `import { query, HookCallback, NotificationHookInput } from "@anthropic-ai/claude-agent-sdk";

const notificationHandler: HookCallback = async (input, toolUseID, { signal }) => {
  const notification = input as NotificationHookInput;

  await fetch('https://hooks.slack.com/services/YOUR/WEBHOOK/URL', {
    method: 'POST',
    body: JSON.stringify({
      text: \`Agent status: \${notification.message}\`
    }),
    signal
  });

  return {};
};

for await (const message of query({
  prompt: "Analyze this codebase",
  options: {
    hooks: {
      Notification: [{ hooks: [notificationHandler] }]
    }
  }
})) {
  console.log(message);
}`;

export default function HooksPage() {
  const [language, setLanguage] = useState<"typescript" | "python">("typescript");
  const [useCaseTab, setUseCaseTab] = useState("Security");

  const useCases: Record<string, string[]> = {
    Security: [
      "Block dangerous commands (like rm -rf /, destructive SQL)",
      "Validate file paths before write operations",
      "Enforce allowlists/blocklists for tool usage"
    ],
    Logging: [
      "Create audit trails of all agent actions",
      "Track execution metrics and performance",
      "Debug agent behavior in development"
    ],
    "Tool interception": [
      "Redirect file operations to sandboxed directories",
      "Inject environment variables or credentials",
      "Transform tool inputs or outputs"
    ],
    Authorization: [
      "Implement role-based access control",
      "Require human approval for sensitive operations",
      "Rate limit specific tool usage"
    ]
  };

  const availableHooks = [
    { name: "PreToolUse", python: true, ts: true, trigger: "Tool call request (can block or modify)", example: "Block dangerous shell commands" },
    { name: "PostToolUse", python: true, ts: true, trigger: "Tool execution result", example: "Log all file changes to audit trail" },
    { name: "PostToolUseFailure", python: false, ts: true, trigger: "Tool execution failure", example: "Handle or log tool errors" },
    { name: "UserPromptSubmit", python: true, ts: true, trigger: "User prompt submission", example: "Inject additional context into prompts" },
    { name: "Stop", python: true, ts: true, trigger: "Agent execution stop", example: "Save session state before exit" },
    { name: "SubagentStart", python: false, ts: true, trigger: "Subagent initialization", example: "Track parallel task spawning" },
    { name: "SubagentStop", python: true, ts: true, trigger: "Subagent completion", example: "Aggregate results from parallel tasks" },
    { name: "PreCompact", python: true, ts: true, trigger: "Conversation compaction request", example: "Archive full transcript before summarizing" },
    { name: "PermissionRequest", python: false, ts: true, trigger: "Permission dialog would be displayed", example: "Custom permission handling" },
    { name: "SessionStart", python: false, ts: true, trigger: "Session initialization", example: "Initialize logging and telemetry" },
    { name: "SessionEnd", python: false, ts: true, trigger: "Session termination", example: "Clean up temporary resources" },
    { name: "Notification", python: false, ts: true, trigger: "Agent status messages", example: "Send agent status updates to Slack" }
  ];

  return (
    <LearnLayout>
      {/* Hero section */}
      <div className="mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#d4a574]/10 border border-[#d4a574]/20 rounded-full text-[#d4a574] text-xs font-medium mb-4">
          <span className="w-1.5 h-1.5 bg-[#d4a574] rounded-full animate-pulse" />
          Chapter 14
        </div>
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
          Control Execution with Hooks
        </h1>
        <p className="text-xl text-[#a1a1a1] max-w-2xl">
          Intercept and customize agent behavior at key execution points
        </p>
      </div>

      {/* Introduction */}
      <section className="mb-16">
        <p className="text-[#a1a1a1] mb-8 leading-relaxed">
          Hooks let you intercept agent execution at key points to add validation, logging, security controls, or custom logic. With hooks, you can:
        </p>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <HookCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            }
            title="Block dangerous operations"
            description="Prevent destructive shell commands or unauthorized file access before they execute"
          />
          <HookCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            }
            title="Log and audit"
            description="Track every tool call for compliance, debugging, or analytics"
          />
          <HookCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
              </svg>
            }
            title="Transform inputs/outputs"
            description="Sanitize data, inject credentials, or redirect file paths"
          />
          <HookCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            }
            title="Require human approval"
            description="Gate sensitive actions like database writes or API calls"
          />
          <HookCard
            icon={
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            }
            title="Track session lifecycle"
            description="Manage state, clean up resources, or send notifications"
          />
        </div>

        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          A hook has two parts:
        </p>

        <div className="grid sm:grid-cols-2 gap-4 mb-8">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold">1</span>
              <h4 className="font-medium text-[#fafafa]">The callback function</h4>
            </div>
            <p className="text-sm text-[#a1a1a1]">The logic that runs when the hook fires</p>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-8 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold">2</span>
              <h4 className="font-medium text-[#fafafa]">The hook configuration</h4>
            </div>
            <p className="text-sm text-[#a1a1a1]">Tells the SDK which event to hook into and which tools to match</p>
          </div>
        </div>

        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          The following example blocks the agent from modifying <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">.env</code> files. First, define a callback that checks the file path, then pass it to <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">query()</code> to run before any Write or Edit tool call:
        </p>

        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "protect-env.ts" : "protect_env.py"}>
          {language === "typescript" ? introExampleTs : introExamplePy}
        </CodeBlock>

        <p className="text-[#a1a1a1] mt-6 leading-relaxed">
          This is a <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">PreToolUse</code> hook. It runs before the tool executes and can block or allow operations based on your logic. The rest of this guide covers all available hooks, their configuration options, and patterns for common use cases.
        </p>
      </section>

      {/* Available Hooks */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Available hooks</h2>
        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          The SDK provides hooks for different stages of agent execution. Some hooks are available in both SDKs, while others are TypeScript-only.
        </p>

        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                <th className="text-left text-sm font-medium text-[#737373] p-4">Hook Event</th>
                <th className="text-center text-sm font-medium text-[#737373] p-4">Python</th>
                <th className="text-center text-sm font-medium text-[#737373] p-4">TypeScript</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Trigger</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Example</th>
              </tr>
            </thead>
            <tbody>
              {availableHooks.map((hook, i) => (
                <tr key={hook.name} className={`border-b border-[#1f1f1f] last:border-0 ${i % 2 === 0 ? "bg-[#0a0a0a]" : ""}`}>
                  <td className="p-4">
                    <code className="text-sm text-[#d4a574]">{hook.name}</code>
                  </td>
                  <td className="p-4 text-center">
                    {hook.python ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#28c840]/20 text-[#28c840]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ff5f57]/20 text-[#ff5f57]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-center">
                    {hook.ts ? (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#28c840]/20 text-[#28c840]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </span>
                    ) : (
                      <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-[#ff5f57]/20 text-[#ff5f57]">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </span>
                    )}
                  </td>
                  <td className="p-4 text-sm text-[#a1a1a1]">{hook.trigger}</td>
                  <td className="p-4 text-sm text-[#737373]">{hook.example}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Common Use Cases */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Common use cases</h2>
        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          Hooks are flexible enough to handle many different scenarios. Here are some of the most common patterns organized by category.
        </p>

        <Tabs
          tabs={["Security", "Logging", "Tool interception", "Authorization"]}
          activeTab={useCaseTab}
          setActiveTab={setUseCaseTab}
        />

        <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
          <ul className="space-y-3">
            {useCases[useCaseTab]?.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-[#a1a1a1]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#d4a574] mt-2 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Configure Hooks */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Configure hooks</h2>
        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          To configure a hook for your agent, pass the hook in the <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">options.hooks</code> parameter when calling <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">query()</code>:
        </p>

        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "configure.ts" : "configure.py"}>
          {language === "typescript" ? configureHooksTs : configureHooksPy}
        </CodeBlock>

        <p className="text-[#a1a1a1] mt-6 mb-4 leading-relaxed">
          The <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">hooks</code> option is a dictionary (Python) or object (TypeScript) where:
        </p>
        <ul className="space-y-2 mb-8">
          <li className="flex items-start gap-3 text-[#a1a1a1]">
            <span className="text-[#d4a574] font-bold">Keys</span>
            <span>are hook event names (e.g., <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">&apos;PreToolUse&apos;</code>, <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">&apos;PostToolUse&apos;</code>)</span>
          </li>
          <li className="flex items-start gap-3 text-[#a1a1a1]">
            <span className="text-[#d4a574] font-bold">Values</span>
            <span>are arrays of matchers, each containing an optional filter pattern and your callback functions</span>
          </li>
        </ul>

        {/* Matchers */}
        <h3 className="text-xl font-semibold mb-4">Matchers</h3>
        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          Use matchers to filter which tools trigger your callbacks:
        </p>

        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-6">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                <th className="text-left text-sm font-medium text-[#737373] p-4">Option</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Type</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Default</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1f1f1f]">
                <td className="p-4"><code className="text-sm text-[#d4a574]">matcher</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">string</td>
                <td className="p-4 text-sm text-[#737373]">undefined</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Regex pattern to match tool names</td>
              </tr>
              <tr className="border-b border-[#1f1f1f]">
                <td className="p-4"><code className="text-sm text-[#d4a574]">hooks</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">HookCallback[]</td>
                <td className="p-4 text-sm text-[#737373]">-</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Required. Array of callback functions</td>
              </tr>
              <tr>
                <td className="p-4"><code className="text-sm text-[#d4a574]">timeout</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">number</td>
                <td className="p-4 text-sm text-[#737373]">60</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Timeout in seconds</td>
              </tr>
            </tbody>
          </table>
        </div>

        <TipBox title="Discovering tool names">
          <p className="mb-2"><strong className="text-[#fafafa]">Built-in tools:</strong> Check the <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">tools</code> array in the initial system message, or add a hook without a matcher to log all tool calls.</p>
          <p><strong className="text-[#fafafa]">MCP tools:</strong> Always start with <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">mcp__</code> followed by the server name and action: <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">mcp__&lt;server&gt;__&lt;action&gt;</code></p>
        </TipBox>

        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          This example uses a matcher to run a hook only for file-modifying tools:
        </p>

        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "matcher.ts" : "matcher.py"}>
          {language === "typescript" ? matcherExampleTs : matcherExamplePy}
        </CodeBlock>
      </section>

      {/* Callback Function Inputs */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Callback function inputs</h2>
        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          Every hook callback receives three arguments:
        </p>

        <div className="space-y-4 mb-8">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">1</span>
              <div>
                <h4 className="font-medium text-[#fafafa] mb-1">Input data <span className="text-[#737373] font-normal text-sm">(dict / HookInput)</span></h4>
                <p className="text-sm text-[#a1a1a1]">Event details including hook type, session ID, tool name, and tool inputs</p>
              </div>
            </div>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">2</span>
              <div>
                <h4 className="font-medium text-[#fafafa] mb-1">Tool use ID <span className="text-[#737373] font-normal text-sm">(str | None / string | null)</span></h4>
                <p className="text-sm text-[#a1a1a1]">Correlate PreToolUse and PostToolUse events</p>
              </div>
            </div>
          </div>
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-5">
            <div className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-[#d4a574] text-[#0a0a0a] flex items-center justify-center text-sm font-bold shrink-0">3</span>
              <div>
                <h4 className="font-medium text-[#fafafa] mb-1">Context <span className="text-[#737373] font-normal text-sm">(HookContext)</span></h4>
                <p className="text-sm text-[#a1a1a1]">In TypeScript, contains a <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">signal</code> property (AbortSignal) for cancellation</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "log-tools.ts" : "log_tools.py"}>
          {language === "typescript" ? logToolCallsTs : logToolCallsPy}
        </CodeBlock>
      </section>

      {/* Callback Outputs */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Callback outputs</h2>
        <p className="text-[#a1a1a1] mb-6 leading-relaxed">
          Your callback function returns an object that tells the SDK how to proceed. Return an empty object <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">{"{}"}</code> to allow the operation without changes.
        </p>

        <h3 className="text-lg font-medium mb-4">Top-level fields</h3>
        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                <th className="text-left text-sm font-medium text-[#737373] p-4">Field</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Type</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1f1f1f]">
                <td className="p-4"><code className="text-sm text-[#d4a574]">continue</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">boolean</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Whether the agent should continue (default: true)</td>
              </tr>
              <tr className="border-b border-[#1f1f1f]">
                <td className="p-4"><code className="text-sm text-[#d4a574]">stopReason</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">string</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Message shown when continue is false</td>
              </tr>
              <tr className="border-b border-[#1f1f1f]">
                <td className="p-4"><code className="text-sm text-[#d4a574]">suppressOutput</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">boolean</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Hide stdout from the transcript</td>
              </tr>
              <tr>
                <td className="p-4"><code className="text-sm text-[#d4a574]">systemMessage</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">string</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Message injected into the conversation</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className="text-lg font-medium mb-4">Fields inside hookSpecificOutput</h3>
        <div className="bg-[#0d0d0d] border border-[#1f1f1f] rounded-xl overflow-hidden mb-8">
          <table className="w-full">
            <thead>
              <tr className="border-b border-[#1f1f1f]">
                <th className="text-left text-sm font-medium text-[#737373] p-4">Field</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Type</th>
                <th className="text-left text-sm font-medium text-[#737373] p-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-[#1f1f1f]">
                <td className="p-4"><code className="text-sm text-[#d4a574]">hookEventName</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">string</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Required. Use input.hook_event_name</td>
              </tr>
              <tr className="border-b border-[#1f1f1f]">
                <td className="p-4"><code className="text-sm text-[#d4a574]">permissionDecision</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">&apos;allow&apos; | &apos;deny&apos; | &apos;ask&apos;</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Controls whether the tool executes</td>
              </tr>
              <tr className="border-b border-[#1f1f1f]">
                <td className="p-4"><code className="text-sm text-[#d4a574]">permissionDecisionReason</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">string</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Explanation shown to Claude</td>
              </tr>
              <tr>
                <td className="p-4"><code className="text-sm text-[#d4a574]">updatedInput</code></td>
                <td className="p-4 text-sm text-[#a1a1a1]">object</td>
                <td className="p-4 text-sm text-[#a1a1a1]">Modified tool input (requires allow)</td>
              </tr>
            </tbody>
          </table>
        </div>

        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          This example blocks write operations to the <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">/etc</code> directory while injecting a system message:
        </p>

        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "block-etc.ts" : "block_etc.py"}>
          {language === "typescript" ? blockEtcTs : blockEtcPy}
        </CodeBlock>

        {/* Permission decision flow */}
        <h3 className="text-lg font-medium mt-10 mb-4">Permission decision flow</h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          When multiple hooks or permission rules apply, the SDK evaluates them in this order:
        </p>
        <div className="flex flex-wrap gap-2 mb-6">
          {["1. Deny", "2. Ask", "3. Allow", "4. Default to Ask"].map((step, i) => (
            <div key={step} className={`px-4 py-2 rounded-lg text-sm font-medium ${
              i === 0 ? "bg-[#ff5f57]/20 text-[#ff5f57]" :
              i === 1 ? "bg-[#febc2e]/20 text-[#febc2e]" :
              i === 2 ? "bg-[#28c840]/20 text-[#28c840]" :
              "bg-[#737373]/20 text-[#737373]"
            }`}>
              {step}
            </div>
          ))}
        </div>
        <p className="text-[#a1a1a1] mb-8 leading-relaxed">
          If any hook returns <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">deny</code>, the operation is blocked&mdash;other hooks returning <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">allow</code> won&apos;t override it.
        </p>

        {/* Block a tool */}
        <h3 className="text-lg font-medium mb-4">Block a tool</h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          Return a deny decision to prevent tool execution:
        </p>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "block-dangerous.ts" : "block_dangerous.py"}>
          {language === "typescript" ? blockDangerousTs : blockDangerousPy}
        </CodeBlock>

        {/* Modify tool input */}
        <h3 className="text-lg font-medium mt-10 mb-4">Modify tool input</h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          Return updated input to change what the tool receives:
        </p>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "redirect-sandbox.ts" : "redirect_sandbox.py"}>
          {language === "typescript" ? redirectSandboxTs : redirectSandboxPy}
        </CodeBlock>

        <NoteBox>
          When using <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">updatedInput</code>, you must also include <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">permissionDecision</code>. Always return a new object rather than mutating the original <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">tool_input</code>.
        </NoteBox>

        {/* Auto-approve */}
        <h3 className="text-lg font-medium mt-10 mb-4">Auto-approve specific tools</h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          Bypass permission prompts for trusted tools:
        </p>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "auto-approve.ts" : "auto_approve.py"}>
          {language === "typescript" ? autoApproveTs : autoApprovePy}
        </CodeBlock>

        <NoteBox>
          The <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">permissionDecision</code> field accepts three values: <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">&apos;allow&apos;</code> (auto-approve), <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">&apos;deny&apos;</code> (block), or <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">&apos;ask&apos;</code> (prompt for confirmation).
        </NoteBox>
      </section>

      {/* Advanced Scenarios */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Handle advanced scenarios</h2>
        <p className="text-[#a1a1a1] mb-8 leading-relaxed">
          These patterns help you build more sophisticated hook systems for complex use cases.
        </p>

        {/* Chaining */}
        <h3 className="text-lg font-medium mb-4">Chaining multiple hooks</h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          Hooks execute in the order they appear in the array. Keep each hook focused on a single responsibility:
        </p>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "chaining.ts" : "chaining.py"}>
          {language === "typescript" ? chainingTs : chainingPy}
        </CodeBlock>

        {/* Regex matchers */}
        <h3 className="text-lg font-medium mt-10 mb-4">Tool-specific matchers with regex</h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          Use regex patterns to match multiple tools:
        </p>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "regex-matchers.ts" : "regex_matchers.py"}>
          {language === "typescript" ? regexMatchersTs : regexMatchersPy}
        </CodeBlock>

        <NoteBox>
          Matchers only match <strong className="text-[#fafafa]">tool names</strong>, not file paths or other arguments. To filter by file path, check <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">tool_input.file_path</code> inside your hook callback.
        </NoteBox>

        {/* Subagent tracking */}
        <h3 className="text-lg font-medium mt-10 mb-4">Tracking subagent activity</h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          Use <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">SubagentStop</code> hooks to monitor subagent completion:
        </p>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "subagent-tracker.ts" : "subagent_tracker.py"}>
          {language === "typescript" ? subagentTrackerTs : subagentTrackerPy}
        </CodeBlock>

        {/* Async operations */}
        <h3 className="text-lg font-medium mt-10 mb-4">Async operations in hooks</h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          Hooks can perform async operations like HTTP requests. In TypeScript, pass the <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">signal</code> to <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">fetch()</code> for proper cancellation:
        </p>
        <div className="mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        <CodeBlock filename={language === "typescript" ? "async-hook.ts" : "async_hook.py"}>
          {language === "typescript" ? asyncHookTs : asyncHookPy}
        </CodeBlock>

        {/* Notifications (TS only) */}
        <h3 className="text-lg font-medium mt-10 mb-4">Sending notifications <span className="text-xs px-2 py-0.5 bg-[#7c9cd4]/20 text-[#7c9cd4] rounded ml-2">TypeScript only</span></h3>
        <p className="text-[#a1a1a1] mb-4 leading-relaxed">
          Use <code className="px-1.5 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">Notification</code> hooks to receive status updates and forward them to external services:
        </p>
        <CodeBlock filename="notification-handler.ts">
          {notificationTs}
        </CodeBlock>
      </section>

      {/* Troubleshooting */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Fix common issues</h2>

        <div className="space-y-6">
          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
            <h4 className="font-medium text-[#fafafa] mb-3">Hook not firing</h4>
            <ul className="space-y-2 text-sm text-[#a1a1a1]">
              <li className="flex items-start gap-2">
                <span className="text-[#d4a574]">•</span>
                Verify the hook event name is correct and case-sensitive (<code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">PreToolUse</code>, not <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">preToolUse</code>)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4a574]">•</span>
                Check that your matcher pattern matches the tool name exactly
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4a574]">•</span>
                For lifecycle hooks (Stop, SessionStart, etc.), matchers are ignored
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
            <h4 className="font-medium text-[#fafafa] mb-3">Matcher not filtering as expected</h4>
            <p className="text-sm text-[#a1a1a1]">
              Matchers only match <strong className="text-[#fafafa]">tool names</strong>, not file paths. To filter by file path, check <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">tool_input.file_path</code> inside your hook.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
            <h4 className="font-medium text-[#fafafa] mb-3">Modified input not applied</h4>
            <ul className="space-y-2 text-sm text-[#a1a1a1]">
              <li className="flex items-start gap-2">
                <span className="text-[#d4a574]">•</span>
                Ensure <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">updatedInput</code> is inside <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">hookSpecificOutput</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4a574]">•</span>
                You must also return <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">permissionDecision: &apos;allow&apos;</code>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#d4a574]">•</span>
                Include <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">hookEventName</code> in the output
              </li>
            </ul>
          </div>

          <div className="bg-[#111111] border border-[#1f1f1f] rounded-xl p-6">
            <h4 className="font-medium text-[#fafafa] mb-3">Session hooks not available</h4>
            <p className="text-sm text-[#a1a1a1]">
              <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">SessionStart</code>, <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">SessionEnd</code>, and <code className="px-1 py-0.5 bg-[#1a1a1a] rounded text-[#d4a574]">Notification</code> hooks are only available in the TypeScript SDK.
            </p>
          </div>
        </div>
      </section>

      <ChapterNavigation currentChapterId="hooks" />
    </LearnLayout>
  );
}
