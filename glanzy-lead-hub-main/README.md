# Glanzy Lead Hub

Build a production-ready private Glanzy Studio Lead Command Center from the attached existing HTML/CSS/JS. Inspect every supplied file first and preserve the dashboard's existing UI, layout, hierarchy, typography, spacing, table, cards, and detail panel as closely as possible; upgrade rather than redesign. Connect to the user's existing Supabase project/table public.brand_leads only (no new database, no duplicate tables/columns). Implement Supabase email/password auth with a Glanzy-styled login screen, protected dashboard/routes, session persistence and logout. Use only client publishable keys/env vars; no secrets. Read live leads with efficient server-side pagination/search/filter/sort as feasible, include all specified searches, filters (including industry/company stage), sorts (including recently verified), stats, lead detail, actions, realtime subscriptions and manual refresh. Persist mail updates to brand_leads.mail and updated_at. Treat existing email_subject and email_body as first-class lead fields: display with preserved formatting, authenticated inline edit/save to existing columns plus updated_at, copy subject/body/both and notifications; never send email. Add exactly Dark/Light themes with Dark as default, persisted preference, a clear header toggle, and a properly designed dark version without disturbing light UI. Responsive without redesign. Apply safe authenticated RLS guidance/policies only for existing table, authenticated SELECT/UPDATE and no public access, supporting multiple individual users. Enable/connect existing user-owned Supabase as required and request their authorization/details through the proper flow. Verify all listed behaviors. Make it deployable/publishable via Lovable.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/99c0f840-9f07-4c14-a2ef-c7bc2914a23c).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
