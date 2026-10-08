import sharp from "sharp";

// Original raster artwork is retained; 48px provides 3× density for 16px logos.
for (const name of ["log-horizon", "openvia"]) {
  await sharp(new URL(`../public/projects/${name}.png`, import.meta.url).pathname)
    .resize(48, 48)
    .webp({ quality: 90 })
    .toFile(new URL(`../public/projects/${name}.webp`, import.meta.url).pathname);
}
