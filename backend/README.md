# MMN Backend API

Express + TypeScript + **Neon PostgreSQL** REST API for MeaningMatters Network.

## Setup

### 1. Create a Neon database
1. Go to [neon.tech](https://neon.tech) and sign up (free)
2. Create a new project — name it `mmn-db`
3. From the project dashboard → **Connection Details** → copy the connection string:
   ```
   postgresql://user:password@ep-xxx.region.aws.neon.tech/mmn_db?sslmode=require
   ```

### 2. Install dependencies
```bash
npm install
```

### 3. Configure environment
```bash
cp .env.example .env
```
Edit `.env` and paste your Neon connection string as `DATABASE_URL`. Also set a strong `JWT_SECRET`:
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### 4. Run migrations (creates all tables in Neon)
```bash
npm run db:migrate
```

### 5. Seed the first admin account
```bash
npm run db:seed
# Creates: admin@meaningmatters.org / ChangeMe123!
# Change the password immediately after first login via /admin
```

### 6. Start the dev server
```bash
npm run dev
# API runs on http://localhost:4000
# Health check: http://localhost:4000/health
```

### 7. Build for production
```bash
npm run build
npm start
```

---

## Frontend setup

Add to the frontend `.env`:
```
VITE_API_URL=http://localhost:4000
```
For production, set this to your deployed API URL (e.g. `https://api.meaningmatters.org`).

---

## API Endpoints

### Public (no auth required)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/volunteers` | Submit volunteer application |
| POST | `/api/mentors` | Submit mentor application |
| POST | `/api/partners` | Submit partnership inquiry |
| POST | `/api/contact` | Send contact message |
| POST | `/api/newsletter/subscribe` | Subscribe to newsletter |
| POST | `/api/newsletter/unsubscribe` | Unsubscribe |
| POST | `/api/events/register` | Register for an event |
| GET  | `/health` | Health check |

### Admin (Bearer JWT required)
| Method | Path | Description |
|--------|------|-------------|
| POST | `/api/auth/login` | Login → returns JWT |
| GET  | `/api/auth/me` | Current admin profile |
| POST | `/api/auth/change-password` | Change password |
| POST | `/api/auth/admins` | Create admin (superadmin only) |
| GET  | `/api/dashboard/stats` | Summary counts |
| GET  | `/api/dashboard/recent` | Recent activity |
| GET/PATCH/DELETE | `/api/volunteers/:id` | Manage volunteers |
| GET/PATCH/DELETE | `/api/mentors/:id` | Manage mentors |
| GET/PATCH/DELETE | `/api/partners/:id` | Manage partners |
| GET/PATCH/DELETE | `/api/contact/:id` | Manage messages |
| GET/DELETE | `/api/newsletter` | Manage subscribers |
| GET/PATCH/DELETE | `/api/events/registrations/:id` | Manage event registrations |

---

## Deployment

Any Node.js 18+ host (Railway, Render, Fly.io, VPS). Neon handles the database — no Postgres to manage on the server.

**PM2 on a VPS:**
```bash
npm run build
pm2 start dist/server.js --name mmn-api
pm2 save
```

Set these in your production environment:
```
DATABASE_URL=your_neon_connection_string
JWT_SECRET=your_production_secret
NODE_ENV=production
CORS_ORIGIN=https://yourdomain.com
PORT=4000
```
