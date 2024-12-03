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
bun setup-day <number>
```

This creates the folder `src/day-<number>/` with:

- `day-<number>.ts`: Solution boilerplate.
- `day-<number>.test.ts`: Test boilerplate.
- `day-<number>.example.txt`: File for the example input.
- `day-<number>.txt`: File for the puzzle input.

> [!TIP]
> Once you have generated the files, you'll need to paste the puzzle input into the `day-<number>.txt` file, and the example input into the `day-<number>.example.txt` file.
>
> Don't forget to update the `day-<number>.test.ts` file with the expected results for the example and puzzle inputs as well.

### Run a Specific Day

Execute the solution for a specific day:

```bash
bun start <day-number>
```

### Run Tests

Run all tests:

```sh
bun test
```

Run a specific test:

```sh
bun test <day-number>
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
