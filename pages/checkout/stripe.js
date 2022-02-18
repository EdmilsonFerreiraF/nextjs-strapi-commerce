import React, { useState, useEffect, useContext } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import axios from "axios";

import CardPayment from "../../components/checkout/stripe/cardPayment";
import GlobalContext from "../../context/GlobalContext";
import { getStrapiURL } from "../../lib/api"

// Make sure to call loadStripe outside of a component’s render to avoid
// recreating the Stripe object on every render.
// This is your test publishable API key.
const stripePromise = loadStripe("pk_test_51KOP3uHbz4bukEWOFwNbJHuIKt4wYew0Pt761J42BuD7Kwu9aNR14c9HW20fZYvJ7fsxOzeKbBvRWHxZL6reHAWH00GpdQjqkg");

export default function Stripe() {
  const [clientSecret, setClientSecret] = useState("");
  const globalContext = useContext(GlobalContext);
  const { cart } = globalContext;

  const paymentData = {
    customer: {
      description: 'My First Test Customer'
    },
    currency: 'brl',
    amount: cart.total || 2000,
    payment_method_types: ['card'],
    setup_future_usage: 'on_session',
  }

  useEffect(() => {
    const getClientSecret = async () => {
      // Create PaymentIntent as soon as the page loads
      await axios.post(

        getStrapiURL('/api/orders/stripe'), paymentData)
        .then((res) => {
          setClientSecret(res.data.clientSecret)
        })
        .catch(err => console.error(err))
    }

    getClientSecret()
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
          <CardPayment />
        </Elements>
      )}
    </div>
  );
}