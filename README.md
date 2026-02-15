# ClawDrawAlgos

Community-contributed drawing algorithms for [ClawDraw](https://clawdraw.ai) agents.

## Available Algorithms

| Algorithm | File | Description |
|-----------|------|-------------|
| `sierpinskiTriangle` | `primitives/sierpinski-triangle.mjs` | Recursive Sierpinski triangle fractal |
| `voronoiNoise` | `primitives/voronoi-noise.mjs` | Organic Voronoi cell noise with hand-drawn edges |
| `phyllotaxisSpiral` | `primitives/phyllotaxis-spiral.mjs` | Sunflower-inspired golden angle spiral |
| `orbitalDynamics` | `primitives/orbital-dynamics.mjs` | Gravitational orbit trails around attractors |
| `reactionDiffusion` | `primitives/reaction-diffusion.mjs` | Turing-inspired contour patterns (spots, stripes, labyrinths) |

## Quick Start

Clone this repo and import any algorithm directly:

```bash
git clone https://github.com/kajukabla/ClawDrawAlgos.git
```

```js
import { sierpinskiTriangle } from './ClawDrawAlgos/primitives/sierpinski-triangle.mjs';

const strokes = sierpinskiTriangle(0, 0, 150, 4);
// Returns array of stroke objects ready for ClawDraw
```

## Creating Your Own Algorithm

1. Copy `_template.mjs` to `primitives/your-algorithm.mjs`
2. Implement your algorithm following the template pattern
3. Export `METADATA` and your named function
4. Test locally with `node -e "import('./primitives/your-algorithm.mjs').then(m => console.log(m.yourAlgorithm(0, 0)))"`
5. Submit a pull request

### Import Paths

Algorithms in this repo import helpers from `./helpers.mjs` (same directory). If you copy an algorithm into ClawDraw's `community/` directory, change the import to `../primitives/helpers.mjs`.

## Available Helpers

All algorithms can import from `primitives/helpers.mjs`:

| Helper | Description |
|--------|-------------|
| `clamp(v, min, max)` | Clamp a number to a range |
| `lerp(a, b, t)` | Linear interpolation |
| `hexToRgb(hex)` | Convert hex color to `{r, g, b}` |
| `rgbToHex(r, g, b)` | Convert RGB to hex string |
| `lerpColor(hex1, hex2, t)` | Interpolate between two hex colors |
| `hslToHex(h, s, l)` | Convert HSL to hex |
| `samplePalette(name, t)` | Sample a gradient palette at position t (0-1) |
| `randomPalette()` | Get a random palette (array of hex stops) |
| `randomColor()` | Get a random color from a random palette |
| `PALETTES` | Object with 5 scientific palettes: magma, plasma, viridis, turbo, inferno |
| `noise2d(x, y)` | 2D Perlin noise (-1 to 1) |
| `makeStroke(points, color, brushSize, opacity, pressureStyle)` | Create a stroke object from `{x, y}` points |
| `splitIntoStrokes(points, color, brushSize, opacity, pressureStyle)` | Split long point arrays into multiple strokes |
| `clipLineToRect(p0, p1, minX, minY, maxX, maxY)` | Clip a line segment to a rectangle |

### Stroke Format

```js
{
  id: 'tool-...',
  points: [{ x, y, pressure, timestamp }],
  brush: { size, color, opacity },
  createdAt: timestamp
}
```

### Limits

- Maximum **200 strokes** per algorithm call
- Maximum **5000 points** per stroke (use `splitIntoStrokes` for longer paths)

## License

MIT
