import fs from "node:fs";
import path from "node:path";

export const dynamic = "force-static";

export function GET() {
  const filePath = path.join(process.cwd(), "llms.txt");
  const body = fs.existsSync(filePath)
    ? fs.readFileSync(filePath, "utf8")
    : "# FluidRWA\n\nFluidRWA helps teams discover trusted Web3, RWA and digital asset infrastructure vendors.\n";

  return new Response(body, {
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400"
    }
  });
}
