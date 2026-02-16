/**
 * Generate preview HTML for all algorithms.
 * Usage: node scripts/generate-previews.mjs
 * Outputs: /tmp/clawdraw-previews.html (self-contained, open in browser)
 */

import { sierpinskiTriangle } from '../primitives/sierpinski-triangle.mjs';
import { voronoiNoise } from '../primitives/voronoi-noise.mjs';
import { phyllotaxisSpiral } from '../primitives/phyllotaxis-spiral.mjs';
import { orbitalDynamics } from '../primitives/orbital-dynamics.mjs';
import { reactionDiffusion } from '../primitives/reaction-diffusion.mjs';
import { mandelbrot } from '../primitives/mandelbrot.mjs';
import { sphere3d } from '../primitives/sphere-3d.mjs';
import { cube3d } from '../primitives/cube-3d.mjs';
import { turingPatterns } from '../primitives/turing-patterns.mjs';
import { grayScott } from '../primitives/gray-scott.mjs';
import { metaballs } from '../primitives/metaballs.mjs';
import { domainWarping } from '../primitives/domain-warping.mjs';
import { worleyNoise } from '../primitives/worley-noise.mjs';
import { slimeMold } from '../primitives/slime-mold.mjs';
import { hopalongAttractor } from '../primitives/hopalong-attractor.mjs';
import { cliffordAttractor } from '../primitives/clifford-attractor.mjs';
import { doublePendulum } from '../primitives/double-pendulum.mjs';
import { kaleidoscopicIfs } from '../primitives/kaleidoscopic-ifs.mjs';
import { apollonianGasket } from '../primitives/apollonian-gasket.mjs';
import { voronoiCrackle } from '../primitives/voronoi-crackle.mjs';
import { penroseTiling } from '../primitives/penrose-tiling.mjs';
import { hyperbolicTiling } from '../primitives/hyperbolic-tiling.mjs';
import { gielisSuperformula } from '../primitives/gielis-superformula.mjs';
import { lichenGrowth } from '../primitives/lichen-growth.mjs';
import { dla } from '../primitives/dla.mjs';
import { schotter } from '../primitives/schotter.mjs';
import { langtonsAnt } from '../primitives/langtons-ant.mjs';
import { waveFunctionCollapse } from '../primitives/wave-function-collapse.mjs';
import { vineGrowth } from '../primitives/vine-growth.mjs';
import { dragonCurve } from '../primitives/dragon-curve.mjs';
import { gameOfLife } from '../primitives/game-of-life.mjs';
import { juliaSet } from '../primitives/julia-set.mjs';
import { kochSnowflake } from '../primitives/koch-snowflake.mjs';
import { hypercube } from '../primitives/hypercube.mjs';
import { gear } from '../primitives/gear.mjs';
import { starburst } from '../primitives/starburst.mjs';
import { writeFileSync } from 'node:fs';

const SIZE = 400;
const CX = SIZE / 2;
const CY = SIZE / 2;

/** Run a generator multiple times and keep the result with the most total points. */
function pickBest(fn, tries = 10) {
  let best = null, bestCount = 0;
  for (let i = 0; i < tries; i++) {
    const strokes = fn();
    const count = strokes.reduce((s, st) => s + st.points.length, 0);
    if (count > bestCount) { best = strokes; bestCount = count; }
  }
  return best;
}

const algorithms = [
  // --- Original 8 ---
  {
    id: 'sierpinski-triangle',
    label: 'Sierpinski Triangle',
    strokes: sierpinskiTriangle(CX, CY + 35, 180, 5, undefined, 3, undefined, 'inferno', 'flat'),
  },
  {
    id: 'voronoi-noise',
    label: 'Voronoi Noise',
    strokes: voronoiNoise(CX, CY, 390, 390, 80, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'phyllotaxis-spiral',
    label: 'Phyllotaxis Spiral',
    strokes: phyllotaxisSpiral(CX, CY, 185, 500, 0.6, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'gravity-swirl',
    label: 'Gravity Swirl',
    strokes: pickBest(() => orbitalDynamics(CX, CY, 185, 30, 2, 2000, 4000, undefined, undefined, undefined, 'inferno')),
  },
  {
    id: 'reaction-diffusion',
    label: 'Reaction Diffusion',
    strokes: reactionDiffusion(CX, CY, 390, 390, 0.02, 12, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'mandelbrot',
    label: 'Mandelbrot',
    strokes: mandelbrot(CX, CY, 390, 390, 50, undefined, undefined, undefined, 10, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'sphere-3d',
    label: '3D Sphere',
    strokes: sphere3d(CX, CY, 155, 20, 24, undefined, undefined, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'cube-3d',
    label: '3D Cube',
    strokes: cube3d(CX, CY, 100, 30, 45, 15, 5, undefined, undefined, undefined, 'inferno'),
  },

  // --- 20 New Algorithms ---

  // Batch A: Field + Contour
  {
    id: 'turing-patterns',
    label: 'Turing Patterns',
    // turingPatterns(cx, cy, width, height, scale, complexity, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: turingPatterns(CX, CY, 350, 350, 5, 3, 6, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'gray-scott',
    label: 'Gray-Scott',
    // grayScott(cx, cy, width, height, feed, kill, iterations, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: grayScott(CX, CY, 350, 350, 0.037, 0.06, 200, 5, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'metaballs',
    label: 'Metaballs',
    // metaballs(cx, cy, width, height, numBalls, threshold, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: metaballs(CX, CY, 350, 350, 6, 1.0, 4, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'domain-warping',
    label: 'Domain Warping',
    // domainWarping(cx, cy, width, height, scale, warpStrength, warpOctaves, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: domainWarping(CX, CY, 350, 350, 0.01, 80, 2, 6, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'worley-noise',
    label: 'Worley Noise',
    // worleyNoise(cx, cy, width, height, numCells, mode, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: worleyNoise(CX, CY, 350, 350, 20, 'F2minusF1', 5, undefined, undefined, undefined, 'inferno'),
  },

  // Batch B: Particle/Attractor
  {
    id: 'slime-mold',
    label: 'Slime Mold',
    // slimeMold(cx, cy, width, height, agents, steps, sensorDist, sensorAngle, turnSpeed, decayRate, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: slimeMold(CX, CY, 390, 390, 180, 100, undefined, undefined, undefined, undefined, undefined, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'hopalong-attractor',
    label: 'Hopalong Attractor',
    // hopalongAttractor(cx, cy, radius, a, b, c, numPoints, numStrokes, color, brushSize, opacity, palette, pressureStyle)
    strokes: hopalongAttractor(CX, CY, 185, 1.1, 2.0, 0.5, 2000, 100, undefined, 2, 0.18, 'inferno'),
  },
  {
    id: 'clifford-attractor',
    label: 'Clifford Attractor',
    // cliffordAttractor(cx, cy, radius, a, b, c, d, numPoints, numStrokes, color, brushSize, opacity, palette, pressureStyle)
    strokes: cliffordAttractor(CX, CY, 185, -1.4, 1.6, 1.0, 0.7, 2000, 100, undefined, 2, 0.18, 'inferno'),
  },
  {
    id: 'double-pendulum',
    label: 'Double Pendulum',
    // doublePendulum(cx, cy, radius, angle1, angle2, steps, traces, color, brushSize, opacity, palette, pressureStyle)
    strokes: doublePendulum(CX, CY, 150, 120, 150, 2000, 5, undefined, undefined, 0.5, 'inferno'),
  },
  {
    id: 'kaleidoscopic-ifs',
    label: 'Kaleidoscopic IFS',
    // kaleidoscopicIfs(cx, cy, radius, symmetry, transforms, iterations, numStrokes, color, brushSize, opacity, palette, pressureStyle)
    strokes: kaleidoscopicIfs(CX, CY, 185, 6, 3, 2000, 100, undefined, 2, 0.18, 'inferno'),
  },

  // Batch C: Recursive/Parametric
  {
    id: 'apollonian-gasket',
    label: 'Apollonian Gasket',
    // apollonianGasket(cx, cy, radius, maxDepth, minRadius, color, brushSize, opacity, palette, pressureStyle)
    strokes: apollonianGasket(CX, CY, 170, 5, 3, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'voronoi-crackle',
    label: 'Voronoi Crackle',
    // voronoiCrackle(cx, cy, width, height, numCells, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: voronoiCrackle(CX, CY, 350, 350, 30, 4, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'penrose-tiling',
    label: 'Penrose Tiling',
    // penroseTiling(cx, cy, radius, depth, color, brushSize, opacity, palette, pressureStyle)
    strokes: penroseTiling(CX, CY, 180, 4, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'hyperbolic-tiling',
    label: 'Hyperbolic Tiling',
    // hyperbolicTiling(cx, cy, radius, p, q, maxDepth, color, brushSize, opacity, palette, pressureStyle)
    strokes: hyperbolicTiling(CX, CY, 180, 4, 5, 4, undefined, 3, 0.7, 'inferno'),
  },
  {
    id: 'gielis-superformula',
    label: 'Gielis Superformula',
    // gielisSuperformula(cx, cy, radius, m, n1, n2, n3, a, b, layers, pointsPerLayer, color, brushSize, opacity, palette, pressureStyle)
    strokes: gielisSuperformula(CX, CY, 120, 5, 0.3, 0.3, 0.3, undefined, undefined, 8, undefined, undefined, undefined, undefined, 'inferno'),
  },

  // Batch D: Grid/Cellular/Simulation
  {
    id: 'lichen-growth',
    label: 'Lichen Growth',
    // lichenGrowth(cx, cy, width, height, states, iterations, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: lichenGrowth(CX, CY, 395, 395, 6, 40, 5, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'dla',
    label: 'DLA',
    // dla(cx, cy, radius, particles, stickiness, cellSize, color, brushSize, opacity, palette, pressureStyle)
    strokes: dla(CX, CY, 190, 150, 0.6, 3, undefined, 3, undefined, 'inferno'),
  },
  {
    id: 'schotter',
    label: 'Schotter',
    // schotter(cx, cy, width, height, cols, rows, decay, color, brushSize, opacity, palette, pressureStyle)
    strokes: schotter(CX, CY, 300, 300, 12, 12, 1.0, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'langtons-ant',
    label: "Langton's Ant",
    // langtonsAnt(cx, cy, width, height, steps, cellSize, color, brushSize, opacity, palette, pressureStyle)
    strokes: langtonsAnt(CX, CY, 390, 390, 11000, 2, undefined, 3, undefined, 'inferno'),
  },
  {
    id: 'wave-function-collapse',
    label: 'Wave Function Collapse',
    // waveFunctionCollapse(cx, cy, width, height, tileSize, color, brushSize, opacity, palette, pressureStyle)
    strokes: waveFunctionCollapse(CX, CY, 390, 390, 30, undefined, 5, undefined, 'inferno'),
  },

  // --- 5 New Algorithms ---

  {
    id: 'vine-growth',
    label: 'Vine Growth',
    // vineGrowth(cx, cy, radius, branches, maxDepth, color, brushSize, opacity, palette, pressureStyle)
    strokes: vineGrowth(CX, CY, 185, 8, 6, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'dragon-curve',
    label: 'Dragon Curve',
    // dragonCurve(cx, cy, size, iterations, color, brushSize, opacity, palette, pressureStyle)
    strokes: dragonCurve(CX, CY, 340, 12, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'game-of-life',
    label: 'Game of Life',
    // gameOfLife(cx, cy, width, height, generations, cellSize, color, brushSize, opacity, palette, pressureStyle)
    strokes: gameOfLife(CX, CY, 390, 390, 200, 5, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'julia-set',
    label: 'Julia Set',
    // juliaSet(cx, cy, width, height, cReal, cImag, maxIter, contours, color, brushSize, opacity, palette, pressureStyle)
    strokes: juliaSet(CX, CY, 390, 390, -0.7, 0.27015, 50, 10, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'koch-snowflake',
    label: 'Koch Snowflake',
    // kochSnowflake(cx, cy, radius, depth, color, brushSize, opacity, palette, pressureStyle)
    strokes: kochSnowflake(CX, CY, 180, 5, undefined, undefined, undefined, 'inferno'),
  },

  // --- 3 New Algorithms ---

  {
    id: 'hypercube',
    label: 'Hypercube',
    // hypercube(cx, cy, size, angleXW, angleYZ, color, brushSize, opacity, palette, pressureStyle)
    strokes: hypercube(CX, CY, 150, 45, 30, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'gear',
    label: 'Gear',
    // gear(cx, cy, outerRadius, teeth, hubRadius, toothDepth, color, brushSize, opacity, palette, pressureStyle)
    strokes: gear(CX, CY, 170, 16, 60, undefined, undefined, undefined, undefined, 'inferno'),
  },
  {
    id: 'starburst',
    label: 'Starburst',
    // starburst(cx, cy, outerRadius, rays, innerRadius, shortRatio, color, brushSize, opacity, palette, pressureStyle)
    strokes: starburst(CX, CY, 185, 24, 30, undefined, undefined, undefined, undefined, 'inferno'),
  },
];

const html = `<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<title>ClawDraw Algorithm Previews</title>
<style>
  body { margin: 0; padding: 20px; background: #111; display: flex; flex-wrap: wrap; gap: 20px; }
  canvas { display: block; }
  .label { color: #aaa; font: 14px sans-serif; text-align: center; margin-top: 4px; }
</style>
</head>
<body>
${algorithms.map(a => `<div><canvas id="canvas-${a.id}" width="${SIZE}" height="${SIZE}"></canvas><div class="label">${a.label}</div></div>`).join('\n')}
<script>
const data = ${JSON.stringify(algorithms.map(a => ({ id: a.id, strokes: a.strokes })))};

for (const { id, strokes } of data) {
  const canvas = document.getElementById('canvas-' + id);
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, ${SIZE}, ${SIZE});

  for (const stroke of strokes) {
    for (let i = 1; i < stroke.points.length; i++) {
      const p0 = stroke.points[i - 1], p1 = stroke.points[i];
      const pressure = p1.pressure ?? 0.7;
      ctx.beginPath();
      ctx.moveTo(p0.x, p0.y);
      ctx.lineTo(p1.x, p1.y);
      ctx.strokeStyle = stroke.brush.color;
      ctx.globalAlpha = stroke.brush.opacity * pressure;
      ctx.lineWidth = stroke.brush.size * pressure;
      ctx.lineCap = 'round';
      ctx.stroke();
    }
  }
  ctx.globalAlpha = 1;
}
</script>
</body>
</html>`;

const outPath = '/tmp/clawdraw-previews.html';
writeFileSync(outPath, html);
console.log(`Written to ${outPath}`);
console.log(`Algorithms rendered: ${algorithms.map(a => a.id).join(', ')}`);
for (const a of algorithms) {
  const pts = a.strokes.reduce((s, st) => s + st.points.length, 0);
  console.log(`  ${a.id}: ${a.strokes.length} strokes, ${pts} total points`);
}
