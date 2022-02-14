import {useEffect} from 'react'

import './App.css';

const stripe = window.Stripe('pk_test_51KT9wjJwwNaY8OyUDWXeiBkFA0pzHimpyO16LctIbeYYw8pADw9sGCYkPIOm8cPpbD0jpoxTlZwByT9MizrsEhFm00z4OzFuun');

export default function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Casa Checkout</h1>
      </header>
    </div>
  );
}
