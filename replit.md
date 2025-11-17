# Conector do Carrinho

## Overview

This is a Next.js-based frontend application for controlling and monitoring an autonomous cart/vehicle system. The application provides a user interface for connecting to the cart, managing route instructions, viewing trajectory details, and monitoring performance metrics. The system displays connection status, availability status, allows route selection, and provides performance graphs and downloadable reports.

**Latest Update (October 31, 2025):**
- Migrated from Vercel to Replit environment
- Completely redesigned for full responsive support across mobile, tablet, and desktop
- Configured for Replit deployment with proper port binding (5000) and host configuration (0.0.0.0)

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework Choice: Next.js 15.5.6 with React 19**
- Uses Next.js App Router architecture (app directory structure)
- TypeScript for type safety
- Configured for Replit deployment
- Server runs on port 5000 with host binding to 0.0.0.0 for network accessibility
- Development server: `npm run dev` (automatically configured)

**Styling Approach: Tailwind CSS**
- Utility-first CSS framework for rapid UI development
- Custom scrollbar plugin (@gradin/tailwindcss-scrollbar) for enhanced scroll UX
- Global CSS reset with consistent box-sizing and font family
- **Fully responsive design** with mobile-first breakpoints (sm:, md:, lg:, xl:)
- All components use fluid widths (w-full, flex-1) with max-width constraints
- Responsive typography and spacing using Tailwind breakpoints

**Component Structure:**
- Modular component design with clear separation of concerns
- Components are located in `/app/components/`
- Key reusable components:
  - `Header`: Top navigation with menu toggle and branding
  - `SideBar`: Navigation drawer for route selection
  - `Button`: Reusable action button component
  - `StatusSection`: Connection and availability status toggles
  - `RouteBox`: Individual route selection items
  - `Details`: Text display container for trajectory information
  - `Graph`: Performance visualization using Recharts

**State Management:**
- Client-side state using React hooks (useState)
- No global state management library (suitable for current scope)
- Local component state for:
  - Sidebar toggle state
  - Connection status
  - Availability status
  - Simulated async operations (instruction sending)

**Routing Strategy:**
- File-based routing using Next.js App Router
- Dynamic route for individual route details: `/route/[id]`
- Main dashboard at root path `/`

### Data Visualization

**Charting Library: Recharts 3.3.0**
- Line charts for displaying velocity vs. distance performance metrics
- Currently uses sample data (hardcoded)
- Configured with custom styling to match dark theme
- Responsive chart sizing with aspect ratio constraints

### UI/UX Patterns

**Dark Theme Design:**
- Primary background: #1E1E1E and #2B2B2B
- Accent colors: Blue tones (#446784, #7398B7)
- Status indicators: Green (active/connected) and Red (inactive/disconnected)

**Interaction Patterns:**
- Toggle-based sidebar navigation
- Status switches with visual feedback (toggle switches)
- Simulated async operations with loading states
- Hover effects for interactive elements

**Responsive Design Implementation:**
- **Mobile-first approach** - All components designed for small screens first
- **Flexible layouts** - Changed from fixed widths (w-[400px], w-[1000px]) to fluid layouts (w-full, flex-1)
- **Max-width constraints** - Used max-w-[400px], max-w-full to prevent excessive stretching
- **Breakpoint-based adjustments**:
  - `sm:` (640px+) - Tablet-optimized spacing and typography
  - `lg:` (1024px+) - Desktop layout changes (row vs column layouts)
- **Responsive text** - Font sizes adjust from mobile (text-lg) to desktop (text-[25px])
- **Adaptive spacing** - Padding and margins scale across breakpoints (px-4 to lg:px-10)
- **Stack to horizontal** - Main layout switches from vertical (mobile) to horizontal (desktop)
- **Truncation and overflow handling** - Proper text truncation and scrolling for content

### Project Configuration

**TypeScript Configuration:**
- Target: ES2017
- Strict mode enabled
- Path aliasing: `@/*` maps to src root
- Next.js plugin integration for enhanced type checking

**Build Configuration:**
- Standalone output mode for containerized deployments
- Custom port configuration (5000)
- Host binding for network accessibility

**Development Workflow:**
- Git-based collaboration with feature branch workflow
- Issue-driven development process
- Environment variables via `.env` (not committed to repository)

## External Dependencies

### Runtime Dependencies

**Core Framework:**
- `next` (15.5.6): React framework for production-grade applications
- `react` (19.1.0): UI library
- `react-dom` (19.1.0): React rendering for web

**UI Libraries:**
- `react-icons` (5.5.0): Icon library for UI elements (SlMenu, SlArrowLeft)
- `recharts` (3.3.0): Charting library for data visualization

### Development Dependencies

**Styling:**
- `tailwindcss` (3.4.18): Utility-first CSS framework
- `autoprefixer` (10.4.21): PostCSS plugin for vendor prefixes
- `postcss` (8.5.6): CSS transformation tool
- `@gradin/tailwindcss-scrollbar` (3.0.1): Custom scrollbar styling plugin

**TypeScript Support:**
- `typescript` (^5): Type checking and compilation
- `@types/node` (^20): Node.js type definitions
- `@types/react` (^19): React type definitions
- `@types/react-dom` (^19): React DOM type definitions

### Backend Integration

**Current State:**
- No backend API integration implemented yet
- Simulated async operations using setTimeout
- Placeholder data for routes and performance metrics

**Expected Integration Points:**
- WebSocket or REST API for real-time cart connection status
- Route instruction endpoints for sending commands to cart
- Performance data endpoints for populating graphs
- Report generation and download endpoints

### Deployment Platform

**Replit Deployment:**
- Project is configured for Replit deployment
- Development server runs on port 5000 with host binding to 0.0.0.0
- Workflow automatically starts the Next.js dev server
- Standalone build output for flexibility in deployment options
- Can be deployed to any Node.js hosting platform or containerized environment

### Asset Management

**Static Assets:**
- Public directory expected for images (e.g., `/image.png` referenced in Header)
- No image optimization configuration beyond Next.js defaults