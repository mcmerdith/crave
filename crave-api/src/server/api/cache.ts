import { env } from "@/env";
import { z } from "zod";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "path";

function isInsignificantError(error: unknown): boolean {
  return (
    !error ||
    typeof error !== "object" ||
    !("code" in error) ||
    error.code === "ENOENT" ||
    error.code === "EEXIST"
  );
}

export async function readCache<Parser extends z.ZodType>(
  prefix: string,
  identifier: string,
  parser: Parser,
): Promise<z.output<Parser> | null> {
  // if (env.NODE_ENV !== "development") return null;
  try {
    const filename = `${prefix}-${identifier}.json`.replace(
      /[/\\:*?"<>|#%]/g,
      "_",
    );
    const data = await readFile(path.join("cache", filename), {
      encoding: "utf-8",
    });
    console.debug(`[Places-API] Using cache file ${filename}`);
    return parser.parse(JSON.parse(data));
  } catch (error) {
    if (!isInsignificantError(error)) throw error;
  }
  return null;
}

export async function writeCache(
  prefix: string,
  identifier: string,
  data: unknown,
) {
  if (env.NODE_ENV !== "development") return;
  try {
    await mkdir("cache");
  } catch (error) {
    if (!isInsignificantError(error)) throw error;
  }
  try {
    const filename = `${prefix}-${identifier}.json`.replace(
      /[/\\:*?"<>|#%]/g,
      "_",
    );
    console.debug(`[Places-API] Writing cache file ${filename}`);
    await writeFile(path.join("cache", filename), JSON.stringify(data), {
      encoding: "utf-8",
    });
  } catch (error) {
    console.error("Writing to cache file failed!");
    if (!isInsignificantError(error)) throw error;
  }
}
