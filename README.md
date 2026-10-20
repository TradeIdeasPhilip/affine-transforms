# Affine Transforms

A math video about matrix multiplication and affine transforms.
It started as an entry for #SoME5 (the Summer of Math Exposition).

**[Open it in the video editor](https://tradeideasphilip.github.io/affine-transforms/)**

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

## Working on canvas-recorder-lib at the same time

`package.json` uses the published library from npm.  To try out a local copy instead:

```
npm link ../canvas-recorder-lib    # here
npm run watch                      # in canvas-recorder-lib
```

`npm ls canvas-recorder-lib` shows `-> ./../canvas-recorder-lib` while the link is active.
Any later `npm install` or `npm ci` puts the published copy back.
See the library's README, [Working on the library at the same time](https://github.com/TradeIdeasPhilip/canvas-recorder-lib#working-on-the-library-at-the-same-time).

## Publishing

Every push to `master` builds the site and publishes it to GitHub Pages, using
[.github/workflows/deploy.yml](.github/workflows/deploy.yml). The compiled output is never committed:
`dist/` is in `.gitignore`, and the Actions run builds a fresh copy each time. To redeploy without a
new commit, use **Actions → Deploy to GitHub Pages → Run workflow**.

One-time setup: in the GitHub repo, **Settings → Pages → Build and deployment → Source: GitHub Actions**.
Do that before the first push, or the first deploy fails with "Get Pages site failed … Not Found".
If that happens, change the setting, then **Re-run all jobs**.

`npm run build` also runs `tsc`, so a type error fails the deploy and the live site keeps the last
good version.

## History

This video was written in [canvas-recorder](https://github.com/TradeIdeasPhilip/canvas-recorder), as `src/some5/some5.ts`.
It moved here, and its shared code moved into canvas-recorder-lib, so each video can have its own project.
