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
const exampleInputFile = join(dayDir, `day-${day}.example.txt`);

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
  // Implement Part 1 logic
  const result = 0;
  console.log("Result:", result);
  return result; 
}

export function solvePart2(data: string[]): number {
  // Implement Part 2 logic
  const result = 0;
  console.log("Result:", result);
  return result; 
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

const textFileUrl = new URL(
	import.meta.url.replace(".test.ts", "-example.txt"),
);


test("Day ${day} - Part 1 Example Input", () => {
	const input = loadInput(textFileUrl);
  expect(solvePart1(input)).toBe(0); // Replace with expected value
});

test("Day ${day} - Part 2 Example Input", () => {
	const input = loadInput(textFileUrl);
  expect(solvePart2(input)).toBe(0); // Replace with expected value
});
`,
);

writeFileSync(inputFile, "");
writeFileSync(exampleInputFile, "");

console.log(`Day ${day} files created successfully in ${dayDir}.`);
