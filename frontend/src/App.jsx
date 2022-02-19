import {useEffect, useState} from 'react'

import './App.css';

const BASE_URL = "http://localhost:8000"

const stripe = window.Stripe('pk_test_51KT9wjJwwNaY8OyUDWXeiBkFA0pzHimpyO16LctIbeYYw8pADw9sGCYkPIOm8cPpbD0jpoxTlZwByT9MizrsEhFm00z4OzFuun');

export default function App() {

  const [products, setProducts] = useState([])

  function getProducts() {
    fetch(BASE_URL + "/products").then(response => {
      if (!response.ok) {
        console.log("error");
      }
      return response.json();
    }).then(data => {
      setProducts(data.products)
    });
  }

  function postCheckout(email, productID, number, month, year, cvc) {
    fetch(
      BASE_URL + "/checkout", 
      {
        method: "POST",
        body: JSON.stringify({
          email,
          productID,
          number,
          month,
          year,
          cvc,
        }),
        headers: {
          "Content-Type": "application/json",
        }
      }
    ).then(response => {
      if (!response.ok) {
        console.log("error");
      }
      return response.text();
    }).then(text => {
      console.log(text)
    });
  }

  function formSubmit(event) {
    event.preventDefault();
    const email = event.target.email.value
    const productID = event.target.product.value
    const number = event.target.number.value
    const month = event.target.month.value
    const year = event.target.year.value
    const cvc = event.target.cvc.value

    // should do this client side but its not working
    // stripe.createToken(event.target.number.value).then(result => console.log(result))

    postCheckout(email, productID, number, month, year, cvc)
  }

  useEffect(() => {
    getProducts()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <h1>Casa Checkout</h1>
      </header>
      <form onSubmit={formSubmit}>
        <label>First Name:
          <input type="text" name="firstName" />
        </label>
        <br />
        <label>Last Name:
          <input type="text" name="lastName" />
        </label>
        <br />
        <label>Email:
          <input type="text" name="email" />
        </label>
        <br /><br />
        <select name="product">
          {products.map(x => <option value={x.id}>{x.name}</option>)}
        </select>
        <br /><br />
        <label>Number:
          <input type="text" name="number" placeholder="4242424242424242"/>
        </label>
        <br />
        <label>CVC:
          <input type="text" name="cvc" placeholder="123"/>
        </label>
        <br />
        <label>Month:
          <input type="text" name="month" placeholder="1"/>
        </label>
        <br />
        <label>Year:
          <input type="text" name="year" placeholder="2025"/>
        </label>
        <br />
        <label>Zip:
          <input type="text" name="zip" placeholder="94103"/>
        </label>
        <br /><br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
}
