import { z } from "zod";
import { debugLog, loadInput, parseLines } from "../utils";

type Report = number[];
const textFileUrl = new URL(import.meta.url.replace(".ts", ".input.txt"));

export function parseReports(lines: string[]): Report[] {
	return lines.map((line) =>
		z
			.array(z.number().int().positive())
			.parse(
				line.split(" ").map((levelAsString) => Number.parseInt(levelAsString)),
			),
	);
}

type ReportStatus =
	| {
			safe: true;
	  }
	| { safe: false; levelOnError: number };

function isReportSafe(report: Report): ReportStatus {
	const firstSub = report[0] - report[1];
	if (firstSub === 0 || Math.abs(firstSub) > 3) {
		// This is an unsafe report from the start, we skip it
		return { safe: false, levelOnError: 1 };
	}
	const orderBy: "asc" | "desc" = firstSub > 0 ? "desc" : "asc";

	for (let i = 1; i < report.length - 1; i++) {
		const sub = report[i] - report[i + 1];

		// Any two adjacent levels differ by at least one and at most three
		if (sub === 0 || Math.abs(sub) > 3) {
			return { safe: false, levelOnError: i + 1 };
		}

		// The levels are either all increasing or all decreasing
		if ((orderBy === "desc" && sub < 0) || (orderBy === "asc" && sub > 0)) {
			return { safe: false, levelOnError: i + 1 };
		}

		// Penultimate level has been reached and the report is safe
		if (i === report.length - 2) {
			return { safe: true };
		}
	}
	throw new Error(
		`The loop ended unexpectedly\nReport was ${report.toString()}`,
	);
}

// Load input
const input = loadInput(textFileUrl);
const lines = parseLines(input);
const reports = parseReports(lines);

// Implement Part 1 logic
export function solvePart1(data: Report[]): number {
	let safeReportCount = 0;

	for (const report of data) {
		const status = isReportSafe(report);
		if (status.safe) {
			safeReportCount++;
			debugLog("This report is safe: %s", report);
		}
	}

	console.log("Count of safe Reports:", safeReportCount);
	return safeReportCount;
}

// Implement Part 2 logic
export function solvePart2(data: Report[]): number {
	let safeReportCount = 0;

	for (const report of data) {
		const status = isReportSafe(report);
		if (status.safe) {
			safeReportCount++;
			debugLog("This report is safe: %s", report);
		} else {
			// Check if the report is safe after removing the level that introduces an issue
			const reportDampenerAppliedNext = report.toSpliced(
				status.levelOnError,
				1,
			);
			const statusWithDampenerNext = isReportSafe(reportDampenerAppliedNext);
			if (statusWithDampenerNext.safe) {
				safeReportCount++;
				debugLog(
					"Initially %s - removed index %d - report is now safe: %s",
					report,
					status.levelOnError,
					reportDampenerAppliedNext,
				);
				continue;
			}

			// Check if the report is safe after removing the previous level
			// Example: 10 8 7 6 5 3 4 3
			// An issue raised here  ^
			// But we need to remove the index 5 to make it safe
			const reportDampenerAppliedPrev = report.toSpliced(
				status.levelOnError - 1,
				1,
			);
			const statusWithDampenerPrev = isReportSafe(reportDampenerAppliedPrev);
			if (statusWithDampenerPrev.safe) {
				safeReportCount++;
				debugLog(
					"Initially %s - removed index %d - report is now safe: %s",
					report,
					status.levelOnError - 1,
					reportDampenerAppliedPrev,
				);
				continue;
			}

			// Sometimes we need to remove the first level to make the report safe
			const reportDampenerAppliedFirst = report.toSpliced(0, 1);
			const statusWithDampenerFirst = isReportSafe(reportDampenerAppliedFirst);
			if (statusWithDampenerFirst.safe) {
				safeReportCount++;
				debugLog(
					"Initially %s - removed index %d - report is now safe: %s",
					report,
					0,
					reportDampenerAppliedFirst,
				);
			}
			debugLog("This report is not safe: %s", report);
		}
	}

	console.log(
		"Count of safe Reports (with the Problem Dampener):",
		safeReportCount,
	);
	return safeReportCount;
}

if (import.meta.main) {
	solvePart1(reports);
	solvePart2(reports);
}
