import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public/brand");
const out = path.join(root, "exports");
fs.mkdirSync(out, { recursive: true });

const mark = path.join(root, "alder-mark.svg");
const logo = path.join(root, "alder-logo.svg");
const og = path.join(root, "alder-og.svg");

const iconSizes = [16, 32, 48, 64, 96, 128, 180, 192, 256, 512];

async function writePng(input, file, width, height = width) {
  await sharp(input)
    .resize(width, height, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toFile(path.join(out, file));
  console.log("wrote", file);
}

for (const size of iconSizes) {
  await writePng(mark, `alder-icon-${size}.png`, size);
}

await writePng(logo, "alder-logo-1040x320.png", 1040, 320);
await writePng(logo, "alder-logo-520x160.png", 520, 160);
await writePng(og, "alder-og-1200x630.png", 1200, 630);
await writePng(og, "alder-twitter-1200x600.png", 1200, 600);

await sharp(mark)
  .resize(32, 32)
  .png()
  .toFile(path.resolve("public/favicon-32.png"));

await sharp(mark)
  .resize(180, 180)
  .png()
  .toFile(path.resolve("public/apple-touch-icon.png"));

await sharp(mark).resize(512, 512).png().toFile(path.resolve("public/icon-512.png"));
await sharp(mark).resize(192, 192).png().toFile(path.resolve("public/icon-192.png"));

fs.copyFileSync(mark, path.resolve("public/favicon.svg"));

console.log("Brand exports ready.");
