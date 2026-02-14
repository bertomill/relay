import * as fs from 'fs'
import * as path from 'path'
import { config } from 'dotenv'

// Load .env.local so E2B_API_KEY is available
config({ path: path.resolve(__dirname, '..', '..', '..', '.env.local') })

import { Template, defaultBuildLogger } from 'e2b'
import { template } from './template'

async function main() {
  // Read runner and helper scripts
  const parentDir = path.resolve(__dirname, '..')
  const runnerContent = fs.readFileSync(path.join(parentDir, 'agent-runner.mjs'), 'utf-8')
  const generateImageContent = fs.readFileSync(path.join(parentDir, 'generate-image.ts'), 'utf-8')

  // Write files into the template using runCmd + heredoc
  const fullTemplate = template
    .runCmd('mkdir -p /home/user/scripts/content-creator')
    .runCmd(`cat > /home/user/runner.mjs << 'ENDOFFILE'\n${runnerContent}\nENDOFFILE`)
    .runCmd(`cat > /home/user/scripts/content-creator/generate-image.ts << 'ENDOFFILE'\n${generateImageContent}\nENDOFFILE`)

  const result = await Template.build(fullTemplate, 'lighten-agent', {
    onBuildLogs: defaultBuildLogger(),
  });

  console.log('\nTemplate built successfully!')
  console.log('Template ID:', result.templateId)
  console.log('\nSet E2B_TEMPLATE_ID=' + result.templateId + ' in .env.local')
}

main().catch(console.error);
