import { type BuildContext } from "./types";

export interface BuildStep {
  name: string;
  run(ctx: BuildContext): Promise<void>;
}

export async function runPipeline(
  ctx: BuildContext,
  steps: BuildStep[]
) {
  for (const step of steps) {
    const start = performance.now();

    try {
      await step.run(ctx);
    } catch (err: any) {
      console.error(`\n[${step.name}] failed:\n`, err);
      process.exit(1);
    }

    const duration = performance.now() - start;
    console.log(
      `${Bun.color("purple", "ansi")}[${step.name}]\x1b[0m completed in ${duration.toFixed(2)}ms`
    );
  }
}