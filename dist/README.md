# Sunrise Screening - Pest Control & Termite Treatment Services

## Overview

Sunrise Screening provides professional pest control, termite treatment, and wildlife exclusion services.

## Routes

- **Home**: `/` - Main landing page with service overview
- **Services**: `/services` - Detailed service offerings
- **Quote**: `/quote` - Get a free estimate
- **Contact**: `/contact` - Contact form and information
- **Portal**: `/portal` - Customer account management (authenticated)
- **Admin**: `/admin` - Admin dashboard (admin only)
- **Login**: `/login` - User authentication
- **Register**: `/register` - New account creation

## Technologies

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- Framer Motion (animations)
- Zustand (state management)
- React Router (routing)
- Supabase + Google Firestore (backends)

## Build & Deployment

The site is built via GitHub Actions and deployed to GitHub Pages:

1. On each push to `main`, the workflow builds the project
2. The `dist/` folder is deployed to GitHub Pages
3. SPA routing is handled via `404.html` redirect

## Local Development

See the main `.github/copilot-instructions.md` for setup and contribution guidelines.
