# 🌍 Via: Travel Footprints

> A personal, interactive travel tracker based on [hwyii/Via](https://github.com/hwyii/Via), with private local editing and optional public, read-only maps.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-19-61dafb.svg)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178c6.svg)
![MapLibre](https://img.shields.io/badge/MapLibre-GL-orange.svg)
![Vite](https://img.shields.io/badge/Vite-7-646cff.svg)

---

## 🆕 What's New

* **Transit Mode**: Mark places you have passed through separately from places you have truly visited.
* **Year & Country Stats**: Track travel years and see your visited country count at a glance.
* **U.S. National Parks**: Record and visualize your U.S. national park footprints.

---

## ✨ Key Features

* **🔒 Privacy First**: All data is stored locally in your browser (`localStorage`). No data is ever sent to a server. Your memories belong to you.
* **🌏 Smart Views**: Automatically switches between **World**, **China**, **USA**, and **U.S. National Parks** views.
* **🚆 Transit Tracking**: Distinguish between places you visited and places you only passed through.
* **📊 Travel Stats**: See your visited country count and year-based travel summary.
* **🏷️ Multi-Tag System**: Create and manage multiple tags (e.g., "Me", "Couple", "Family"). Toggle between them to see different sets of footprints.
* **💾 Backup & Restore**: Export your data as a JSON file. Share your footprints with friends or sync between devices by simply uploading the backup file.
* **⚡️ Instant Search**: Integrated global geocoding allows you to search for any city and fly there instantly.

---

## 📸 Screenshots

### 1. World View
![World View](./figure/world-view.png)

### 2. Focused View (e.g., China/USA)
![Region View](./figure/region-view.png)
![Region View](./figure/usa-view.png)

---

## 🌐 Publish and Embed Your Map

The app supports a public, read-only map backed by `public/footprints.json`:

* [`/`](https://zilong-via.vercel.app/) keeps the original editable, browser-local experience.
* [`/?public=1`](https://zilong-via.vercel.app/?public=1) opens the full public, read-only map with summary statistics.
* [`/?embed=1`](https://zilong-via.vercel.app/?embed=1) opens a compact, read-only map for the homepage iframe. It keeps map controls, region switching, flags, and a small view-specific stats label.

To update the public map, export a backup from the editable app, replace
`public/footprints.json` with that file, and commit and push the change. The
public modes accept both the original array backup format and the newer
versioned `{ "version", "tags", "trips" }` format.

Published modes request the JSON directly from the `main` branch on GitHub and
fall back to the copy bundled with the Vercel deployment if GitHub is
temporarily unavailable. They do not read or overwrite the editable version's
trip data in `localStorage`.

## 🚀 Getting Started

### Option 1: Use Online (Recommended for Users)

If you just want to use the tool without coding:

Open **[Zilong's Travel Footprints](https://zilong-via.vercel.app/)**.

1.  Open the link.
2.  Click the **+** button at the bottom right.
3.  Search for a city and click **Add**.
4.  **Backup**: Click the **Backup** button (top-left) to download your data.
5.  **Share**: Send the link and the JSON file to your friends. They can view your footprints by clicking **Restore**.

### Option 2: Self-Hosted (Deploy Your Own)

If you want your own personal link or wish to modify the code, you can deploy the app to Vercel, EdgeOne Pages, or any static hosting platform that supports Vite builds.

#### 1. Fork this Repository
Click the **Fork** button at the top right of this page to copy the code to your GitHub account.

#### 2. Deploy to Vercel
Click the button below to deploy your forked repository. No server configuration required.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/)

#### 3. Deploy to EdgeOne Pages
EdgeOne Pages is a good option for users in mainland China. Import your GitHub repository in the EdgeOne Pages console and use the following build settings:

```txt
Framework: Vite / React
Install Command: npm install
Build Command: npm run build
Output Directory: dist
Root Directory: /
```

#### 4. Updates
Whenever you push changes to your GitHub repository, Vercel or EdgeOne Pages can automatically redeploy your site.

### Option 3: Local Development

For developers who want to contribute or modify features:

```bash
# 1. Clone the repository
git clone git@github.com:zilong7832/Via.git

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
