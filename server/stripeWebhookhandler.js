const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);

module.exports = async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  switch (event.type) {
    case 'checkout.session.completed':
      {
        const session = event.data.object;
        console.log('Checkout session completed:', session.id);
        // TODO: create or update user record in DB, attach subscription id
      }
      break;

    case 'invoice.payment_failed':
      {
        const invoice = event.data.object;
        console.log('Payment failed for invoice:', invoice.id);
        // TODO: notify user, mark subscription state
      }
      break;

    case 'customer.subscription.deleted':
      {
        const subscription = event.data.object;
        console.log('Subscription canceled:', subscription.id);
        // TODO: update DB
      }
      break;

    default:
      console.log(`Unhandled event type ${event.type}`);
  }

  res.json({received: true});
};
