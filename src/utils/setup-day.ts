import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [dayArg] = process.argv.slice(2);

if (!dayArg || !/^\d+$/.test(dayArg)) {
	console.error("Usage: bun run src/setup-day.ts <day-number>");
	process.exit(1);
}

const day = dayArg.padStart(2, "0");
const dayDir = join("src", `day-${day}`);
const dayFile = join(dayDir, `day-${day}.ts`);
const testFile = join(dayDir, `day-${day}.test.ts`);
const inputFile = join(dayDir, `day-${day}.txt`);

if (existsSync(dayDir)) {
	console.error(`Day ${day} directory already exists.`);
	process.exit(1);
}

mkdirSync(dayDir);

writeFileSync(
	dayFile,
	`import { loadInput, parseLines } from "../utils";

const textFileUrl = new URL(import.meta.url.replace(".ts", ".txt"));

// Load input
const input = loadInput(textFileUrl);
const lines = parseLines(input);

export function solvePart1(data: string[]): number {
  return 0; // Implement Part 1 logic
}

export function solvePart2(data: string[]): number {
  return 0; // Implement Part 2 logic
}

if (import.meta.main) {
  solvePart1(lines);
  solvePart2(lines);
}
`,
);

writeFileSync(
	testFile,
	`import { expect, test } from "bun:test";
import { solvePart1, solvePart2 } from "./day-${day}";

test("Day ${day} - Part 1 Example Input", () => {
  const exampleInput = ["example", "data"];
  expect(solvePart1(exampleInput)).toBe(0); // Replace with expected value
});

test("Day ${day} - Part 2 Example Input", () => {
  const exampleInput = ["example", "data"];
  expect(solvePart2(exampleInput)).toBe(0); // Replace with expected value
});
`,
);

writeFileSync(inputFile, "");

console.log(`Day ${day} files created successfully in ${dayDir}.`);
