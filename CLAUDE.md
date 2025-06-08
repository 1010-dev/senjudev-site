# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Architecture Overview

This is a community website for the Senju.dev tech community built with HonoX (Hono + Vite) framework. The project follows a file-based routing pattern and is designed to be deployed on Cloudflare Pages.

**Key architectural patterns:**
- **Islands Architecture**: Interactive components are located in `app/islands/` and use client-side JavaScript
- **API Routes**: Backend logic is in `app/routes/api/` with connpass.com integration for event fetching
- **Route-based Pages**: Main pages are in `app/routes/` following HonoX conventions
- **Component Structure**: Shared UI components in `app/components/`, with TSX using Hono's JSX

**Core Features:**
- Event aggregation from connpass API with caching (30-minute cache)
- Responsive design with TailwindCSS
- SEO optimization with structured data and meta tags
- Error handling with fallback data for API failures

## Development Commands

```bash
# Start development server
npm run dev

# Build for production (client and server builds)
npm run build

# Preview production build locally
npm run preview

# Deploy to Cloudflare Pages
npm run deploy
```

## Project Structure

- `app/routes/` - File-based routing (pages and API endpoints)
- `app/islands/` - Client-side interactive components
- `app/components/` - Shared UI components
- `app/style.css` - Global styles and TailwindCSS imports
- `public/` - Static assets
- `wrangler.toml` - Cloudflare Pages configuration

## Environment Variables

- `CONNPASS_API_KEY` - Required for connpass.com API access (set in Cloudflare Pages environment)

## API Integration

The `/api/events` endpoint fetches and categorizes events from connpass.com:
- Caches responses for 30 minutes
- Separates upcoming vs past events
- Handles API failures gracefully with fallback data
- Returns CORS-enabled JSON responses

## Styling

Uses TailwindCSS v4 with custom design system:
- Blue/purple gradient theme representing the Arakawa river
- Responsive design with mobile-first approach
- Custom CSS animations for "river flow" effects
- Accessibility-focused design with proper ARIA labels and screen reader support