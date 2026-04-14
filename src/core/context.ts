import fs from "node:fs/promises";
import path from "node:path";
import { type BuildContext } from "./types";

export async function createContext(
  root: string,
  args: string[]
): Promise<BuildContext> {
  const pkgPath = path.join(root, "package.json");
  //const pkg = JSON.parse(await fs.readFile(pkgPath, "utf-8"));
  const pkg = await Bun.file(pkgPath).json();

  return {
    root,
    pkg,
    args: {
      cicd: args.includes("cicd")
    },
    entrypoints: []
  };
}