import { mkdir } from "node:fs/promises";
import sharp from "sharp";

const output = new URL("../public/", import.meta.url);
const size = 128;
const framesPerCharacter = 100;
const ease = (t) => (1 - Math.cos(Math.PI * Math.max(0, Math.min(1, t)))) / 2;

// Front-facing portraits and separate paws share one generated, transparent atlas.
const source = new URL(
  "../src/assets/favicon/pokemon-front-rig.png",
  import.meta.url,
);
const regions = {
  snorlax: {
    body: { left: 25, top: 70, width: 670, height: 604 },
    paw: { left: 225, top: 738, width: 280, height: 478 },
    bodyPlacement: { x: -4, y: 10, width: 128, height: 116 },
    pawPlacement: { x: 87, y: 73, width: 25, height: 43 },
  },
  pikachu: {
    body: { left: 665, top: 55, width: 565, height: 619 },
    paw: { left: 830, top: 798, width: 255, height: 411 },
    bodyPlacement: { x: 0, y: 0, width: 118, height: 130 },
    pawPlacement: { x: 86, y: 79, width: 24, height: 39 },
  },
};
const artwork = {};
for (const [name, config] of Object.entries(regions)) {
  artwork[name] = {};
  for (const layer of ["body", "paw"]) {
    const bytes = await sharp(source.pathname)
      .extract(config[layer])
      .png()
      .toBuffer();
    artwork[name][layer] = `data:image/png;base64,${bytes.toString("base64")}`;
  }
}

function portrait(character, offset = 0, raised = 0, wave = 0) {
  const config = regions[character];
  const body = config.bodyPlacement;
  const paw = config.pawPlacement;
  const angle = 170 * (1 - raised) + wave;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 128 128">
    <defs><clipPath id="body"><path d="${character === "snorlax" ? "M0 0 H114 V84 L128 103 V128 H0Z" : "M0 0 H128 V128 H8 V88 H0Z"}"/></clipPath></defs>
    <g transform="translate(0 ${offset * 2})">
      <g clip-path="url(#body)"><image x="${body.x}" y="${body.y}" width="${body.width}" height="${body.height}" preserveAspectRatio="none" href="${artwork[character].body}"/></g>
      <g opacity="${ease(raised / 0.3)}" transform="rotate(${angle} 91 111)"><image x="${paw.x}" y="${paw.y}" width="${paw.width}" height="${paw.height}" preserveAspectRatio="none" href="${artwork[character].paw}"/></g>
    </g>
  </svg>`;
}

await mkdir(new URL("favicons/", output), { recursive: true });
const resting = portrait("snorlax");
await sharp(Buffer.from(resting))
  .resize(size, size)
  .png()
  .toFile(new URL("favicon.png", output).pathname);
await sharp(Buffer.from(resting))
  .resize(180, 180)
  .png()
  .toFile(new URL("apple-touch-icon.png", output).pathname);

const frames = [];
for (const character of ["snorlax", "pikachu"]) {
  for (let frame = 0; frame < framesPerCharacter; frame++) {
    // 25 fps: arrive with the paw down, pause, lift, wave, lower, pause, exit.
    const offset =
      frame < 14 ? 66 * (1 - ease(frame / 14)) : 66 * ease((frame - 82) / 12);
    const lift = ease((frame - 20) / 12);
    const lower = ease((frame - 62) / 12);
    const wavePhase = Math.max(0, Math.min(1, (frame - 34) / 26));
    const wave =
      Math.sin(wavePhase * Math.PI * 4) * Math.sin(wavePhase * Math.PI) * 15;
    const raised = lift - lower;
    frames.push(
      await sharp(Buffer.from(portrait(character, offset, raised, wave)))
        .resize(size, size)
        .png()
        .toBuffer(),
    );
  }
}
await sharp({
  create: {
    width: size * frames.length,
    height: size,
    channels: 4,
    background: "#00000000",
  },
})
  .composite(
    frames.map((input, index) => ({ input, left: index * size, top: 0 })),
  )
  .png()
  .toFile(new URL("favicons/snorlax-frames.png", output).pathname);
