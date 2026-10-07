# DREAMFRAME

AI image generator landing and studio UI for the Dream Factory app.

## Live

| Item | URL |
|------|-----|
| Production | https://dreamfactory-app.vercel.app |
| GitHub | https://github.com/silverbruce37-bruce/dreamfactory-app |

`main` deploys on Vercel.

## Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run build
```

## Routes

| Path | What |
|------|------|
| `/` | DreamFrame hero, logo carousel, bento studio, 3D model creator |
| `/create` | Studio (image + 3D) |
| `/programs` | Existing Dream Factory growth-program catalog |

## Notes

- The repo was a static catalog. DreamFrame now runs on Next.js App Router; the catalog lives at `/programs` (`public/catalog`).
- Scroll-linked frame animation is **not** implemented: `public/frames_150.zip` and `frame-001.png`–`frame-150.png` are not in the repo.
- The “Create Your Video” block in the Notion brief is a video prompt, not a UI task, and was parked.

## Design

Dark futuristic hero with purple/violet accents, oversized **DREAMFRAME** wordmark, then cosmic carousel + bento. The 3D Model Creator section uses a light-gray stage.
