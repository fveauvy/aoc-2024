import { z } from "zod";
import { loadData } from "./data-loader";

type LocationsRecord = {
	col1: number[];
	col2: number[];
};
const textFileUrl = new URL(import.meta.url.replace(".ts", ".txt"));

export function parseLocationsRecord(input: string): LocationsRecord {
	return input.split("\n").reduce(
		(acc, line) => {
			const [left, right] = line.split("   ");
			const locationIdSchema = z.number().int().positive();
			const valueCol1 = locationIdSchema.parse(Number.parseInt(left));
			const valueCol2 = locationIdSchema.parse(Number.parseInt(right));
			acc.col1.push(valueCol1);
			acc.col2.push(valueCol2);
			return acc;
		},
		{ col1: new Array<number>(), col2: new Array<number>() },
	);
}

// Load input
const input = loadData(textFileUrl);
const locationsRecord = parseLocationsRecord(input);

export function solvePart1(data: LocationsRecord): number {
	let totalDistance = 0;

	// Sort both records
	const sortedList1 = data.col1.sort((a, b) => a - b);
	const sortedList2 = data.col2.sort((a, b) => a - b);

	// Compare and increment the distance
	for (let i = 0; i < sortedList1.length; i++) {
		totalDistance += Math.abs(sortedList1[i] - sortedList2[i]);
	}

	console.log("Total distance is: %d", totalDistance);
	return totalDistance;
}

export function solvePart2(data: LocationsRecord): number {
	let similarityScore = 0;

	const locationMap2 = new Map<number, number>();

	for (const location of data.col2) {
		const locationRef = locationMap2.get(location);
		if (!locationRef) {
			locationMap2.set(location, 1);
		} else {
			locationMap2.set(location, locationRef.valueOf() + 1);
		}
	}

	for (const location of data.col1) {
		const locationCount = locationMap2.get(location);
		if (locationCount) {
			similarityScore += location * locationCount;
		}
	}

	console.log("Similarity score is: %d", similarityScore);
	return similarityScore;
}

solvePart1(locationsRecord);
solvePart2(locationsRecord);
