# Advent of Code 2024 - TypeScript Edition

This repository is a streamlined setup for solving the [Advent of Code](https://adventofcode.com/) 2024 puzzles using TypeScript.

## Features

- Day-specific folders: `src/day-XX/` with solution, tests, and input.
- Automated setup: Quickly generate files for new days.
- Reusable functions like `loadInput` and `parseLines`.
- Linting, formatting, type checking and tests are automated with GitHub Actions (`.github/workflows/ci.yml`).

## Usage

### Setup a New Day

To generate files for a new puzzle day:

```bash
bun setup-day <num>
```

This creates the folder `src/day-<number>/` with:

- `day-<num>.ts`: Solution boilerplate.
- `day-<num>.test.ts`: Test boilerplate.
- `day-<num>.example.txt`: File for the example input.
- `day-<num>.txt`: File for the puzzle input.

> [!TIP]
> Once you have generated the files, you'll need to paste the puzzle input into the `day-<num>.txt` file, and the example input into the `day-<num>.example.txt` file.
> Don't forget to update the `day-<num>.test.ts` file with both expected results from the example.

### Run a Specific Day

Execute the solution for a specific day:

```bash
bun start <day-num>
```

### Run Tests

Run all tests:

```sh
bun test
```

Run a specific test:

```sh
bun test <day-num>
```

### File Structure

```sh
src/
├── day-01/
│   ├── day-01.ts           # Solution
│   ├── day-01.test.ts      # Tests
│   ├── day-01.example.txt  # Example
│   └── day-01.txt          # Input
├── index.ts                # Main entry point
└── utils/
    ├── index.ts            # Utility functions
    └── setup-day.ts        # Day setup script
```
