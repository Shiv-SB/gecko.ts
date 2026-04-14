import path from "node:path";
import { type BuildStep } from "../core/pipeline";
import { hasUppercase } from "../core/utils";

function getPkgExports(pkg: any): string[] {
  return Object.keys(pkg.exports).map(k =>
    k.substring(2).toLowerCase()
  );
}

export const validateExports: BuildStep = {
  name: "validate-exports",

  async run(ctx) {
    const exports = new Set(getPkgExports(ctx.pkg));

    const entrypoints = new Set(
      ctx.entrypoints.map(f =>
        path.basename(path.dirname(f)).toLowerCase()
      )
    );

    if (exports.size !== entrypoints.size) {
      const diff = entrypoints.difference(exports);
      throw new Error(
        `Mismatch exports vs entrypoints:\n${[...diff].join("\n")}`
      );
    }

    for (const key of Object.keys(ctx.pkg.exports)) {
      const exp = ctx.pkg.exports[key];
      if (hasUppercase(exp.import) || hasUppercase(exp.types)) {
        throw new Error(`Uppercase path in export: ${key}`);
      }
    }
  }
};