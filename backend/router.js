const express = require('express');
const Stripe = require('stripe');

const router = express.Router();
const stripe = Stripe('sk_test_51KT9wjJwwNaY8OyUvP2BfBFv4O69BwYuMYrnOtDxH8lJu7jNsI9PpmQaLDFeyAfSi3tM01KWHFUiSyKcanEXl72M0036VutbyQ');


async function getOrCreateCustomerByEmail(email) {

  // TODO: Emails are not unique in stripe so customer Ids are better
  const customers = (await stripe.customers.list({email, limit: 1})).data

  if (customers.length > 0) {
    return customers[0]
  }

  const newCustomer = await stripe.customers.create({
    email: email,
    description: "CW's Test Customer",
  });

  return newCustomer
}


router.get('/products', async function(req, res, next) {
  const products = await stripe.products.list()
  res.send({products: products.data});
});

router.post('/checkout', async function(req, res, next) {
  const {email, productID, number, month, year, cvc} = req.body
  //const product = await stripe.products.retrieve(productID)
  const prices = (await stripe.prices.list({product: productID})).data
  const price = prices[0] // pick a random price for now


  const token = await stripe.tokens.create({
    card: {
      number: number,
      exp_month: month,
      exp_year: year,
      cvc: cvc,
    },
  });  

  const customer = await getOrCreateCustomerByEmail(email)

  await stripe.customers.update(customer.id, {source: token.id})

  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {price: price.id} 
    ]
  })

  console.log(subscription)
});

module.exports = router;
