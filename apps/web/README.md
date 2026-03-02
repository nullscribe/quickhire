# Frontend Documentation

React SPA with TypeScript and Tailwind CSS.

## Tech Stack

- React 19
- TypeScript
- Vite
- Tailwind CSS
- React Router
- Axios
- React Hook Form + Zod

## Setup

```bash
cd frontend
npm install

# .env file
VITE_API_URL=http://localhost:5000/api

# Start dev server
npm run dev
```

App runs on `http://localhost:5173`

## Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── Home.tsx            # Job listings
│   │   ├── JobDetail.tsx       # Single job view
│   │   ├── ApplyJob.tsx        # Application form
│   │   └── Admin.tsx           # Admin panel
│   ├── components/
│   │   ├── JobCard.tsx         # Job listing card
│   │   ├── JobFilters.tsx      # Search & filters
│   │   ├── ApplicationForm.tsx # Apply form
│   │   └── JobForm.tsx         # Create/edit job
│   ├── lib/
│   │   ├── api.ts             # Axios instance
│   │   └── validations.ts     # Zod schemas
│   ├── App.tsx                # Router setup
│   └── main.tsx               # Entry point
└── package.json
```

## Key Components

### JobCard
Displays job info in grid layout.

```tsx
<JobCard
  job={{
    id: 1,
    title: "Frontend Developer",
    company: "TechCorp",
    location: "Remote",
    category: "Engineering"
  }}
/>
```

### JobFilters
Search input + category/location dropdowns.

```tsx
<JobFilters
  onSearch={setSearch}
  onFilterChange={setFilters}
/>
```

### ApplicationForm
Form with validation for job applications.

```tsx
<ApplicationForm jobId={1} />
```

## Pages

### `/` - Job Listings
- Grid of job cards
- Search bar
- Category/location filters
- Click card → job detail page

### `/jobs/:id` - Job Detail
- Full job description
- Requirements, responsibilities
- "Apply Now" button

### `/jobs/:id/apply` - Application
- Form: name, email, resume link, cover note
- Client-side validation with Zod
- Submit to API

### `/admin` - Admin Panel
- Job table with edit/delete
- "Create New Job" button
- View applications per job

## API Integration

Using Axios:

```typescript
// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

export const getJobs = (params?: SearchParams) =>
  api.get('/jobs', { params });

export const getJob = (id: number) =>
  api.get(`/jobs/${id}`);

export const createJob = (data: JobData) =>
  api.post('/jobs', data);

export const submitApplication = (data: ApplicationData) =>
  api.post('/applications', data);
```

## Routing

Using React Router:

```tsx
// App.tsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/jobs/:id" element={<JobDetail />} />
    <Route path="/jobs/:id/apply" element={<ApplyJob />} />
    <Route path="/admin" element={<Admin />} />
  </Routes>
</BrowserRouter>
```

## Styling

- **Tailwind CSS** for all styling
- Responsive design (mobile-first)
- Custom colors in `tailwind.config.js`

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#3b82f6',
      },
    },
  },
};
```

## Form Validation

Using React Hook Form + Zod:

```typescript
const applicationSchema = z.object({
  name: z.string().min(1).max(255),
  email: z.string().email(),
  resumeLink: z.string().url(),
  coverNote: z.string().optional(),
});

const { register, handleSubmit } = useForm({
  resolver: zodResolver(applicationSchema),
});
```

## Available Scripts

```bash
yarn dev --filter web      # Start dev server
yarn build --filter web    # Build for production
yarn preview --filter web  # Preview production build
yarn lint --filter web     # Run ESLint
```
