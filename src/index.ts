import { $ } from "bun";
console.log("Advent of Code 2024 - TypeScript edition");

// Retrieve the day from arguments
const [dayArg] = process.argv.slice(2);

if (!dayArg || !/^\d+$/.test(dayArg)) {
	console.error("Usage: bun run src/run-day.ts <day-number>");
	process.exit(1);
}

const day = dayArg.padStart(2, "0"); // Ensure two-digit format
const scriptPath = `./src/day-${day}/day-${day}.ts`; // Updated to match folder structure

try {
	await $`bun run ${scriptPath}`;
} catch (err) {
	console.error(`Failed to run ${scriptPath}:`, err);
	process.exit(1);
}
