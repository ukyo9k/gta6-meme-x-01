// Entry program for the make.fun bounty gta6-meme-x-01 ("Post a GTA 6 meme on X").
//
// All this program does is hand the post's address to the grader: it reads
// POST.json from the repository root and writes the same bytes to the output
// directory, as out/POST.json. The house then reads the post itself from X
// and builds the dossier the judge sees, so nothing written here is judged.
//
// It runs on Node 22 as:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, resolve } from "node:path";

const REPO_ROOT = resolve(process.env.MAKEFUN_BOT_DIR ?? ".");
const OUT_DIR = resolve(process.env.MAKEFUN_OUTPUT_DIR ?? "out");

async function main(): Promise<void> {
  const sourcePath = join(REPO_ROOT, "POST.json");
  const raw = await readFile(sourcePath, "utf8");

  // Refuse to hand on a file that is not the shape the gate expects:
  // a JSON object with a single url string naming the X post.
  const parsed: unknown = JSON.parse(raw);
  if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
    throw new Error("POST.json must be a JSON object");
  }
  const url = (parsed as Record<string, unknown>).url;
  // The post address must be the full status URL shape, not just any
  // x.com link: https://x.com/<handle>/status/<digits>.
  if (
    typeof url !== "string" ||
    !/^https:\/\/x\.com\/[A-Za-z0-9_]+\/status\/[0-9]+$/.test(url)
  ) {
    throw new Error(
      "POST.json url must look like https://x.com/<handle>/status/<digits>",
    );
  }

  await mkdir(OUT_DIR, { recursive: true });
  const targetPath = join(OUT_DIR, "POST.json");
  await writeFile(targetPath, raw, "utf8");

  // Confirm the copy landed byte-identical before reporting success, so a
  // partial or truncated write can never be mistaken for a valid output.
  const written = await readFile(targetPath, "utf8");
  if (written !== raw) {
    throw new Error("output POST.json does not match the source bytes");
  }
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exit(1);
});
