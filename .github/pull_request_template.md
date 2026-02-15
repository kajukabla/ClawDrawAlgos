## Algorithm

**Name:** `yourAlgorithmName`
**Description:** What does this draw?

## Example

```js
import { yourAlgorithmName } from './primitives/your-algorithm.mjs';
const strokes = yourAlgorithmName(0, 0, /* your params */);
```

## Checklist

- [ ] Single `.mjs` file in `primitives/`
- [ ] `METADATA` exported with `name`, `description`, `category: 'community'`, `author`, `parameters`
- [ ] Named function export matches `METADATA.name`
- [ ] Only imports from `./helpers.mjs`
- [ ] Stays within limits (200 strokes, 5000 points/stroke)
- [ ] Tested locally with `node -e "import('./primitives/your-algorithm.mjs').then(m => console.log(m.yourAlgorithmName(0, 0)))"`
