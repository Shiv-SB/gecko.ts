#!/usr/bin/env bun

import { createContext } from "./core/context";
import { runPipeline } from "./core/pipeline";
import { defaultPipeline } from "./pipeline/default";

const ctx = await createContext(
  process.cwd(),
  process.argv.slice(2)
);

await runPipeline(ctx, defaultPipeline);