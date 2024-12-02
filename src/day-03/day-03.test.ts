import { expect, test } from "bun:test";
import { loadInput } from "../utils";
import { solvePart1, solvePart2 } from "./day-03";

const textFileUrl = new URL(
	import.meta.url.replace(".test.ts", ".example.txt"),
);

test("Day 03 - Part 1", () => {
	// Load input
	const input = loadInput(textFileUrl);

	// Expected Value
	const expectedValue = 0;

	// Evaluation
	expect(solvePart1(input)).toBe(expectedValue);
});

test("Day 03 - Part 2", () => {
	// Load input
	const input = loadInput(textFileUrl);

	// Expected Value
	const expectedValue = 0;

	// Evaluation
	expect(solvePart2(input)).toBe(expectedValue);
});
