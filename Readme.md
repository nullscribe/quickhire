# QuickHire - Job Board Application

A full-stack job board built with TurboRepo, React, Express, TypeScript, and PostgreSQL.

## Features

- Browse and search job listings
- Filter by category and location
- Apply to jobs with resume link
- Admin panel to manage jobs

## Tech Stack

- **Frontend:** React.js, TypeScript, Tailwind CSS
- **Backend:** Express API
- **Database:** PostgreSQL + Drizzle ORM
- **Validation:** Zod

## Quick Start

### 1. Clone and Install
```bash
git clone https://github.com/nullscribe/quickhire
cd quickhire
yarn install
```

### 2. Environment Setup
Create `.env.local`:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/quickhire"
```

### 3. Database Setup
```bash
yarn workspace api drizzle-kit push
```

### 4. Run Development Server
```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000)

## Project Structure

```bash
├── apps/          
    ├── api/       # express api
    └── web/       # react frontend
```

## Available Scripts

```bash
yarn dev          # Start turbo task with both dev server
yarn build        # Build both apps
yarn lint         # Lint both apps
```

## License
MIT
