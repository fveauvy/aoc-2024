import { solvePart1, solvePart2 } from "./day-01";
import { loadData } from "./data-loader";

const textFileUrl = new URL(import.meta.url.replace("execute-day-01.ts", "day-01.txt"));
const input = loadData(textFileUrl);

solvePart1(input);
solvePart2(input);
