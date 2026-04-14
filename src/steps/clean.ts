import fs from "node:fs/promises";
import { type BuildStep } from "../core/pipeline";
import { printC } from "../core/utils";

export const clean: BuildStep = {
  name: "clean",

  async run() {
    printC("orange", "Cleaning build folder...");
    await fs.rm("build", { recursive: true, force: true });
  }
};