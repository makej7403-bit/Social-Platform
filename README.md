# Social Platform

Starter scaffold for a subscription-based social platform built by Akin S. Sokpah (Liberia).

## Quickstart (local)

1. Clone repo and `cd social-platform`
2. Copy `.env.example` to `.env` and fill values (Stripe, OpenAI API keys, price IDs).
3. Install dependencies:
   - `npm run install-all` (from root, requires npm workspaces)
4. Start server and web in dev mode:
   - `npm run start:dev` (uses concurrently to start server and web)

## Deploying to Render
- Push to GitHub and connect Render.
- Create two services: `server` (Node) and `web` (static or Node). Set environment variables in Render dashboard including STRIPE_SECRET_KEY and STRIPE_WEBHOOK_SECRET.
- Configure Stripe webhook URL to point to `https://<your-server>/webhook/stripe` and copy webhook secret to STRIPE_WEBHOOK_SECRET.

## Important
- Free trial is configured via `TRIAL_PERIOD_DAYS` environment variable. After trial, Stripe will bill automatically.
- Do NOT commit API keys into GitHub.
