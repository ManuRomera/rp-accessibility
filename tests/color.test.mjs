import assert from "node:assert";
import test from "node:test";
import { hexToRgb, getLuminance, getContrastRatio } from "../scripts/utils/color.js";

test("hexToRgb converts standard 6-digit hex code", () => {
  const rgb = hexToRgb("#11100e");
  assert.deepStrictEqual(rgb, { r: 17, g: 16, b: 14 });
});

test("hexToRgb converts shorthand 3-digit hex code", () => {
  const rgb = hexToRgb("#fff");
  assert.deepStrictEqual(rgb, { r: 255, g: 255, b: 255 });
});

test("getContrastRatio calculates WCAG AAA compliant contrast for RP Dark Matte theme", () => {
  const bg = "#11100e";
  const text = "#f5e6c8";
  const contrast = getContrastRatio(bg, text);
  assert.ok(contrast >= 7.0, `Contrast ratio ${contrast} should be >= 7.0 (WCAG AAA)`);
});
