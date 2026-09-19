import path from "node:path";
import content from "./runtime-content.json";

const files: Record<string, string> = content;
function key(file: string) {
  const relative = path.relative(process.cwd(), file).split(path.sep).join("/");
  if (relative in files || Object.keys(files).some(name => name.startsWith(`${relative}/`))) return relative;
  const normalized = file.split(path.sep).join("/");
  return Object.keys(files).find(name => normalized.endsWith(`/${name}`)) || relative;
}

// A build-time content snapshot avoids runtime disk dependencies on Workers.
export default {
  existsSync(file: string) {
    const relative = key(file);
    return relative in files || Object.keys(files).some(name => name.startsWith(`${relative}/`));
  },
  readFileSync(file: string, encoding: "utf8") {
    const relative = key(file);
    if (!(relative in files)) throw new Error(`Missing packaged content: ${relative}`);
    return files[relative];
  },
  readdirSync(directory: string) {
    const prefix = `${key(directory)}/`;
    return [...new Set(Object.keys(files).filter(name => name.startsWith(prefix)).map(name => name.slice(prefix.length).split("/")[0]))];
  }
};
