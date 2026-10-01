# Your Next Big Thing

Lightweight static podcast website for Gen X, with dedicated Episodes, About, Resources, Contact, and episode detail pages.

## Netlify

No build command or dependencies. Publish the repository root. `netlify.toml` sets this automatically.

Enable Netlify form detection and redeploy to register the `contact` form. Enable submission notifications in Netlify if you want emails about new messages. The form includes a honeypot and a dedicated thank-you page. No test submission has been sent.

## Content

Edit `index.html` for the homepage, subfolder `index.html` files for each page, `style.css` for presentation, and `app.js` for the episode list and topic filters. Audio/video players load when opened on the episode listing. Original logo and optimized host photos are in `assets/`.

## Newsletter

Newsletter signup still links to the existing Squarespace form. Connect the chosen email platform before retiring that form. Resource recommendations and host bios are now included locally. Original book affiliate links are preserved with a disclosure.

## Preview

The ChatGPT preview intentionally blocks contact form submission and points visitors to the team email. Netlify handles contact submissions after form detection is enabled.
