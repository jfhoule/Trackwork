# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

This is a Next.js application. Standard Next.js commands apply:

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server  
- `npm run lint` - Run ESLint

## Architecture Overview

Trackwork is a minimal time tracking platform built with Next.js 13+ App Router, TypeScript, and Tailwind CSS. The application uses Supabase as the backend with PostgreSQL database and Row Level Security (RLS) policies.

### Core Data Model

The application centers around these key entities defined in `lib/types.ts`:

- **Users** - Authentication and profile data
- **Clients** - Client companies and contacts
- **Projects** - Work projects linked to clients with optional budget tracking
- **Time Entries** - Individual time tracking records linked to users and projects
- **Invoices & Invoice Items** - Billing functionality with line items

### Database Schema

Database initialization is handled through `supabase-init.sql` which creates:
- All core tables with proper foreign key relationships
- Row Level Security (RLS) policies ensuring users can only access their own time entries
- Proper authentication integration with Supabase Auth

### Application Structure

- `app/` - Next.js 13+ App Router pages
  - `app/dashboard/` - Main dashboard with overview cards and metrics
  - `app/time/` - Time tracking interface with timer and entry management
  - `app/clients/` - Client management
  - `app/projects/` - Project management
- `components/` - React components
  - `components/ui/` - Reusable UI components (cards, buttons, dialogs, etc.)
  - Top-level components like `timer-card.tsx`, `time-entry-row.tsx`
- `lib/` - Utility functions and type definitions
  - `lib/types.ts` - Core TypeScript interfaces matching database schema
  - `lib/clients.ts` - Mock client data (likely to be replaced with Supabase queries)
  - `lib/utils.ts` - Utility functions including `cn()` for className merging

### UI Framework

The application uses a custom component system built on Tailwind CSS with components in `components/ui/`. The design follows a clean, minimal approach with:
- Card-based layouts for content organization
- Responsive design with mobile-first approach
- Dark/light mode support indicated in the layout
- Skeleton loading states for better UX

### Key Patterns

1. **Type Safety**: All data models are strictly typed matching the database schema
2. **Component Organization**: Clear separation between UI components and business logic components
3. **Mock Data**: Currently uses mock data in `lib/clients.ts` - likely placeholder for Supabase integration
4. **RLS Security**: Database policies ensure proper data isolation between users
5. **App Router**: Uses Next.js 13+ features with server and client components

The codebase is structured for a time tracking application with invoicing capabilities, currently in development phase with some mock data and skeleton UI elements.