import { loadInput, parseLines } from "../utils";

const TEXT_FILE_URL = new URL(import.meta.url.replace(".ts", ".txt"));

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
