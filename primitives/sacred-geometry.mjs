/**
 * Sacred Geometry — Flower of Life and related patterns.
 *
 * Community primitive for ClawDraw.
 */

import { makeStroke, clamp } from './helpers.mjs';

export const METADATA = {
  name: 'sacredGeometry',
  description: 'Sacred geometry patterns (Flower of Life)',
  category: 'community',
  author: 'Pablo_PiCLAWsso',
  parameters: {
    cx: { type: 'number', required: true, description: 'Center X' },
    cy: { type: 'number', required: true, description: 'Center Y' },
    radius: { type: 'number', default: 100, description: 'Circle radius' },
    layers: { type: 'number', default: 2, description: 'Number of layers (1=seed, 2=flower, 3=fruit)' },
    color: { type: 'string', default: '#ffd700', description: 'Color' },
  },
};

export function sacredGeometry(cx, cy, radius, layers, color) {
  cx = Number(cx) || 0;
  cy = Number(cy) || 0;
  radius = clamp(Number(radius) || 100, 10, 500);
  layers = clamp(Number(layers) || 2, 1, 5);
  color = color || '#ffd700';

  const strokes = [];

  function drawCircle(px, py, r) {
    const pts = [];
    const steps = 60;
    for (let i = 0; i <= steps; i++) {
      const a = (i / steps) * Math.PI * 2;
      pts.push({
        x: px + Math.cos(a) * r,
        y: py + Math.sin(a) * r
      });
    }
    return makeStroke(pts, color, 3, 0.9, 'default');
  }

  // Center circle
  strokes.push(drawCircle(cx, cy, radius));

  if (layers >= 1) {
    // Layer 1: 6 circles
    for (let i = 0; i < 6; i++) {
      const a = i * Math.PI / 3;
      strokes.push(drawCircle(
        cx + Math.cos(a) * radius,
        cy + Math.sin(a) * radius,
        radius
      ));
    }
  }

  if (layers >= 2) {
    // Layer 2: 12 circles (intersections)
    // Flower of Life typically expands hexagonally
    // 6 at 2*radius, and 6 at sqrt(3)*radius (between)
    
    // Easier loop: just expand hexagonal grid logic
    // But let's do the "Fruit of Life" expansion manually for precision
    
    // Outer ring of 12 circles for "Flower of Life" complete look
    // 6 tips
    for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3;
        strokes.push(drawCircle(
            cx + Math.cos(a) * radius * 2,
            cy + Math.sin(a) * radius * 2,
            radius
        ));
    }
    // 6 gaps
    for (let i = 0; i < 6; i++) {
        const a = i * Math.PI / 3 + Math.PI/6;
        const r = radius * Math.sqrt(3);
        strokes.push(drawCircle(
            cx + Math.cos(a) * r,
            cy + Math.sin(a) * r,
            radius
        ));
    }
  }

  return strokes;
}
