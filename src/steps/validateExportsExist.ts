import fs from "node:fs";
import { type BuildStep } from "../core/pipeline";

export const validateExportsExist: BuildStep = {
  name: "validate-export-files",

  async run(ctx) {
    for (const key of Object.keys(ctx.pkg.exports)) {
      const exp = ctx.pkg.exports[key];

      if (!fs.existsSync(exp.import)) {
        throw new Error(`Missing import file: ${exp.import}`);
      }

      if (!fs.existsSync(exp.types)) {
        throw new Error(`Missing types file: ${exp.types}`);
      }
    }
  }
};