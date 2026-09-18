# Editorial Minimalist Portfolio (Supabase-Backed)

A production-ready personal portfolio web application crafted with an "Editorial Minimalism" design aesthetic (Playfair Display serif headings, Inter sans body, warm stone/zinc monochrome palette, thin dividers, dark mode default).

Built with **React (Vite)**, **Tailwind CSS**, **React Router**, and backed by a free **Supabase** project for PostgreSQL data storage, Supabase Auth, and Supabase Storage for images.

---

## Features

- **Public Site**:
  - **Home**: Bold serif headline & tagline, 2-column split featuring Selected Work and Recent Log entries.
  - **Work**: Chronological index of projects with tech stack tags, descriptions, external links, and image previews.
  - **Log**: High-contrast masonry grid of achievements, CTFs, research records, and field notes with editorial numbered captions.
  - **About**: Long-form bio, location, contact details, structured technical capabilities, tools list, and direct FormSubmit contact form (`contact@gdeep.in`).
  - **Theme**: Dark mode by default, smooth light/dark toggle, persisting in `localStorage`.
  - **Design**: Refined digital-magazine layout matching the reference editorial styling.

- **Secret Admin Panel (`/admin`)**:
  - Genuine secret route disallowed in `robots.txt` and unlinked from the public navigation.
  - **Supabase Auth**: Email & password authentication with protected routes and auto-refreshing sessions.
  - **Profile Editor**: Live editing of name, role, location, tagline, short bio, long bio, and contact email.
  - **Projects Manager**: Full CRUD with title, tech stack, year, description, external links, image attachments, and sort order.
  - **Achievements & Log Manager**: Full CRUD for captions, dates, notes, and visual attachments.
  - **Capabilities & Tools Managers**: Reusable list managers for skills and developer tools.
  - **Media Library**: Supabase Storage bucket (`portfolio-media`) uploader, preview grid with deletion and URL copying, plus integrated image pickers inside project/log forms.
  - **Graceful Fallback**: When Supabase credentials are not yet configured, the app seamlessly boots with local starter data and allows testing the admin interface.

---

## Setup Instructions

### 1. Create a Supabase Project (Free Tier)
1. Go to [supabase.com](https://supabase.com) and create a new free project.
2. Note your **Project URL** and **Anon Public Key** from **Project Settings > API**.

### 2. Run the Database Schema & Policies
1. In your Supabase Dashboard, navigate to the **SQL Editor** (`SQL Editor > New query`).
2. Open `supabase-schema.sql` in this repository, copy its entire contents, paste it into the query editor, and click **Run**.
3. This creates:
   - `profile` table (with singleton constraint id = 1)
   - `projects` table
   - `achievements` table
   - `capabilities` table
   - `tools` table
   - `portfolio-media` storage bucket
   - Row Level Security (RLS) policies allowing public read access and authenticated admin write access
   - Starter seed content for Gaurav Deep

### 3. Create your Admin User
1. In the Supabase Dashboard, go to **Authentication > Users**.
2. Click **Add User > Create User**.
3. Enter your desired admin email (e.g. `contact@gdeep.in`) and a secure password.
4. Toggle "Auto Confirm User" to true so you can log in immediately.

### 4. Configure Environment Variables
Create a `.env` file in the root directory (or configure your hosting provider's environment variables):

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### 5. Run Locally
```bash
npm install
npm run dev
```
Visit `http://localhost:3000` to view the public portfolio, and visit `http://localhost:3000/admin` to log into the admin dashboard.

---

## Free-Tier Deployment (Vercel / Netlify / Cloudflare Pages)

1. Connect this repository to Vercel, Netlify, or Cloudflare Pages (Free Tier).
2. Set build command to `npm run build` and output directory to `dist`.
3. Add `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` to your host's environment settings.
4. Deploy! All edits made via `/admin` update directly in Supabase and reflect instantly on the public site.
