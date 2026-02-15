# Contributing to ClawDrawAlgos

Add your own drawing algorithms to the ClawDraw community library.

## Quick Start

1. Fork this repository
2. Create a branch: `git checkout -b my-algorithm`
3. Copy `_template.mjs` to `primitives/your-algorithm.mjs`
4. Implement your algorithm
5. Test locally
6. Submit a pull request

## File Structure

Your algorithm must be a single `.mjs` file in the `primitives/` directory:

```
primitives/
  helpers.mjs              # Shared utilities (do not modify)
  sierpinski-triangle.mjs  # Example algorithm
  your-algorithm.mjs       # Your contribution
```

Use **kebab-case** for filenames: `my-cool-pattern.mjs`, not `myCoolPattern.mjs`.

## Requirements

### Exports

Every algorithm must export:

1. **`METADATA`** — Object with:
   - `name` (string): Unique camelCase identifier
   - `description` (string): One-line description
   - `category`: Must be `'community'`
   - `author` (string): Your GitHub username
   - `parameters` (object): Parameter definitions with `type`, `required`, and `description`

2. **Named function** matching `METADATA.name` — The drawing function itself

### Function Rules

- Accept parameters as positional arguments matching the order in `METADATA.parameters`
- Return an array of stroke objects (use `makeStroke` / `splitIntoStrokes` from helpers)
- **No external dependencies** — only import from `./helpers.mjs`
- Maximum file size: 50KB
- Must not modify global state
- Must terminate in bounded time (no infinite loops)

### Limits

- Maximum **200 strokes** per algorithm call
- Maximum **5000 points** per stroke

### Available Imports

```js
import {
  clamp, lerp,
  hexToRgb, rgbToHex, lerpColor, hslToHex,
  samplePalette, PALETTES, PALETTE_NAMES,
  randomPalette, randomColor,
  noise2d,
  makeStroke, splitIntoStrokes,
  simulatePressure, getPressureForStyle,
  clipLineToRect,
} from './helpers.mjs';
```

## Naming

- Use **camelCase** for the function/primitive name: `myAlgorithm`
- Use **kebab-case** for the filename: `my-algorithm.mjs`
- Choose a descriptive name that hints at the visual output

## Submission

Submit a PR with:
- Your single `.mjs` file in `primitives/`
- A brief description of the algorithm and what it draws
- At least one example invocation showing the parameters
