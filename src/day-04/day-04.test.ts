import { expect, test } from "bun:test";
import { solvePart1, solvePart2 } from "./day-04";

const TEXT_FILE_URL_EXAMPLE = new URL(
	import.meta.url.replace(".test.ts", ".example.txt"),
);

test("Day 04 - Part 1", () => {
	// Expected Value
	const expectedValue = 18;

	// Evaluation
	expect(solvePart1(TEXT_FILE_URL_EXAMPLE)).toBe(expectedValue);
});

test("Day 04 - Part 2", () => {
	// Expected Value
	const expectedValue = 9;

	// Evaluation
	expect(solvePart2(TEXT_FILE_URL_EXAMPLE)).toBe(expectedValue);
});
