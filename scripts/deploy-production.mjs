import { execFileSync } from "node:child_process";

function run(command, args, options = {}) {
  return execFileSync(command, args, { encoding: "utf8", stdio: options.stdio || "pipe" }).trim();
}

const branch = run("git", ["branch", "--show-current"]);
if (branch !== "main") {
  console.error(`Production deployment is only allowed from main, not ${branch || "a detached commit"}.`);
  process.exit(1);
}

const changes = run("git", ["status", "--porcelain"]);
if (changes) {
  console.error("Production deployment stopped: local work has not been committed.");
  console.error("Commit and push the approved website state first so Vercel and GitHub cannot diverge.");
  process.exit(1);
}

const local = run("git", ["rev-parse", "HEAD"]);
const remote = run("git", ["rev-parse", "origin/main"]);
if (local !== remote) {
  console.error("Production deployment stopped: local main and origin/main are different.");
  process.exit(1);
}

execFileSync("npx", ["vercel", "--prod", "--yes"], { stdio: "inherit" });
execFileSync("node", ["scripts/verify-production.mjs"], {
  stdio: "inherit",
  env: { ...process.env, EXPECTED_COMMIT_SHA: local }
});
