# Stable Money — SmartInvest Discovery

Investment discovery tool UI (FDs, bonds/NCDs, gold & silver funds) — React + Vite, deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev
```

## Push to GitHub and deploy

1. Create a new **public** repo on GitHub named `stable-money-smartinvest-discovery`
   (or any name — if different, update `base` in `vite.config.js` to match).

2. From this project folder:

```bash
git init
git add .
git commit -m "Initial commit: SmartInvest Discovery"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/stable-money-smartinvest-discovery.git
git push -u origin main
```

3. In the GitHub repo settings: **Settings → Pages → Source → GitHub Actions**.
   The included workflow (`.github/workflows/deploy.yml`) builds and deploys
   automatically on every push to `main`.

4. Your site will be live at:
   `https://YOUR_USERNAME.github.io/stable-money-smartinvest-discovery/`

## Before you push — worth a second look

This file embeds specific product figures (FD rates, bond yields, fund NAVs/AUM)
attributed to Stable Money as distributor. If these numbers came from an internal
pricing feed rather than a public rate sheet, treat this repo as you would any
other release of business data — check with whoever owns that data before it
goes public and permanent in git history.

## Notes

- If you rename the repo, `vite.config.js`'s `base` field must match exactly,
  or all assets will 404 on Pages.
- First deploy can take 1–2 minutes after the Actions workflow completes.
