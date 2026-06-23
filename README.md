# LAMAR Stukadoor en Onderhoud — website

Marketing website + content management admin for LAMAR (a Dutch
plastering & renovation business). Built with **Next.js 16** (App
Router), **Prisma 7 / PostgreSQL**, **NextAuth**, **Cloudinary** (image
uploads) and **Resend** (contact emails).

The public site is Dutch. A built-in admin (`/admin`) lets the owner edit
homepage text, projects, reviews, contact details, theme colour and more
— no code changes needed.

---

## 1. Requirements

- **Node.js 20.9+**
- A **PostgreSQL** database (e.g. [Neon](https://neon.tech))
- A **Cloudinary** account (image hosting)
- A **Resend** account + a verified sending domain (contact emails)

## 2. Local setup

```bash
# 1. Install dependencies
npm install

# 2. Configure environment variables
cp .env.example .env.local
#   …then fill in every value in .env.local (see the comments in that file)

# 3. Create the database tables
npx prisma db push

# 4. Create the first admin user (uses ADMIN_* from .env.local)
npx prisma db seed

# 5. Start the dev server
npm run dev
```

Open <http://localhost:3000> for the site and <http://localhost:3000/admin>
for the admin (log in with the `ADMIN_EMAIL` / `ADMIN_PASSWORD` you set).

## 3. Environment variables

All variables are documented in [`.env.example`](./.env.example). Summary:

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | Postgres connection (pooled) used at runtime |
| `DATABASE_URL_UNPOOLED` | Direct Postgres connection used by the seed script |
| `NEXTAUTH_SECRET` | Signs admin sessions (`openssl rand -base64 32`) |
| `ADMIN_EMAIL` / `ADMIN_PASSWORD` / `ADMIN_NAME` | First admin account (seed) |
| `CLOUDINARY_URL` | Cloudinary credentials for image uploads |
| `RESEND_API_KEY` | Resend API key for contact emails |
| `CONTACT_FROM` | Verified sender address for contact emails |
| `CONTACT_EMAIL` | Fallback recipient if none set in the admin |
| `NEXT_PUBLIC_SITE_URL` | Production URL (sitemap, canonical, OG image) |

## 4. Deploying (Vercel recommended)

1. Push this repository to your own GitHub account.
2. Import it in [Vercel](https://vercel.com/new) — it auto-detects Next.js.
3. Add **all** the environment variables above in **Project → Settings →
   Environment Variables**.
4. After the first deploy, create the tables and admin user against the
   **production** database (run locally with your production `DATABASE_URL`
   in `.env.local`, or from a one-off shell):

   ```bash
   npx prisma db push
   npx prisma db seed
   ```

5. For contact emails to actually send, **verify your domain in Resend**
   and set `CONTACT_FROM` to an address on it. Until then, enquiries are
   still captured in the admin **Leads** inbox.

The build command is `npm run build` (runs `prisma generate` then
`next build`); the start command is `npm run start`.

## 5. Admin overview (`/admin`)

| Section | What it controls |
| --- | --- |
| **Leads** | Enquiries from the contact form & quote wizard, with statuses |
| **Projects** | Portfolio — add/edit/publish projects + image uploads |
| **Texts** | Editable homepage copy (hero, sections, FAQ, footer) |
| **Rating Badges** | Review-platform trust bar under the hero |
| **About / Process / Quote / Reviews / Contact** | Page content & business details |
| **Settings** | Theme colour + social links |
| **Users** | Admin accounts & roles (SUPER_ADMIN only) |

## 6. Useful scripts

```bash
npm run dev        # local dev server
npm run build      # production build (prisma generate + next build)
npm run start      # run the production build
npm run lint       # ESLint
npx prisma studio  # browse/edit the database in a UI
```
