import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateLlmsTxt } from "./generate-llms-txt.ts";
import { generateOgImages } from "./generate-og.ts";
import { prerenderHtml } from "./prerender-html.ts";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

const run = async () => {
  process.stdout.write("Generating OG images…\n");
  await generateOgImages(path.join(distDir, "og"));
  process.stdout.write("Prerendering per-route HTML…\n");
  prerenderHtml(distDir);
  process.stdout.write("Writing agent-readable index…\n");
  generateLlmsTxt(distDir);
  process.stdout.write("Done.\n");
};

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
