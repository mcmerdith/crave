import { z } from "zod";
import { firestore } from "./firebase";

function safePath(seg: string) {
  return seg.replace(/[/\\:*?"<>|#%]/g, "_");
}

function cacheDocRef(prefix: string, identifier: string) {
  return firestore.doc(
    `cache/${safePath(prefix)}/data/${safePath(identifier)}`,
  );
}

async function updateStats(result: "hit" | "miss" | "expired") {
  await firestore.runTransaction(async (tx) => {
    const ref = firestore.doc("cache/__statistics");
    let count = 1;
    const res = await tx.get(ref);
    if (res.exists) {
      const data = res.data();

      if (data && result in data && typeof data[result] === "number")
        count = data[result] + 1;
    }
    tx.set(ref, { [result]: count }, { merge: true });
  });
}

export async function readCache<Parser extends z.ZodType>(
  prefix: string,
  identifier: string,
  parser: Parser,
): Promise<z.output<Parser> | null> {
  const ref = cacheDocRef(prefix, identifier);
  const snapshot = await ref.get();
  if (!snapshot.exists) {
    await updateStats("miss");
    return null;
  }
  console.log(`[Cache] Reading cache for ${prefix}/${identifier}`);
  if (snapshot.createTime) {
    const now = Date.now() / 1000 / 60 / 60 / 24;
    const created = snapshot.createTime.toMillis() / 1000 / 60 / 60 / 24;
    const age = Math.round(now - created);
    if (age > 30) {
      // cache expiry at 30 days
      console.log(
        `[Cache] Cache expired for ${prefix}/${identifier} (created ${age} days ago)`,
      );
      await updateStats("expired");
      return null;
    } else {
      console.log(
        `[Cache] Cache hit for ${prefix}/${identifier} (created ${age} days ago)`,
      );
      await updateStats("hit");
    }
  }
  const data = snapshot.data();
  if (!data) return null;
  return data.__firestore_undefined_flag
    ? // @ts-expect-error `undefined` is technically not valid, but if it's in the cache we have to trust it`
      undefined
    : parser.parse(data.result);
}

export async function writeCache(
  prefix: string,
  identifier: string,
  data: unknown,
) {
  console.log(`[Cache] Writing cache for ${prefix}/${identifier}`);
  const ref = cacheDocRef(prefix, identifier);
  ref.set({
    __firestore_undefined_flag: data == undefined,
    result: data == undefined ? null : data,
  });
}
