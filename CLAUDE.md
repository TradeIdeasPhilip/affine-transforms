# CLAUDE.md

One math video (matrix multiplication / affine transforms), built on canvas-recorder-lib.
The author makes math education videos for a 3b1b / SoME audience.

## Commands

```bash
npm run dev     # Vite dev server on http://localhost:5175 (fixed port; the editor's saved state is per origin)
npm run build   # tsc + vite build → dist/ (gitignored)
```

Every push to `master` builds and publishes to GitHub Pages (`.github/workflows/deploy.yml`).  See README.md, "Publishing".

No test runner, no linter.  TypeScript errors surface in the IDE and on `npm run build`.

## Layout

- `src/main.ts` — starts the editor with `canvasRecorder.start(affineTransforms, { name: "affine-transforms" })`.
- `src/affine-transforms.ts` — the whole video, one `Showable` tree.  Formerly canvas-recorder's `src/some5/some5.ts`.
- `script.md` — the script.
- `public/` — the voiceover and other media, referred to as `"./name.m4a"`.
- `properties/` — the editor's saved state, written there so it's in git.  See `properties/README.md`.

## The library

`package.json` depends on the published `canvas-recorder-lib` from npm.  Never `file:../canvas-recorder-lib`:  GitHub's build machine has no `../`, so the deploy would fail.
The source lives at `../canvas-recorder-lib`.
It is now the master copy of the tooling: fix bugs and add features there, not in canvas-recorder, which is historical.
To try a library change here, `npm link ../canvas-recorder-lib`, and keep `npm run watch` running in the library.
Any `npm install` or `npm ci` puts the published copy back.  `npm ls canvas-recorder-lib` shows which one is in use.
Its README has notes for projects that use it.

Import the main object and common components from `canvas-recorder-lib`; anything else by path,
e.g. `canvas-recorder-lib/src/glib/path-shape`.  The paths below are inside the library.

## Coordinate System

The canvas is always **16 units wide × 9 units tall**, regardless of actual pixel dimensions. The root transform is applied before any `show()` call. All drawing uses these logical units. Never work in pixels directly.

## Core Abstraction: `Showable`

Everything renderable is a `Showable` (`src/showable.ts`): a `description` (shown in the GUI tree), a `duration` in milliseconds, and `show(options)`.

`ShowOptions` provides `context` (the `CanvasRenderingContext2D`, in 16×9 space), `timeInMs` (time within this showable, 0 → duration), and `globalTime`.

**Canvas state contract:** `fillStyle`, `strokeStyle`, `lineCap`, `lineJoin`, `lineWidth`, and the current path are disposable. `transform` and `globalAlpha` must be restored with `save()`/`restore()`.

## Composing Showables

| Class | Purpose |
| --- | --- |
| `MakeShowableInSeries` | Plays children one after another. `duration=0` children are hidden in the GUI — give them nonzero duration. |
| `MakeShowableInParallel` | Plays all children simultaneously; total duration = max of children. `duration=0` children are fine here. |
| `makeRepeater(showable, count)` | Loops a showable. `count` can be `Infinity`. |
| `addMargins(base, extra)` | Adds hidden/frozen time before or after a showable. |
| `reschedule(base, duration, offset)` | Changes duration and/or start time. |

## Key Library Modules

- `src/interpolate.ts` — `Keyframe<T>` / `timedKeyframes()`, `interpolateNumbers/Colors/Points/Rects()`, `ease`, `easeIn`, `easeOut`, `easeAndBack`.  `progress` conventionally means a number in `[0, 1]`.
- `src/stroke-colors.ts` — `strokeColors(options)` strokes a `PathShape` with multiple colors (`relativeOffset`, `repeatCount`, `colors` defaulting to `myRainbow`).
- `src/glib/path-shape.ts` — `PathShape`, `LCommand` / `QCommand` / `CCommand`, `PathBuilder`, `ParametricToPath`.
- `src/glib/transforms.ts` — `panAndZoom()`, `applyTransform()`.
- `src/glib/line-font.ts`, `src/glib/paragraph-layout.ts` — stroke-based text as `PathShape`.  The library's `internals.md` lists every available font character; check it before using non-ASCII characters.

## Pixel-Perfect Encoding Notes

- Avoid blurs, noise, and gradients — they degrade badly after HEVC encoding and YouTube compression.
- Prefer filled/stroked paths — solid objects with crisp edges survive encoding best.
- Time and space stay continuous until the last moment; never convert to pixels/frames early.

## Comments

The user likes JSDoc style comments and VS Code's "MARK:" style comments.
