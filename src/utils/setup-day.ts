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
const inputFile = join(dayDir, `day-${day}.input.txt`);
const exampleInputFile = join(dayDir, `day-${day}.example.txt`);

if (existsSync(dayDir)) {
	console.error(`Day ${day} directory already exists.`);
	process.exit(1);
}

mkdirSync(dayDir);

writeFileSync(
	dayFile,
	`import { loadInput, parseLines } from "../utils";

const TEXT_FILE_URL = new URL(import.meta.url.replace(".ts", ".input.txt"));

export function loadAndParse(textFileUrl: URL): string[] {
	const input = loadInput(textFileUrl);
	const lines = parseLines(input);
	return lines;
}

// Implement Part 1 logic
export function solvePart1(textFileUrl: URL): number {
	// Load and parse the input
	const lines = loadAndParse(textFileUrl);

	const result = 0;
	console.log("Result:", result);
	return result;
}

// Implement Part 2 logic
export function solvePart2(textFileUrl: URL): number {
	// Load and parse the input
	const lines = loadAndParse(textFileUrl);

	const result = 0;
	console.log("Result:", result);
	return result;
}

if (import.meta.main) {
	solvePart1(TEXT_FILE_URL);
	solvePart2(TEXT_FILE_URL);
}
`,
);

writeFileSync(
	testFile,
	`import { expect, test } from "bun:test";
import { solvePart1, solvePart2 } from "./day-${day}";

const TEXT_FILE_URL_EXAMPLE = new URL(
	import.meta.url.replace(".test.ts", ".example.txt"),
);

test("Day ${day} - Part 1", () => {
	// Expected Value
	const expectedValue = 0;

	// Evaluation
	expect(solvePart1(TEXT_FILE_URL_EXAMPLE)).toBe(expectedValue);
});

test("Day ${day} - Part 2", () => {
	// Expected Value
	const expectedValue = 0;

	// Evaluation
	expect(solvePart2(TEXT_FILE_URL_EXAMPLE)).toBe(expectedValue);
});
`,
);

writeFileSync(inputFile, "");
writeFileSync(exampleInputFile, "");

console.log(`Day ${day} files created successfully in ${dayDir}.`);
