import { debugLog, loadInput } from "../utils";

const TEXT_FILE_URL = new URL(import.meta.url.replace(".ts", ".input.txt"));
type Update = number[];
type RuleSet = [number, number][];

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

// Function to detect cycles in the graph
function hasCycle(graph: Map<number, number[]>): boolean {
	const visited = new Set<number>();
	const recStack = new Set<number>();

	function visit(node: number): boolean {
		if (recStack.has(node)) return true;
		if (visited.has(node)) return false;

		visited.add(node);
		recStack.add(node);

		for (const neighbor of graph.get(node) || []) {
			if (visit(neighbor)) return true;
		}

		recStack.delete(node);
		return false;
	}
	for (const node of graph.keys()) {
		if (visit(node)) return true;
	}

	return false;
}

// Function to build a DAG from the rules and remove cycles
// https://fr.wikipedia.org/wiki/Graphe_orient%C3%A9_acyclique
function buildDAG(rules: RuleSet): Map<number, number[]> {
	const graph = new Map<number, number[]>();
	for (const [x, y] of rules) {
		if (!graph.has(x)) graph.set(x, []);
		if (!graph.has(y)) graph.set(y, []);
		graph.get(x)?.push(y);

		// Check for cycles and remove the edge if it forms a cycle
		if (hasCycle(graph)) {
			graph.get(x)?.pop();
		}
	}
	return graph;
}

// https://www.sesvtutorial.com/topological-sort/
// Function to perform topological sort on the DAG
function topologicalSort(graph: Map<number, number[]>): number[] {
	// Set to keep track of visited nodes
	const visited = new Set<number>();
	// Stack to store the topological order
	const stack: number[] = [];
	// Temporary set to detect cycles
	const temp = new Set<number>();

	// Helper function to visit nodes
	function visit(node: number) {
		// If the node is in the temporary set, a cycle is detected
		if (temp.has(node)) throw new Error("Graph is not a DAG");
		// If the node has not been visited yet
		if (!visited.has(node)) {
			// Add the node to the temporary set
			temp.add(node);
			// Recursively visit all the neighbors of the node
			for (const neighbor of graph.get(node) || []) {
				visit(neighbor);
			}
			// Remove the node from the temporary set
			temp.delete(node);
			// Mark the node as visited
			visited.add(node);
			// Push the node to the stack
			stack.push(node);
		}
	}

	// Visit all nodes in the graph
	for (const node of graph.keys()) {
		// If the node has not been visited yet, visit it
		if (!visited.has(node)) {
			visit(node);
		}
	}

	// Return the stack in reverse order to get the topological order
	return stack.reverse();
}

// Function to check if an update is correct using the DAG
function isUpdateCorrect(
	position: Map<number, number>,
	update: number[],
): boolean {
	for (let i = 0; i < update.length - 1; i++) {
		const current = position.get(update[i]);
		const next = position.get(update[i + 1]);
		if (current === undefined || next === undefined || current > next) {
			return false;
		}
	}
	return true;
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

	const graph = buildDAG(rules);
	const sortedPages = topologicalSort(graph);
	const position = new Map<number, number>();

	debugLog("Sorted pages:", sortedPages);

	sortedPages.forEach((page, index) => position.set(page, index));

	let sum = 0;
	for (const update of updateList) {
		if (isUpdateCorrect(position, update)) {
			sum += findMiddlePage(update);
		}
	}
	console.log("Result:", sum);
	return sum;
}

// Implement Part 2 logic
export function solvePart2(textFileUrl: URL): number {
	// Load and parse the input
	const { updateList, rules } = loadAndParse(textFileUrl);

	const result = 0;
	console.log("Result:", result);
	return result;
}

// Run the solution if this file is executed directly
if (import.meta.main) {
	solvePart1(TEXT_FILE_URL);
	solvePart2(TEXT_FILE_URL);
}
