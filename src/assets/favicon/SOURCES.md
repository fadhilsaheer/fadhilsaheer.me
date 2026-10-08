# Favicon artwork

Original Pokémon artwork, mirrored by PokeAPI:

- Snorlax: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/143.png
- Pikachu: https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png

Pokémon character artwork belongs to its respective rights holders. The repository's code license does not grant ownership of these images.

The active favicon uses `pokemon-front-rig.png`, generated from these references to provide straight-on portraits and isolated paws. It is a generated adaptation, not unmodified official artwork.

`scripts/generate-favicon.mjs` uses this atlas with SVG clipping and shoulder rotation to generate the 32px PNG favicon, Apple touch icon, and a 32px-per-frame lossless WebP sprite sheet at 12.5 fps. The sprite is bundled from `src/assets/favicon/snorlax-frames.webp` with a content-hashed URL. The original reference URLs above preserve provenance; unused local reference copies and earlier drafts have been removed.
