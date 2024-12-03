import { z } from "zod";
import { debugLog, loadInput } from "../utils";

const TEXT_FILE_URL = new URL(import.meta.url.replace(".ts", ".input.txt"));

export function loadAndParse(textFileUrl: URL): string {
	const input = loadInput(textFileUrl);
	return input;
}

const enabledSectionRegex =
	/^(?<start_section>.*?)don't\(\)|do\(\)(?<section>.*?)don't|do\(\)(?<end_section>.*?)$/gm;

const mulRegex = /mul\((\d{1,3}),(\d{1,3})\)/gm;
const operandListSchema = z.array(
	z.object({ operand1: z.number().int(), operand2: z.number().int() }),
);

// Retrieve all the multiplication operations from the string
function getOperandList(str: string): { operand1: number; operand2: number }[] {
	return Array.from(
		str.matchAll(mulRegex).map((regExpExec) => ({
			operand1: Number.parseInt(regExpExec[1]),
			operand2: Number.parseInt(regExpExec[2]),
		})),
	);
}

// Implement Part 1 logic
export function solvePart1(textFileUrl: URL): number {
	// Load and parse the input
	const data = loadAndParse(textFileUrl);

	const operandList = getOperandList(data);
	const parsedOperandList = operandListSchema.parse(operandList);
	debugLog(`Uncorrupted Multiplication count: ${parsedOperandList.length}`);

	const result = operandList.reduce(
		(result, multiply) => result + multiply.operand1 * multiply.operand2,
		0,
	);
	console.log("Result:", result);
	return result;
}

// Implement Part 2 logic
export function solvePart2(textFileUrl: URL): number {
	// Load and parse the input
	const data = loadAndParse(textFileUrl).replaceAll("\n", "");

	// Create a list of all enabled sections
	const enabledSectionList = data
		.matchAll(enabledSectionRegex)
		.toArray()
		.flatMap((matchRegex) =>
			matchRegex.filter((value, index) => index !== 0 && !!value),
		);

	debugLog("Number of enabled sections:", enabledSectionList.length);

	// Find all the multiplication operations in the enabled sections
	const operandList = enabledSectionList.flatMap((section) =>
		getOperandList(section),
	);

	debugLog("Operand List:", operandList);

	const result = operandList.reduce(
		(result, multiply) => result + multiply.operand1 * multiply.operand2,
		0,
	);
	console.log("Result:", result);
	return result;
}

if (import.meta.main) {
	solvePart1(TEXT_FILE_URL);
	solvePart2(TEXT_FILE_URL);
}
