# Render & Vercel Deployment Guide

- **Identity Token:** `<24b3020>`
- **Repository:** `et617-endsem-24b3020`
- **Application:** Adaptive Percentage PAL with Teacher-in-the-Loop Supervision

---

## 1. Architecture Choice: Static Site (Zero-Dependency)

This project is built as a pure Vanilla HTML5/CSS3/ES6 Single-Page Application (SPA).
- **No Node build step required**
- **No fragile npm dependency chain**
- **Zero cold-start delay**
- **100% offline-first execution with deterministic math and client-side reactive store**

---

## 2. Vercel Deployment (Recommended)

1. Push this repository to GitHub: `https://github.com/<username>/et617-endsem-24b3020`.
2. Log into **Vercel** (`https://vercel.com`).
3. Click **Add New...** → **Project** → Import `et617-endsem-24b3020`.
4. Configure Project settings:
   - **Framework Preset:** `Other`
   - **Root Directory:** `./`
   - **Build Command:** *(Leave blank)*
   - **Output Directory:** `./`
5. Click **Deploy**.
6. The app will be live instantly at `https://et617-24b3020.vercel.app` (or your assigned Vercel URL).

---

## 3. Render Static Site Deployment

1. Log into **Render** (`https://render.com`).
2. Dashboard → **New +** → **Static Site**.
3. Connect your repository `et617-endsem-24b3020`, branch `main`.
4. Configure:
   - **Name:** `et617-endsem-24b3020`
   - **Branch:** `main`
   - **Build Command:** `echo "no build needed"` (or leave empty)
   - **Publish Directory:** `.`
5. Click **Create Static Site**.
6. Once live, your URL will be `https://et617-endsem-24b3020.onrender.com`.

---

## 4. SPA Rewrite Rules (Vercel & Render)

Since all navigation is managed client-side within `index.html`, direct URL refreshes work out of the box with `index.html` at the root.

---

## 5. Local Testing

To run locally without installing any dependencies:
- **Python 3:** `python -m http.server 3000`
- Or use any static file server, or open `index.html` directly in a browser.
