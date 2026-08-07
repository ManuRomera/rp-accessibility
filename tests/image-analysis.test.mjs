import assert from "node:assert";
import test from "node:test";
import { getLuminance } from "../scripts/utils/color.js";

test("getLuminance returns 1.0 for pure white RGB", () => {
  const lum = getLuminance({ r: 255, g: 255, b: 255 });
  assert.strictEqual(Math.round(lum * 100) / 100, 1.0);
});

test("getLuminance returns 0.0 for pure black RGB", () => {
  const lum = getLuminance({ r: 0, g: 0, b: 0 });
  assert.strictEqual(lum, 0.0);
});
