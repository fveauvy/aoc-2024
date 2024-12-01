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
const dataLoaderFile = join(dayDir, `data-loader.ts`);
const executeFile = join(dayDir, `execute-day-${day}.ts`);

if (existsSync(dayDir)) {
	console.error(`Day ${day} directory already exists.`);
	process.exit(1);
}

mkdirSync(dayDir);

writeFileSync(
	dayFile,
	`import { loadData } from "./data-loader";

const textFileUrl = new URL(import.meta.url.replace(".ts", ".txt"));

// Load input
const input = loadData(textFileUrl);

export function solvePart1(data: string[]): number {
  return 0; // Implement Part 1 logic
}

export function solvePart2(data: string[]): number {
  return 0; // Implement Part 2 logic
}

if (import.meta.main) {
  solvePart1(input);
  solvePart2(input);
}
`,
);

writeFileSync(
	testFile,
	`import { expect, test } from "bun:test";
import { loadData } from "./data-loader";
import { solvePart1, solvePart2 } from "./day-${day}";

const textFileUrl = new URL(import.meta.url.replace(".test.ts", ".txt"));

test("Day ${day} - Part 1 Example Input", () => {
  const input = loadData(textFileUrl);
  const exampleInput = ["example", "data"];
  expect(solvePart1(input)).toBe(0); // Replace with expected value
});

test("Day ${day} - Part 2 Example Input", () => {
  const input = loadData(textFileUrl);
  const exampleInput = ["example", "data"];
  expect(solvePart2(input)).toBe(0); // Replace with expected value
});
`,
);

writeFileSync(
	dataLoaderFile,
	`import { readFileSync } from "fs";
import { parseLines } from "../utils";

export function loadData(filePath: string): string[] {
  const fileContent = readFileSync(filePath, "utf8");
  return parseLines(fileContent);
}
`,
);

writeFileSync(
	executeFile,
	`import { solvePart1, solvePart2 } from "./day-${day}";
import { loadData } from "./data-loader";

const textFileUrl = new URL(import.meta.url.replace("execute-day-${day}.ts", "day-${day}.txt"));
const input = loadData(textFileUrl);

solvePart1(input);
solvePart2(input);
`,
);

writeFileSync(inputFile, "");

console.log(`Day ${day} files created successfully in ${dayDir}.`);
