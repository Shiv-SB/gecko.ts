import type PKG from "../../package.json";

export interface BuildArgs {
  cicd?: boolean;
}

export interface BuildContext {
  root: string;
  args: BuildArgs;

  entrypoints: string[];
  pkg: any;

  metafile?: Bun.BuildOutput["metafile"];
}