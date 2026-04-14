import path from "node:path";
import { type BuildStep } from "../core/pipeline";
import { printC } from "../core/utils";

export const discoverEntrypoints: BuildStep = {
  name: "discover-entrypoints",

  async run(ctx) {
    const glob = new Bun.Glob("**/index.ts");
    const files: string[] = [];

    for await (const file of glob.scan(ctx.root + "/src")) {
      files.push(path.join(ctx.root, "src", file));
    }

    ctx.entrypoints = files;

    printC("cyan", "Detected entrypoints:");
    files.forEach(f => console.log("  ", f));
  }
};