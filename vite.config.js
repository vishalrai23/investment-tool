import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// IMPORTANT: base must match your GitHub repo name exactly, e.g.
// if your repo is github.com/yourname/stable-money-smartinvest-discovery,
// base stays "/stable-money-smartinvest-discovery/"
// if you rename the repo, update this line to match.
export default defineConfig({
  plugins: [react()],
  base: "/investment-tool/",
});
