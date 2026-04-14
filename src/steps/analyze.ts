import { type BuildStep } from "../core/pipeline";
import { bytes, commify } from "ts-humanize";

export const analyze: BuildStep = {
  name: "analyze",

  async run(ctx) {
    if (!ctx.metafile) return;

    let totalIn = 0;
    let totalOut = 0;

    for (const i of Object.values(ctx.metafile.inputs)) {
      totalIn += i.bytes;
    }

    for (const o of Object.values(ctx.metafile.outputs)) {
      totalOut += o.bytes;
    }

    console.table({
      "Total Bytes in": bytes(totalIn),
      "Total Bytes out": bytes(totalOut),
      "Files": commify(Object.keys(ctx.metafile.inputs).length)
    });
  }
};