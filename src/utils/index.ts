import { readFileSync } from "node:fs";

export function loadInput(textfileurl: URL) {
	const input = readFileSync(textfileurl, "utf8").trim();
	return input;
}

export function parseLines(input: string): string[] {
	return input.split("\n").map((line) => line.trim());
}

export function parseGrid(lines: string[]): string[][] {
	return lines.map((line) => Array.from(line));
}

export function debugLog(...data: unknown[]): void {
	if (process.env.DEBUG === "1") {
		console.log(...data);
	}
}
