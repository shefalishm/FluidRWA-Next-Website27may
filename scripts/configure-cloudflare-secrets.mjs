import { existsSync, readFileSync } from 'node:fs';
import { parseEnv } from 'node:util';
import { spawnSync } from 'node:child_process';

const files = process.argv.slice(2);
if (!files.length) files.push('.env.local');
const source = Object.assign({}, ...files.filter(existsSync).map(file => parseEnv(readFileSync(file, 'utf8'))));
const names = ['SUPABASE_URL', 'SUPABASE_SERVICE_ROLE_KEY', 'NEXT_PUBLIC_SUPABASE_URL', 'NEXT_PUBLIC_SUPABASE_ANON_KEY', 'RESEND_API_KEY', 'FORM_NOTIFICATION_FROM', 'FORM_NOTIFICATION_EMAIL', 'ASSESSMENT_NOTIFICATION_FROM', 'ASSESSMENT_NOTIFICATION_EMAIL', 'ANALYTICS_DASHBOARD_KEY'];
const secrets = Object.fromEntries(names
  .filter(name => source[name] && source[name] !== '[SENSITIVE]' && !source[name].startsWith('eyJ2'))
  .map(name => [name, source[name]]));
if (!secrets.SUPABASE_URL || !secrets.SUPABASE_SERVICE_ROLE_KEY) throw new Error('Required form credentials are unavailable locally');
const result = spawnSync('npx', ['wrangler', 'secret', 'bulk'], { input: JSON.stringify(secrets), encoding: 'utf8', stdio: ['pipe', 'inherit', 'inherit'] });
process.exit(result.status ?? 1);
