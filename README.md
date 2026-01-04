# Downtime Code Search Tool

A professional, industrial-grade downtime code search tool designed for manufacturing operations. This application allows users to quickly identify and categorize production interruptions using real-time filtering by description, code, or machine type.

## Features

- **Real-time Filtering**: Instant search as you type across codes, descriptions, and machine names.
- **Industrial Design**: Clean, high-contrast interface with a slate gradient background and white result cards.
- **Machine-Specific Badges**: Clear visual distinction between machine types (General, Cutter, Plodder, Stamper, Diverter, Flow Wrap).
- **Responsive UI**: Built with Tailwind CSS and Shadcn UI for a polished, professional look.
- **Comprehensive Database**: Seeded with over 90 realistic manufacturing downtime codes.

## Tech Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS, Lucide React (Icons).
- **State Management**: TanStack Query (React Query) for efficient data fetching.
- **Backend**: Node.js, Express.
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations.

## Project Structure

- `client/`: React frontend source code.
- `server/`: Express backend and database storage logic.
- `shared/`: Shared TypeScript types and database schemas.
- `attached_assets/`: Design assets and documentation.

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Database Setup**:
   The project uses PostgreSQL. Schema management is handled via Drizzle.
   ```bash
   npm run db:push
   ```

3. **Run Application**:
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5000`.

## Key Files

- `shared/schema.ts`: Database table definitions.
- `server/routes.ts`: API endpoints for data retrieval.
- `client/src/pages/Home.tsx`: Main search interface and filtering logic.
