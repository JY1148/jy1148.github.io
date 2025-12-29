## 🚀 Deploy React App to GitHub Pages

This project uses **GitHub Pages** to host the production build of the React application.

---

## Step 1: Deploy the React App locally

Make sure you have installed dependencies first:

```bash
npm install
```

Then run the following command:

```bash
npm run deploy
```

This command will:

1. Build the React app using `npm run build`
2. Generate a production-ready `build/` folder
3. Push the build output to the `gh-pages` branch automatically

---

## Step 2: Make sure you have configured GitHub Pages correct

1. Go to your repository on GitHub

2. Navigate to:

   ```
   Settings → Pages
   ```

3. Set the following options:

   * **Source:** Deploy from a branch
   * **Branch:** `gh-pages`
   * **Folder:** `/ (root)`

4. Click **Save**

GitHub will take a few seconds to publish your site.

---

## Step 3: Access Your Website

Once deployment is complete, your site will be available at:

```
https://jy1148.github.io
```

If the page does not load immediately, wait 1–2 minutes and refresh.

---

## ✅ Notes

* The `main` branch contains source code
* The `gh-pages` branch contains compiled production files
* Do **not** manually edit the `gh-pages` branch