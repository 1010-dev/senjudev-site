# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

千住エリア＆足立区の技術者コミュニティ「senju.dev」の公式サイト。北千住を拠点とする技術者を繋ぐコミュニティプラットフォームです。

**主な機能:**
- **イベント & コミュニティハブ**: connpass で散らばるイベント情報を一箇所で管理
- **ローカル Tech ブログ**: Pull Request ベースの技術記事投稿（予定）

## Architecture Overview

This is a community website for the Senju.dev tech community built with HonoX (Hono + Vite) framework. The project follows a file-based routing pattern and is designed to be deployed on Cloudflare Pages.

**Key architectural patterns:**
- **Islands Architecture**: Interactive components are located in `app/islands/` and use client-side JavaScript
- **API Routes**: Backend logic is in `app/routes/api/` with connpass.com integration for event fetching
- **Route-based Pages**: Main pages are in `app/routes/` following HonoX conventions
- **Component Structure**: Shared UI components in `app/components/`, with TSX using Hono's JSX
- **Type Safety**: TypeScript with strict mode enabled for all `.ts` and `.tsx` files

**Core Features:**
- Event aggregation from connpass API with caching (30-minute cache)
- Responsive design with TailwindCSS v4
- SEO optimization with structured data and meta tags
- Error handling with fallback data for API failures
- CORS-enabled API endpoints

## Technical Stack

- **Framework**: [HonoX v0.1.40](https://github.com/honojs/honox) (Hono v4.7.10 + Vite v6.1.1)
- **Styling**: [TailwindCSS v4.1.7](https://tailwindcss.com/) with PostCSS
- **Runtime**: [Cloudflare Workers](https://workers.cloudflare.com/) with Node.js compatibility
- **Hosting**: [Cloudflare Pages](https://pages.cloudflare.com/)
- **Build Tools**: Vite with custom configuration for client/server builds
- **Language**: TypeScript (ESNext target, Bundler module resolution)

## Development Requirements

- Node.js 18.0.0 or higher
- npm (package manager)
- Wrangler CLI (installed as dev dependency)

## Development Commands

```bash
# Install dependencies
npm install

# Start development server (default port 5173)
npm run dev

# Build for production (client and server builds)
npm run build

# Preview production build locally using Wrangler
npm run preview

# Deploy to Cloudflare Pages
npm run deploy

# The build process includes:
# 1. Client build (vite build --mode client)
# 2. Server build (vite build)
# 3. Copy public assets (cp -r public/* dist/static/)
```

## Project Structure

- `app/routes/` - File-based routing (pages and API endpoints)
- `app/islands/` - Client-side interactive components
- `app/components/` - Shared UI components
- `app/style.css` - Global styles and TailwindCSS imports
- `public/` - Static assets (copied to `dist/static/` on build)
- `wrangler.toml` - Cloudflare Pages configuration
- `vite.config.ts` - Vite configuration with HonoX plugins
- `tsconfig.json` - TypeScript configuration with JSX support

## Environment Variables

- `CONNPASS_API_KEY` - Optional but recommended for connpass.com API access (set in Cloudflare Pages environment). Falls back to public API access if not provided.

## API Integration

The `/api/events` endpoint fetches and categorizes events from connpass.com:
- Fetches events from group_id=11169 (Senju.dev community)
- Caches responses for 30 minutes using Hono's cache middleware
- Fetches up to 50 events and categorizes them:
  - **Upcoming events**: Sorted by date (earliest first)
  - **Past events**: Limited to 4 most recent, sorted by date (newest first)
- Handles API failures gracefully with fallback data
- Returns CORS-enabled JSON responses
- Supports OPTIONS requests for CORS preflight

**Response format:**
```json
{
  "upcoming": { "events": [...], "results_returned": n },
  "past": { "events": [...], "results_returned": n },
  "total": { "events": [...], "results_returned": n }
}
```

## Styling

Uses TailwindCSS v4 with custom design system:
- Blue/purple gradient theme representing the Arakawa river
- Responsive design with mobile-first approach
- Custom CSS animations for "river flow" effects
- Accessibility-focused design with proper ARIA labels and screen reader support

## Build Configuration

**Vite Configuration:**
- Alias `@` maps to `/app` directory
- Separate configurations for client and server builds
- HonoX plugin for file-based routing
- Cloudflare Pages adapter for development server
- TailwindCSS Vite plugin for CSS processing

**TypeScript Configuration:**
- Target: ESNext
- Module: ESNext with Bundler resolution
- Strict mode enabled
- JSX configured for Hono's JSX runtime
- Includes Cloudflare Workers types

## Deployment

Deployed to Cloudflare Pages with:
- Compatibility date: 2025-05-21
- Node.js compatibility flag enabled
- Build output directory: `./dist`
- Project name: `senjudev-site`

## Testing

Currently, no testing framework is configured. Consider adding:
- Unit tests for components and utilities
- Integration tests for API endpoints
- E2E tests for user flows

## Missing Features

- **CI/CD Pipeline**: No GitHub Actions workflows configured
- **Testing Framework**: No test files or testing setup
- **Linting/Formatting**: No ESLint or Prettier configuration
- **Pre-commit Hooks**: No husky or lint-staged setup