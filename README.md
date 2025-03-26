# iTunes Top Albums Viewer

A Vue 3 application for browsing iTunes Top Albums with advanced filtering, sorting, and search capabilities. Built as part of the Wizcode recruitment process.

![image](https://github.com/user-attachments/assets/d481984e-fc12-4025-aae6-b5418f1b65f1)

## Features

- View top 100 albums from iTunes RSS feed
- Filter albums by music category (Rock, Pop, Jazz)
- Multiple sorting options:
  - Default iTunes ranking
  - Album name
  - Artist name
  - Release date
- Search across album titles and artist names
- Responsive design with mobile optimization
- Smooth animations and 3D hover effects (desktop)
- Comprehensive E2E testing with Playwright

## Technologies Used

- 🚀 Vue 3 Composition API
- ⚡ Vite 6.x
- 🎨 Tailwind CSS 4.x
- 🧪 Playwright 1.51 for testing
- 📦 TypeScript 5.7
- ✨ Atropos 3D hover effects
- 🐳 Docker containerization

## Installation

```bash
# Clore repository
git clone https://github.com/[your-repo]/wizcode-recruitment-app.git

# Go to project
cd wizcode-recruitment-app

# Install dependecies
npm ci
```

## Development

```bash
# Start dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Format code
npm run format
```

## Testing

Tests run in Chromium, Firefox and WebKit browsers

```bash
npm run test:e2e
```

## Deployment

```bash
# Create .env file
cp .env.example .env

# Edit .env file
nano .env # or use your favorite text editor

# Build and run Docker container
docker-compose up -d --build
```

Configured with:

- Traefik reverse proxy
- Automatic HTTPS certificates
- Secure network isolation
- Container port mapping (3000 → 443)

---

Created by Adrian Wieprzkowicz as part of the Wizcode recruitment process
