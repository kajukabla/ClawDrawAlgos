/**
 * CI validation script for community algorithm PRs.
 * Checks METADATA, exports, stroke limits, and import restrictions.
 *
 * Usage: node .github/validate.mjs primitives/my-algo.mjs [primitives/another.mjs ...]
 */

import { readFile } from 'node:fs/promises';
import { pathToFileURL } from 'node:url';
import { resolve } from 'node:path';

const MAX_STROKES = 200;
const MAX_POINTS_PER_STROKE = 5000;
const MAX_FILE_SIZE = 50 * 1024; // 50KB

const files = process.argv.slice(2).filter(f => f.trim());
if (files.length === 0) {
  console.log('No algorithm files to validate.');
  process.exit(0);
}

let failed = false;

function fail(file, msg) {
  console.error(`FAIL [${file}]: ${msg}`);
  failed = true;
}

function pass(file, msg) {
  console.log(`  OK [${file}]: ${msg}`);
}

for (const file of files) {
  console.log(`\nValidating ${file}...`);
  const absPath = resolve(file);

  // --- Check file size ---
  const source = await readFile(absPath, 'utf-8');
  const sizeBytes = Buffer.byteLength(source, 'utf-8');
  if (sizeBytes > MAX_FILE_SIZE) {
    fail(file, `File too large: ${sizeBytes} bytes (max ${MAX_FILE_SIZE})`);
    continue;
  }
  pass(file, `Size OK (${sizeBytes} bytes)`);

  // --- Check imports are only from ./helpers.mjs ---
  const importMatches = source.matchAll(/from\s+['"]([^'"]+)['"]/g);
  for (const m of importMatches) {
    const importPath = m[1];
    if (importPath !== './helpers.mjs') {
      fail(file, `Forbidden import: "${importPath}" (only ./helpers.mjs allowed)`);
    }
  }

  // --- Dynamic import ---
  let mod;
  try {
    mod = await import(pathToFileURL(absPath).href);
  } catch (err) {
    fail(file, `Import failed: ${err.message}`);
    continue;
  }

  // --- Check METADATA export ---
  if (!mod.METADATA) {
    fail(file, 'Missing METADATA export');
    continue;
  }

  const meta = mod.METADATA;
  const requiredFields = ['name', 'description', 'category', 'author', 'parameters'];
  for (const field of requiredFields) {
    if (!meta[field]) {
      fail(file, `METADATA missing required field: ${field}`);
    }
  }

  if (meta.category !== 'community') {
    fail(file, `METADATA.category must be 'community', got '${meta.category}'`);
  }

  if (typeof meta.name !== 'string' || !/^[a-z][a-zA-Z0-9]*$/.test(meta.name)) {
    fail(file, `METADATA.name must be camelCase, got '${meta.name}'`);
  }

  pass(file, `METADATA OK (name: ${meta.name}, author: ${meta.author})`);

  // --- Check named function export ---
  if (typeof mod[meta.name] !== 'function') {
    fail(file, `Missing named function export: ${meta.name}`);
    continue;
  }
  pass(file, `Function export "${meta.name}" found`);

  // --- Run the function with default-ish args ---
  let strokes;
  try {
    strokes = mod[meta.name](0, 0);
  } catch (err) {
    fail(file, `Function threw with default args (0, 0): ${err.message}`);
    continue;
  }

  if (!Array.isArray(strokes)) {
    fail(file, `Function must return an array, got ${typeof strokes}`);
    continue;
  }

  // --- Check stroke count ---
  if (strokes.length > MAX_STROKES) {
    fail(file, `Too many strokes: ${strokes.length} (max ${MAX_STROKES})`);
  } else {
    pass(file, `Stroke count OK (${strokes.length})`);
  }

  // --- Check stroke format ---
  for (let i = 0; i < strokes.length; i++) {
    const s = strokes[i];
    if (!s.id || !s.points || !s.brush || !s.createdAt) {
      fail(file, `Stroke ${i} missing required fields (id, points, brush, createdAt). Use makeStroke().`);
      break;
    }
    if (s.points.length > MAX_POINTS_PER_STROKE) {
      fail(file, `Stroke ${i} has ${s.points.length} points (max ${MAX_POINTS_PER_STROKE}). Use splitIntoStrokes().`);
      break;
    }
  }

  if (!failed) {
    pass(file, `All stroke objects valid`);
  }
}

console.log('');
if (failed) {
  console.error('Validation FAILED. See errors above.');
  process.exit(1);
} else {
  console.log('All validations passed.');
}
