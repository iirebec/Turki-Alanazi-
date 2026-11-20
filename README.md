# My Portfolio

A plain HTML, CSS and JavaScript site. It has no build step and nothing to install, so it will keep working.

## How to edit
Edit **only `content.js`**. It holds your name, bio, projects, skills and experience.

- **Add a project:** copy one `{ ... }` block inside `projects`, paste it, and change the text.
- **Add an image:** put it in `assets/projects/` and set `image: "assets/projects/your-file.jpg"`. Simulation screenshots, plots and PVsyst/HOMER result charts all work well.
- **Add your photo:** save it as `assets/me.jpg` and set `photo: "assets/me.jpg"`.
- **Add your CV:** save it as `assets/cv.pdf`.
- **Change the colour:** edit `--accent` at the top of `style.css`.

To preview, double-click `index.html` and it opens in your browser.

## Put it online for free (GitHub Pages)
1. Create a free account at github.com.
2. Create a new public repository named `yourusername.github.io`.
3. Click **Add file → Upload files** and drag in everything from this folder.
4. Go to **Settings → Pages**, set **Source: Deploy from a branch** and choose the **main** branch, then click Save.
5. After about a minute your site is live at `https://yourusername.github.io`.

To update the site later, upload your new `content.js` on GitHub (or edit it right on github.com with the ✏️ button).
