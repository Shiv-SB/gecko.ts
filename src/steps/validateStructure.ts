import fs from "node:fs";
import { type BuildStep } from "../core/pipeline";

export const validateStructure: BuildStep = {
  name: "validate-structure",

  async run(ctx) {
    const outputs = ctx.metafile!.outputs;

    const entryOutputs = Object.entries(outputs)
      .filter(([_, o]) => o.entryPoint)
      .map(([p]) => p)
      .filter((name) => name.endsWith("index.js"))
      .sort();

    const indexGlob = new Bun.Glob("**/index.js");
    const actual: string[] = [];

    for (const f of indexGlob.scanSync("./build")) {
      actual.push(f);
    }

    actual.sort();

    if (!Bun.deepMatch(entryOutputs, actual)) {
      console.log("actual:", actual);
      console.log("outputs:", entryOutputs);
      throw new Error("Mismatch between metafile and actual outputs");
    }

    if (fs.existsSync("./build/src")) {
      throw new Error("Unexpected src folder in build");
    }
  }
};