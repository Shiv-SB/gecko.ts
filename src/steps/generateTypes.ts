import { type BuildStep } from "../core/pipeline";
import { printC } from "../core/utils";

function getConfigFile(root: string) {
  const glob = new Bun.Glob("tsconfig.*");
  let targetFile = "tsconfig.json";
  for (const file of glob.scanSync(process.cwd())) {
    if (file === "tsconfig.build.json") {
      targetFile = file;
      printC("orange", "Automatically detected 'tsconfig.build.json' file...");
    };
  }
  return targetFile;
}

export const generateTypes: BuildStep = {
  name: "generate-types",

  async run(ctx) {
    const proc = Bun.spawnSync(
      ["bunx", "tsc", "--p", getConfigFile(ctx.root)],
      { stdout: "inherit", stderr: "inherit" }
    );

    if (!proc.success) {
      throw new Error("Type generation failed");
    }
  }
};