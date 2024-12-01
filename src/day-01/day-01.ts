import { loadInput, parseLines } from "../utils";

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
