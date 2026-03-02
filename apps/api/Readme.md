# Backend API Documentation

Express REST API with TypeScript, Drizzle ORM, and PostgreSQL.

## Tech Stack

- Node.js + Express
- TypeScript
- PostgreSQL
- Drizzle ORM
- Zod validation
- CORS enabled

## Setup

```bash
cd backend
npm install

# .env file
DATABASE_URL="postgresql://user:password@localhost:5432/quickhire"
PORT=4000

# Run migrations
npm run db:push

# Start server
npm run dev
```

Server runs on `http://localhost:4000`

## Project Structure

```
backend/
├── src/
│   ├── routes/           # API routes
│   │   ├── jobs.ts
│   │   └── applications.ts
│   ├── db/
│   │   ├── schema.ts    # Drizzle schema
│   │   └── index.ts     # DB connection
│   ├── validations/     # Zod schemas
│   └── index.ts         # Express app
├── drizzle/             # Migrations
└── package.json
```

## API Endpoints

Base URL: `http://localhost:4000/api`

### Get All Jobs
```http
GET /api/jobs?search=developer&category=Engineering&location=Remote
```

**Response:**
```json
{
  "jobs": [
    {
      "id": 1,
      "title": "Frontend Developer",
      "company": "TechCorp",
      "location": "San Francisco",
      "category": "Engineering",
      "description": "...",
      "salary": "$120k - $180k",
      "jobType": "Full-time",
      "experience": "Senior Level"
    }
  ]
}
```

### Get Single Job
```http
GET /api/jobs/1
```

### Create Job
```http
POST /api/jobs
Content-Type: application/json

{
  "title": "Backend Developer",
  "company": "StartupXYZ",
  "location": "Remote",
  "category": "Engineering",
  "description": "Looking for a skilled backend developer",
  "salary": "$100k - $150k",
  "jobType": "Full-time",
  "experience": "Mid Level"
}
```

### Update Job
```http
PUT /api/jobs/1
Content-Type: application/json

{
  "title": "Senior Backend Developer"
}
```

### Delete Job
```http
DELETE /api/jobs/1
```

### Submit Application
```http
POST /api/applications
Content-Type: application/json

{
  "jobId": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "resumeLink": "https://drive.google.com/file/d/abc123",
  "coverNote": "I am excited to apply...",
  "phone": "+1-555-0123"
}
```

### Get Applications for Job
```http
GET /api/applications?jobId=1
```

## Validation Rules

### Job
- `title`: Required, max 255 chars
- `company`: Required, max 255 chars
- `location`: Required, max 255 chars
- `category`: Required (Engineering, Design, Marketing, etc.)
- `description`: Required

### Application
- `jobId`: Required, must exist
- `name`: Required, max 255 chars
- `email`: Required, valid email format
- `resumeLink`: Required, valid URL
- `coverNote`: Optional
- `phone`: Optional

## Error Responses

```json
{
  "error": "Validation failed",
  "details": [
    {
      "field": "email",
      "message": "Invalid email format"
    }
  ]
}
```

## Testing with cURL

```bash
# Get jobs
curl http://localhost:4000/api/jobs

# Create job
curl -X POST http://localhost:4000/api/jobs \
  -H "Content-Type: application/json" \
  -d '{"title":"Developer","company":"ABC","location":"NYC","category":"Engineering","description":"Great job"}'

# Apply to job
curl -X POST http://localhost:4000/api/applications \
  -H "Content-Type: application/json" \
  -d '{"jobId":1,"name":"Jane","email":"jane@test.com","resumeLink":"https://example.com/resume"}'
```

## Available Scripts

```bash
yarn dev --filter api       # Start dev server with nodemon
yarn build --filter api     # Build TypeScript
yarn start --filter api     # Start production server
yarn db:push  --filter api  # Push schema to database
yarn db:studio --filter api # Open Drizzle Studio
```
