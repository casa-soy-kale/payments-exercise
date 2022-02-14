const express = require('express');
const Stripe = require('stripe');

const router = express.Router();
const stripe = Stripe('sk_test_51KT9wjJwwNaY8OyUvP2BfBFv4O69BwYuMYrnOtDxH8lJu7jNsI9PpmQaLDFeyAfSi3tM01KWHFUiSyKcanEXl72M0036VutbyQ');

router.get('/', function(req, res, next) {
  res.send('index here!');
});

router.get('/checkout', async function(req, res, next) {
  // todo: implement this
  res.send({todo: true});
});

module.exports = router;
