# EditKaro.in – Website

A complete static website for EditKaro.in, a video editing & social media marketing agency.

## Pages
- `index.html` – Home (hero, stats, services, process, portfolio preview, email subscription, testimonials)
- `portfolio.html` – Filterable portfolio with 9 categories
- `about.html` – Story, mission/vision, team members
- `contact.html` – Contact form with service selector

## Quick Start (Local)
Just open `index.html` in any browser. No build step required.

## Google Sheets Integration Setup

### Step 1 – Create Google Sheet
1. Go to [sheets.google.com](https://sheets.google.com) → New
2. Copy the Sheet ID from the URL: `docs.google.com/spreadsheets/d/**SHEET_ID**/edit`

### Step 2 – Deploy Apps Script
1. Go to [script.google.com](https://script.google.com) → New project
2. Paste contents of `google-apps-script.js`
3. Replace `YOUR_GOOGLE_SHEET_ID_HERE` with your actual Sheet ID
4. Click **Deploy → New deployment → Web app**
   - Execute as: **Me**
   - Who has access: **Anyone**
5. Copy the Web App URL

### Step 3 – Connect to the Website
In `js/main.js`, replace both occurrences of:
```
https://script.google.com/macros/s/YOUR_SCRIPT_ID_HERE/exec
```
with your actual Web App URL.

## Deployment

### Netlify (Recommended)
1. Push code to GitHub
2. Go to [netlify.com](https://netlify.com) → Import from Git
3. Select your repo → Deploy (no build command needed)

### GitHub Pages
1. Push to GitHub repo
2. Settings → Pages → Branch: main → Root (/)
3. Your site: `https://yourusername.github.io/editkaro/`

### Vercel
1. `npm i -g vercel`
2. Run `vercel` in project folder → follow prompts

## File Structure
```
editkaro/
├── index.html
├── portfolio.html
├── about.html
├── contact.html
├── css/
│   └── style.css
├── js/
│   └── main.js
├── google-apps-script.js   ← Deploy this to Google Apps Script
└── README.md
```

## Features
- ✅ Fully responsive (mobile/tablet/desktop)
- ✅ Portfolio filter with 9 categories
- ✅ Counter animation on stats
- ✅ Scroll fade-in animations
- ✅ Email subscription form (Google Sheets ready)
- ✅ Contact form (Google Sheets ready)
- ✅ SEO meta tags on all pages
- ✅ Sticky nav with scroll effect
- ✅ Mobile burger menu
- ✅ Zero dependencies (no frameworks needed)
