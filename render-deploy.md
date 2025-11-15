# Render deployment checklist

1. Create a Render account and connect GitHub repository.
2. Create a service for the backend (Environment: Node). Build command: `npm --workspace=server install && npm --workspace=server run build` (or just `npm --workspace=server install`). Start command: `node index.js` or `npm start`.
3. Create a static site or Node service for the frontend (Vite build output) and set the static publish directory to `web/dist` if building.
4. Set environment variables in the Render dashboard for the service(s): STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, STRIPE_PRICE_BASIC, STRIPE_PRICE_STANDARD, STRIPE_PRICE_PREMIUM, OPENAI_API_KEY, DATABASE_URL, JWT_SECRET, FRONTEND_URL.
5. In the Stripe dashboard, create Products and Prices for Basic/Standard/Premium. Use the resulting price IDs as values for the STRIPE_PRICE_* environment variables.
6. Configure Stripe webhook: URL -> `https://<your-backend-service>/webhook/stripe`, select events like `checkout.session.completed`, `invoice.payment_failed`, `customer.subscription.deleted`. Copy signing secret to `STRIPE_WEBHOOK_SECRET`.
7. Enable TLS (Render provides TLS by default).
8. Monitor logs for errors.
