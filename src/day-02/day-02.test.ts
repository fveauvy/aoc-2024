import { expect, test } from "bun:test";
import { solvePart1, solvePart2 } from "./day-02";

const textFileUrl = new URL(
	import.meta.url.replace(".test.ts", "-example.txt"),
);

test("Day 02 - Part 1 Example Input", () => {
	const input = loadInput(textFileUrl);
	expect(solvePart1(input)).toBe(0); // Replace with expected value
});

test("Day 02 - Part 2 Example Input", () => {
	const input = loadInput(textFileUrl);
	expect(solvePart2(input)).toBe(0); // Replace with expected value
});
