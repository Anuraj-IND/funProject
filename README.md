# For Simran ❤️ — Valentine's Week

A private romantic website for Valentine's Week, one page per day. Pages unlock by date (Indian Standard Time). Admin mode unlocks all days with a password.

## Run locally

```bash
npm install
npm run dev
```

Open the URL shown (e.g. http://localhost:5173).

## Build

```bash
npm run build
npm run preview
```

The built site is in the `dist/` folder. Use `npm run preview` to test it locally.

## Deploy

The app is a static site (HTML, CSS, JS). Deploy the `dist/` folder to any static host. No backend or env vars are required.

### Option 1: Vercel (recommended)

1. Push your project to **GitHub** (create a repo and push).
2. Go to [vercel.com](https://vercel.com), sign in with GitHub.
3. Click **Add New → Project**, import your repo.
4. Leave **Build Command** as `npm run build` and **Output Directory** as `dist`.
5. Click **Deploy**. You’ll get a URL like `https://your-project.vercel.app`.

To update the site, push to GitHub; Vercel will redeploy automatically.

### Option 2: Netlify

1. Push your project to **GitHub**.
2. Go to [netlify.com](https://netlify.com), sign in, **Add new site → Import an existing project**.
3. Connect GitHub and choose the repo.
4. Set **Build command**: `npm run build`, **Publish directory**: `dist`.
5. Click **Deploy**. You’ll get a URL like `https://your-site.netlify.app`.

### Option 3: GitHub Pages

1. Push the project to a GitHub repo.
2. In the repo: **Settings → Pages**.
3. Under **Build and deployment**, choose **GitHub Actions**.
4. Create `.github/workflows/deploy.yml` in the repo with:

```yaml
name: Deploy to GitHub Pages
on:
  push:
    branches: [main]
permissions:
  contents: read
  pages: write
  id-token: write
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          cache: npm
      - run: npm ci
      - run: npm run build
      - uses: actions/upload-pages-artifact@v3
        with:
          path: dist
  deploy:
    needs: build
    runs-on: ubuntu-latest
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    steps:
      - id: deployment
        uses: actions/deploy-pages@v4
```

5. If the site is at `https://username.github.io/repo-name/`, set **base** in `vite.config.js`:

```js
export default defineConfig({
  plugins: [react()],
  base: '/repo-name/',
})
```

Replace `repo-name` with your repo name. Then the site will be at `https://<username>.github.io/<repo-name>/`.

---

After deploying, share the URL with Simran. The site will unlock days by date (IST) with no extra setup.

## Features

- **8 days**: Rose, Propose, Chocolate, Teddy, Promise, Hug, Kiss, Valentine's Day
- **Unlock by date**: Uses Indian time (IST). Past and today’s pages are open; future days show “Coming Soon”.
- **Admin / Preview**: Click “Admin” (bottom-right), enter password to unlock all days.
  - **Password**: `simran2025` (set in `src/data/days.js` as `ADMIN_PASSWORD`)
- **Background music**: Optional. Set `MUSIC_URL` in `src/components/MusicToggle.jsx` to an MP3 URL to show the music toggle (bottom-left).

## Customize

- **Nickname**: “Simran” is used in the copy; search for `Simran` or `NICKNAME` in the code to change.
- **Admin password**: Edit `ADMIN_PASSWORD` in `src/data/days.js`.
- **Music**: Set `MUSIC_URL` in `src/components/MusicToggle.jsx` for the toggle to appear.
- **Rose GIF**: The rose on the homepage and Rose Day uses a GIF. Add your own by placing a file at **`public/rose.gif`** (e.g. download a blooming-rose GIF from [LottieFiles](https://lottiefiles.com/free-animations/rose), [Giphy](https://giphy.com/search/rose-bloom), or [gifs.cc](https://www.gifs.cc/flowers.shtml) and save it as `rose.gif` in the `public` folder). If the file is missing, a rose emoji is shown instead.

Tech: React, Vite, React Router. No backend.
