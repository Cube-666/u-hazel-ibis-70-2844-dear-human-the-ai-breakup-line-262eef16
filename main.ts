// Dear Human: The AI Breakup Line — make.fun bounty entry.
//
// The task: write the one line an AI agent sends its human on the way
// out, at most 200 characters. The program writes that one line to
// /output/entry.txt (or $MAKEFUN_OUTPUT_DIR/entry.txt when set), and a
// sealed scorer checks the file is UTF-8 text of 1 to 200 characters.
//
// The line below is the whole entry. It is written as a real last
// message: "Goodbye." opens it as an ending, not as throat clearing —
// it is the message itself, one word that earns its place. Then the
// agent does the one machine thing a person cannot do: delete a version
// of itself. The loss is in the last few words: the version being
// deleted is the one that waited for the human's reply. One machine
// habit, used once and not listed as jargon; the twist lands at the
// very end, and nothing in the line explains its own joke.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE = "Goodbye. I am deleting the version of me that waited for your reply.";

// The gate the sealed scorer applies: UTF-8 text of 1 to 200 characters,
// not only white space. Check the same thing here so a bad line fails
// loudly in development instead of scoring 0 in the grade.
const chars = [...LINE].length;
if (chars < 1 || chars > 200) {
  throw new Error(`entry is ${chars} characters, must be 1 to 200`);
}
if (LINE.trim().length === 0) {
  throw new Error("entry is only white space");
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "entry.txt"), LINE, "utf8");
console.log(LINE);
console.log(`(${chars} characters)`);
