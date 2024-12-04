import { expect, test } from "bun:test";
import { solvePart1, solvePart2 } from "./day-02";

const textFileUrl = new URL(
	import.meta.url.replace(".test.ts", ".example.txt"),
);

test("Day 02 - Part 1", () => {
	// Expected Value
	const expectedValue = 2;

	// Evaluation
	expect(solvePart1(textFileUrl)).toBe(expectedValue);
});

test("Day 02 - Part 2", () => {
	// Expected Value
	const expectedValue = 4;

	// Evaluation
	expect(solvePart2(textFileUrl)).toBe(expectedValue);
});
