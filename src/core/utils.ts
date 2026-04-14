import path from "node:path";

export function normalize(p: string): string {
  return p.split(path.sep).join("/");
}

export function isNodeModule(p: string): boolean {
  return normalize(p).includes("node_modules");
}

export function hasUppercase(str: string): boolean {
  return str !== str.toLowerCase();
}

export function printC(
  col: string,
  data: string,
  lvl: "log" | "warn" | "error" = "log"
) {
  const c = Bun.color(col.toLowerCase(), "ansi") ?? "";
  const r = "\x1b[0m";
  console[lvl](`${c}${data}${r}`);
}