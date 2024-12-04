import { debugLog, loadInput, parseGrid, parseLines } from "../utils";

const TEXT_FILE_URL = new URL(import.meta.url.replace(".ts", ".input.txt"));

export function loadAndParse(textFileUrl: URL): string[][] {
	const input = loadInput(textFileUrl);
	const lines = parseLines(input);
	const grid = parseGrid(lines);
	return grid;
}

const WORD = "XMAS";

type Direction = "N" | "NE" | "E" | "SE" | "S" | "SW" | "W" | "NW";

// A function that return a list of all the possible directions
function getDirections(
	x: number,
	y: number,
	wordLength: number,
	width: number,
	height: number,
): Direction[] {
	const directions: Direction[] = [];

	if (y - (wordLength - 1) >= 0) {
		directions.push("N");
	}
	if (y - (wordLength - 1) >= 0 && x + (wordLength - 1) < width) {
		directions.push("NE");
	}
	if (x + (wordLength - 1) < width) {
		directions.push("E");
	}
	if (y + (wordLength - 1) < height && x + (wordLength - 1) < width) {
		directions.push("SE");
	}
	if (y + (wordLength - 1) < height) {
		directions.push("S");
	}
	if (y + (wordLength - 1) < height && x - (wordLength - 1) >= 0) {
		directions.push("SW");
	}
	if (x - (wordLength - 1) >= 0) {
		directions.push("W");
	}
	if (y - (wordLength - 1) >= 0 && x - (wordLength - 1) >= 0) {
		directions.push("NW");
	}

	return directions;
}

// Function that will check if the word is present in the given direction
function checkWordInDirection(
	direction: Direction,
	grid: string[][],
	x: number,
	y: number,
): boolean {
	// Declare a mapping between the direction and the x and y coordinates
	const directionMapping: Record<Direction, [number, number]> = {
		N: [0, -1],
		NE: [1, -1],
		E: [1, 0],
		SE: [1, 1],
		S: [0, 1],
		SW: [-1, 1],
		W: [-1, 0],
		NW: [-1, -1],
	};

	// Get the x and y coordinates for the given direction
	const [dx, dy] = directionMapping[direction];

	// We loop through all the characters in the word and check if they are present in the grid
	// We can skip the first character as we already know that it is present in the grid
	for (let i = 1; i < WORD.length; i++) {
		if (grid[y + dy * i][x + dx * i] !== WORD[i]) {
			return false;
		}
	}

	return true;
}

// Implement Part 1 logic
export function solvePart1(textFileUrl: URL): number {
	// Load and parse the input
	const grid = loadAndParse(textFileUrl);

	debugLog("Grid: ", grid);

	let wordCount = 0;

	for (let y = 0; y < grid.length; y++) {
		const width = grid.length;
		for (let x = 0; x < grid[y].length; x++) {
			const height = grid[y].length;
			// Check if the current cell is the first letter of the word
			if (grid[y][x] === WORD[0]) {
				const directions = getDirections(x, y, WORD.length, width, height);

				// Loop through all the directions and check if the word is present
				for (const direction of directions) {
					if (checkWordInDirection(direction, grid, x, y)) wordCount++;
				}
			}
		}
	}

	console.log("Word count:", wordCount);
	return wordCount;
}

// Implement Part 2 logic
export function solvePart2(textFileUrl: URL): number {
	// Load and parse the input
	const lines = loadAndParse(textFileUrl);

	const result = 0;
	console.log("Result:", result);
	return result;
}

if (import.meta.main) {
	solvePart1(TEXT_FILE_URL);
	solvePart2(TEXT_FILE_URL);
}
