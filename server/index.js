/**
 * server/index.js
 * Entry point for backend API. Minimal Express server with Stripe checkout, webhook, and simple AI endpoint.
 */

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const checkoutRoutes = require('./routes/checkout');
const aiRoutes = require('./routes/ai');
const stripeWebhookHandler = require('./stripeWebhookHandler');

const app = express();

app.use(cors());
app.use(express.json({verify: (req, res, buf) => { req.rawBody = buf; }}));

// Routes
app.use('/api', checkoutRoutes);
app.use('/api', aiRoutes);

// Stripe webhook must receive raw body
app.post('/webhook/stripe', bodyParser.raw({type: 'application/json'}), stripeWebhookHandler);

app.get('/health', (req, res) => res.json({status: 'ok'}));

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
