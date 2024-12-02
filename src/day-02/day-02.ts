import { z } from "zod";
import { loadInput, parseLines } from "../utils";

type Report = number[];
const textFileUrl = new URL(import.meta.url.replace(".ts", ".txt"));

export function parseReports(lines: string[]): Report[] {
	return lines.map((line) =>
		z
			.array(z.number().int().positive())
			.parse(
				line.split(" ").map((levelAsString) => Number.parseInt(levelAsString)),
			),
	);
}

// Load input
const input = loadInput(textFileUrl);
const lines = parseLines(input);
const reports = parseReports(lines);

export function solvePart1(data: Report[]): number {
	// Implement Part 1 logic
	let safeReportCount = 0;

	for (const report of data) {
		const firstSub = report[0] - report[1];
		if (firstSub === 0 || Math.abs(firstSub) > 3) {
			// This is an unsafe report from the start, we skip it
			continue;
		}
		const orderBy: "asc" | "desc" = firstSub > 0 ? "desc" : "asc";

		for (let i = 1; i < report.length - 1; i++) {
			const sub = report[i] - report[i + 1];

			// Any two adjacent levels differ by at least one and at most three
			if (sub === 0 || Math.abs(sub) > 3) {
				break;
			}

			// The levels are either all increasing or all decreasing
			if ((orderBy === "desc" && sub < 0) || (orderBy === "asc" && sub > 0)) {
				break;
			}

			// Penultimate level has been reached and the report is safe
			if (i === report.length - 2) {
				safeReportCount++;
				// console.log("This report is safe: %s", report);
			}
		}
	}

	console.log("Count of safe Reports:", safeReportCount);
	return safeReportCount;
}

export function solvePart2(data: string[]): number {
	// Implement Part 2 logic
	const result = 0;
	console.log("Result:", result);
	return result;
}

if (import.meta.main) {
	solvePart1(reports);
	// solvePart2(lines);
}
