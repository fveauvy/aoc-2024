import { expect, test } from "bun:test";
import { loadInput, parseLines } from "../utils";
import { parseReports, solvePart1, solvePart2 } from "./day-02";

const textFileUrl = new URL(
	import.meta.url.replace(".test.ts", ".example.txt"),
);

test("Day 02 - Part 1", () => {
	// Load input
	const input = loadInput(textFileUrl);
	const lines = parseLines(input);
	const reports = parseReports(lines);

	// Expected Value
	const expectedValue = 2;

	// Evaluation
	expect(solvePart1(reports)).toBe(expectedValue);
});

test("Day 02 - Part 2", () => {
	// Load input
	const input = loadInput(textFileUrl);
	const lines = parseLines(input);
	const reports = parseReports(lines);

	// Expected Value
	const expectedValue = 4;

	// Evaluation
	expect(solvePart2(reports)).toBe(expectedValue);
});
