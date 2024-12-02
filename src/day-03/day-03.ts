import { loadInput, parseLines } from "../utils";

const textFileUrl = new URL(import.meta.url.replace(".ts", ".txt"));

// Load input
const input = loadInput(textFileUrl);
const lines = parseLines(input);

// Implement Part 1 logic
export function solvePart1(data: string[]): number {
	const result = 0;
	console.log("Result:", result);
	return result;
}

// Implement Part 2 logic
export function solvePart2(data: string[]): number {
	const result = 0;
	console.log("Result:", result);
	return result;
}

if (import.meta.main) {
	solvePart1(lines);
	solvePart2(lines);
}
