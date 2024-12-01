import { readFileSync } from "fs";
import { parseLines } from "../utils";

export function loadData(filePath: string): string[] {
  const fileContent = readFileSync(filePath, "utf8");
  return parseLines(fileContent);
}
