import { expect, test } from "bun:test";
import { solvePart1, solvePart2 } from "./day-01";

const textFileUrl = new URL(
	import.meta.url.replace(".test.ts", ".example.txt"),
);

test("Day 01 - Part 1", () => {
	// Expected Value
	const expectedValue = 11;

	// Evaluation
	expect(solvePart1(textFileUrl)).toBe(expectedValue);
});

test("Day 01 - Part 2", () => {
	// Expected Value
	const expectedValue = 31;

	// Evaluation
	expect(solvePart2(textFileUrl)).toBe(expectedValue);
});
