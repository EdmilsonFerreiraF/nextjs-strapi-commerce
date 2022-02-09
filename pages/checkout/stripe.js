import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import CheckoutForm from "../../components/checkout/CheckoutForm";
import GlobalContext from "../../context/GlobalContext";
import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:1337";

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51KOP3uHbz4bukEWOFwNbJHuIKt4wYew0Pt761J42BuD7Kwu9aNR14c9HW20fZYvJ7fsxOzeKbBvRWHxZL6reHAWH00GpdQjqkg");

export default function App() {
  const [clientSecret, setClientSecret] = useState("");
  const globalContext = useContext(GlobalContext);

  const paymentData = {
    customer: {
      description: 'My First Test Customer'
    },
    currency: 'brl',
    amount: 2000,
    payment_method_types: ['card'],
    setup_future_usage: 'on_session',
  }

  useEffect(() => {
    (async () => {
      // Create PaymentIntent as soon as the page loads
      await axios.post(`${API_URL}/api/orders/stripe`, {
      }, paymentData)
        .then((res) => res.json())
        .then((data) => setClientSecret(data.clientSecret));
    })
  }, [])

  const appearance = {
    theme: 'stripe',
  };

  const options = {
    clientSecret,
    appearance,
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={options} stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      )}
    </div>
  );
}