# Affine Transforms

A math video about matrix multiplication and affine transforms.
It started as an entry for #SoME5 (the Summer of Math Exposition).

- [script.md](script.md) is the script.
- [src/affine-transforms.ts](src/affine-transforms.ts) is the video.
- `public/Some 5 part 1.m4a` is the voiceover.

Built with [canvas-recorder-lib](https://github.com/TradeIdeasPhilip/canvas-recorder-lib).

## Run

```
npm install
npm run dev
```

Then open http://localhost:5175/.

This project links to the library at `../canvas-recorder-lib` (a `file:` dependency), so clone and build that next to this folder first.

## History

This video was written in [canvas-recorder](https://github.com/TradeIdeasPhilip/canvas-recorder), as `src/some5/some5.ts`.
It moved here, and its shared code moved into canvas-recorder-lib, so each video can have its own project.
