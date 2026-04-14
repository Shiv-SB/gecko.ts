import { type BuildStep } from "../core/pipeline";

export const buildStep: BuildStep = {
  name: "bun-build",

  async run(ctx) {
    const result = await Bun.build({
      root: ctx.root + "/src",
      entrypoints: ctx.entrypoints,
      outdir: "build",
      splitting: true,
      format: "esm",
      target: "bun",
      metafile: true
    });

    if (!result.success) {
      throw new Error("Build failed");
    }

    ctx.metafile = result.metafile;
  }
};