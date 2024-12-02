import { expect, test } from "bun:test";
import { loadInput, parseLines } from "../utils";
import { parseReports, solvePart1, solvePart2 } from "./day-02";

const textFileUrl = new URL(
	import.meta.url.replace(".test.ts", ".example.txt"),
);

test("Day 02 - Part 1 Example Input", () => {
	// Load input
	const input = loadInput(textFileUrl);
	const lines = parseLines(input);
	const reports = parseReports(lines);
	expect(solvePart1(reports)).toBe(2); // Replace with expected value
});

test("Day 02 - Part 2 Example Input", () => {
	// Load input
	const input = loadInput(textFileUrl);
	const lines = parseLines(input);
	const reports = parseReports(lines);
	expect(solvePart2(reports)).toBe(4); // Replace with expected value
});
