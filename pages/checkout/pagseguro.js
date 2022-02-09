
import { useState, useEffect } from 'react'
import Card from 'react-credit-cards';

import Layout from "../../components/layout"
import { fetchAPI, getStrapiURL } from "../../lib/api"
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../components/utils";
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios'

const Checkout = ({ categories }) => {
  let [cardData, setCardData] = useState({
    number: "",
    name: "",
    expiry: "",
    cvc: "",
    issuer: "",
    focused: "",
    formData: null
  })

  let [paymentTab, setPaymentTab] = useState(0)

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setCardData({ ...cardData, issuer });
    }
  };

  const handleInputFocus = ({ target }) => {
    setCardData({
      ...cardData,
      focused: target.name
    });
  };

  const handleInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setCardData({ ...cardData, [target.name]: target.value });
  };

  const sendCartData = async () => {
    await axios.post(getStrapiURL('/exampleAction', formData))
      .then(res => { console.log(res); return res })
      .catch(err => console.error(err));
  }

  const handleSubmit = e => {
    e.preventDefault();
    const { issuer } = cardData;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setCardData({ ...cardData, formData });

    sendCartData();

    Checkout.form.reset();
  };

  const handlePaymentTab = (tab) => {
    setPaymentTab(tab)
  }

  const { name, number, expiry, cvc, focused, issuer, formData } = cardData;

  return (
    <Layout categories={categories}>
      <div className="col bg-light py-4">
        <ul class="nav nav-pills container-md justify-content-center mb-5">
          <li class="nav-item">
            <a class="nav-link disabled">Carrinho</a>
          </li>
          <li class="nav-item">
            <a class={`nav-link${paymentTab === 0 ? ' active' : ''}`} onClick={() => handlePaymentTab(0)} aria-current="page" href="#">Endereço</a>
          </li>
          <li class="nav-item">
            <a class={`nav-link${paymentTab === 1 ? ' active' : ''}`} onClick={() => handlePaymentTab(1)} href="#">Forma de pagamento</a>
          </li>
          <li class="nav-item">
            <a class={`nav-link${paymentTab === 2 ? ' active' : ''}`} onClick={() => handlePaymentTab(2)} href="#">Confirmar</a>
          </li>
        </ul>

        {paymentTab === 1 &&
          <div className="container-md">
            <div className="mb-5">
              <Card
                number={number}
                name={name}
                expiry={expiry}
                cvc={cvc}
                focused={focused}
                callback={handleCallback}
              />
            </div>
            <form ref={c => (Checkout.form = c)} onSubmit={handleSubmit}>
              <div className="form-group my-4">
                <input
                  type="tel"
                  name="number"
                  className="form-control"
                  placeholder="Card Number"
                  pattern="[\d| ]{16,22}"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
                <small>E.g.: 49..., 51..., 36..., 37...</small>
              </div>
              <div className="form-group my-4">
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  placeholder="Name"
                  required
                  onChange={handleInputChange}
                  onFocus={handleInputFocus}
                />
              </div>
              <div className="row">
                <div className="col-6">
                  <input
                    type="tel"
                    name="expiry"
                    className="form-control"
                    placeholder="Valid Thru"
                    pattern="\d\d/\d\d"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cvc"
                    className="form-control"
                    placeholder="CVC"
                    pattern="\d{3,4}"
                    required
                    onChange={handleInputChange}
                    onFocus={handleInputFocus}
                  />
                </div>
              </div>
              <input type="hidden" name="issuer" value={issuer} />
              <div className="form-actions mt-5 mb-2 d-flex justify-content-center">
                <button className="btn btn-primary btn-block col col-auto me-4">Cancel</button>
                <button className="btn btn-primary btn-block col col-auto">Pay</button>
              </div>
            </form>
          </div>
        }
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [categoriesRes] = await Promise.all([
    fetchAPI("/categories", { populate: "*" }),
  ])

  return {
    props: {
      categories: categoriesRes.data,
    },
    revalidate: 1,
  }
}

export default Checkout;