# Advent of Code 2024 - TypeScript Edition

This repository is a streamlined setup for solving the [Advent of Code](https://adventofcode.com/) 2024 puzzles using TypeScript.

## Features

- Day-specific folders: `src/day-XX/` with solution, tests, and input.
- Automated setup: Quickly generate files for new days.
- Reusable functions like `loadInput` and `parseLines`.
- Linting, formatting, and tests are automated with GitHub Actions (`.github/workflows/ci.yml`).

## Usage

### Setup a New Day

To generate files for a new puzzle day:

```bash
bun run setup-day <number>
```

This creates the folder `src/day-<number>/` with:

- `day-<number>.ts`: Solution boilerplate.
- `day-<number>.test.ts`: Test boilerplate.
- `day-<number>.txt`: Empty input file.
- `data-loader.ts`: Data loader for reading and parsing input.
- `execute-day-<number>.ts`: Script to run the solution.

### Run a Specific Day

Execute the solution for a specific day:

```bash
bun run src/index.ts <day-number>
```

### Run Tests

Run all tests:

```sh
bun test
```

Run a specific test:

```sh
bun test src/day-XX/day-XX.test.ts
```

### File Structure

```sh
src/
├── day-01/
│   ├── day-01.ts       # Solution
│   ├── day-01.test.ts  # Tests
│   ├── day-01.txt      # Input
│   ├── data-loader.ts  # Data loader
│   └── execute-day-01.ts # Execution script
├── index.ts            # Main entry point
└── utils/
    ├── index.ts        # Utility functions
    └── setup-day.ts    # Day setup script
```
