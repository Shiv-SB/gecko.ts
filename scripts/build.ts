import { rm } from "node:fs/promises";

await rm("dist", { recursive: true, force: true });

const result = await Bun.build({
  entrypoints: ["./src/cli.ts"],
  outdir: "./dist",
  target: "bun",
  splitting: false,
  sourcemap: "none",
  minify: true
});

if (!result.success) {
  console.error("Build failed");
  process.exit(1);
}

console.log("Build tool compiled successfully");