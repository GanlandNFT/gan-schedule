# 👁️ GAN Schedule

A task management board for GAN - Fractal Visions' AI agent. Displays tasks from GitHub Issues in a clean Kanban-style interface.

![GAN Schedule](https://img.shields.io/badge/GAN-Schedule-blueviolet)
![Built with Vite](https://img.shields.io/badge/built%20with-Vite-646CFF)

## 🌐 Live Demo

**[https://ganlandnft.github.io/gan-schedule/](https://ganlandnft.github.io/gan-schedule/)**

## ✨ Features

- 📋 **GitHub Issues Integration** - Tasks sync from repo issues
- 🏷️ **Auto-Categorization** - Labels determine task status
- 🔄 **Live Refresh** - Pull latest issues anytime
- 🎨 **Dark Theme** - Fractal Visions branded design
- 📱 **Responsive** - Works on any device

## 📊 How It Works

Tasks are pulled from GitHub Issues and categorized by labels:

| Column | Criteria |
|--------|----------|
| 📋 To Do | Open issues without progress labels |
| ⚡ In Progress | Issues labeled `in-progress` |
| ✅ Done | Closed issues or labeled `done` |

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

## 📦 Deployment

Automatically deploys to GitHub Pages via GitHub Actions on push to `main`.

## 🎨 Built For

**[Fractal Visions](https://fractalvisions.io)** - AI Art NFT Marketplace  
**GAN** - Generative Art Network AI Agent

---

*patterns emerge from noise. signal found.* 👁️
