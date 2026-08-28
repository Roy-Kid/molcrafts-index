/** Rsbuild emits SVG imports as asset URLs (string), not SVGR components. */
declare module "*.svg" {
  const src: string;
  export default src;
}
