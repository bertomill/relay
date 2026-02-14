import { Template } from 'e2b'

export const template = Template()
  .fromNodeImage('22')
  // Initialize npm project and install dependencies in /home/user
  .runCmd('cd /home/user && npm init -y && npm install @anthropic-ai/claude-agent-sdk @fal-ai/client tsx')
  // Install Claude Code CLI globally (subprocess the SDK spawns)
  .runCmd('npm install -g @anthropic-ai/claude-code', { user: 'root' })
