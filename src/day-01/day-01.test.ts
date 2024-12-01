import { expect, test } from "bun:test";
import { loadData } from "./data-loader";
import { parseLocationsRecord, solvePart1, solvePart2 } from "./day-01";

const textFileUrl = new URL(
	import.meta.url.replace(".test.ts", "-example.txt"),
);

test("Day 01 - Part 1 Example Input", () => {
	const input = loadData(textFileUrl);
	const locationsRecord = parseLocationsRecord(input);

	const exampleInput = ["example", "data"];
	expect(solvePart1(locationsRecord)).toBe(11); // Replace with expected value
});

test("Day 01 - Part 2 Example Input", () => {
	const input = loadData(textFileUrl);
	const locationsRecord = parseLocationsRecord(input);
	expect(solvePart2(locationsRecord)).toBe(31); // Replace with expected value
});
