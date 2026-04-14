import { type BuildStep } from "../core/pipeline";

import { discoverEntrypoints } from "../steps/discoverEntrypoints";
import { validateExports } from "../steps/validateExports";
import { clean } from "../steps/clean";
import { buildStep } from "../steps/build";
import { analyze } from "../steps/analyze";
import { validateStructure } from "../steps/validateStructure";
import { generateTypes } from "../steps/generateTypes";
import { validateExportsExist } from "../steps/validateExportsExist";

export const defaultPipeline: BuildStep[] = [
  discoverEntrypoints,
  validateExports,
  clean,
  buildStep,
  analyze,
  validateStructure,
  generateTypes,
  validateExportsExist
];