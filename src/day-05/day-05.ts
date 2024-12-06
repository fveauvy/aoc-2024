import { debugLog, loadInput } from "../utils";

const TEXT_FILE_URL = new URL(import.meta.url.replace(".ts", ".input.txt"));
type Update = number[];
type RuleSet = [number, number][];

// Function to load and parse the input file
export function loadAndParse(textFileUrl: URL): {
	rules: RuleSet;
	updateList: Update[];
} {
	const input = loadInput(textFileUrl);

	const [rulesSection, updatesSection] = input.trim().split("\n\n");
	// debugLog("Update section:\n", updatesSection);
	// debugLog("Rules section:\n", rulesSection);
	const rules = rulesSection.split("\n").map((line) => {
		const [x, y] = line.split("|").map((page) => Number.parseInt(page));
		return [x, y] as [number, number];
	});

	const updateList = updatesSection
		.split("\n")
		.map((line) => line.split(",").map(Number));
	return { rules, updateList };
}

// Function to check if an update is correct using the rules
function isUpdateCorrect(rules: RuleSet, update: number[]): boolean {
	const position = new Map<number, number>();
	update.forEach((page, index) => position.set(page, index));
	for (const [x, y] of rules) {
		const posX = position.get(x);
		const posY = position.get(y);
		if (posX !== undefined && posY !== undefined && posX > posY) {
			debugLog(
				`Update ${update} is incorrect: ${x} (${posX}) > ${y} (${posY})`,
			);
			return false;
		}
	}
	return true;
}

// Function to reorder an update using the rules
function reorderUpdate(rules: RuleSet, update: number[]): number[] {
	const graph = new Map<number, number[]>();
	const inDegree = new Map<number, number>();

	// Initialize the graph and in-degree map
	for (const page of update) {
		graph.set(page, []);
		inDegree.set(page, 0);
	}

	// Build the graph and in-degree map based on the rules
	for (const [x, y] of rules) {
		if (graph.has(x) && graph.has(y)) {
			graph.get(x)?.push(y);
			inDegree.set(y, (inDegree.get(y) || 0) + 1);
		}
	}

	// Perform topological sort using Kahn's algorithm
	const queue: number[] = [];
	for (const [page, degree] of inDegree.entries()) {
		if (degree === 0) {
			queue.push(page);
		}
	}

	const sorted: number[] = [];
	while (queue.length > 0) {
		const page = queue.shift();
		if (page !== undefined) {
			sorted.push(page);
			for (const neighbor of graph.get(page) || []) {
				inDegree.set(neighbor, (inDegree.get(neighbor) || 0) - 1);
				if (inDegree.get(neighbor) === 0) {
					queue.push(neighbor);
				}
			}
		}
	}

	return sorted;
}

// Function to find the middle page of an update
function findMiddlePage(update: number[]): number {
	const middleIndex = Math.floor(update.length / 2);
	return update[middleIndex];
}

// Implement Part 1 logic
export function solvePart1(textFileUrl: URL): number {
	// Load and parse the input
	const { updateList, rules } = loadAndParse(textFileUrl);

	let sum = 0;
	for (const update of updateList) {
		if (isUpdateCorrect(rules, update)) {
			const middlePage = findMiddlePage(update);
			debugLog(`Correct update: ${update}, middle page: ${middlePage}`);
			sum += middlePage;
		} else {
			debugLog(`Incorrect update: ${update}`);
		}
	}
	console.log("Result:", sum);
	return sum;
}

// Implement Part 2 logic
export function solvePart2(textFileUrl: URL): number {
	// Load and parse the input
	const { updateList, rules } = loadAndParse(textFileUrl);

	let sum = 0;
	for (const update of updateList) {
		if (!isUpdateCorrect(rules, update)) {
			const reorderedUpdate = reorderUpdate(rules, update);
			const middlePage = findMiddlePage(reorderedUpdate);
			debugLog(
				`Reordered update: ${reorderedUpdate}, middle page: ${middlePage}`,
			);
			sum += middlePage;
		}
	}
	console.log("Result:", sum);
	return sum;
}

// Run the solution if this file is executed directly
if (import.meta.main) {
	solvePart1(TEXT_FILE_URL);
	solvePart2(TEXT_FILE_URL);
}
