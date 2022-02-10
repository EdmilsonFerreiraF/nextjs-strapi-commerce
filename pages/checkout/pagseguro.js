
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

  let [addressData, setAddressData] = useState({
    name: "",
    phone: "",
    address: "",
    address2: "",
    zip: "",
    city: "",
    neighbourhood: "",
    street: "",
    state: "",
    number: null,
    complement: "",
    formData: null
  })

  let [paymentTab, setPaymentTab] = useState(0)

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setCardData({ ...cardData, issuer });
    }
  };

  const handleInputFocus = ({ target }, data, action) => {
    action({
      ...data,
      focused: target.name
    });
  };

  const handleInputChange = ({ target }, data, action) => {
    if (action === setCardData) {
      if (target.name === "number") {
        target.value = formatCreditCardNumber(target.value);
      } else if (target.name === "expiry") {
        target.value = formatExpirationDate(target.value);
      } else if (target.name === "cvc") {
        target.value = formatCVC(target.value);
      }
    }

    action({ ...data, [target.name]: target.value });
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

        {paymentTab === 0 &&
          <form class="row g-3 my-4 col-auto col-md-6 container-sm m-auto">
            <div class="col-md-6">
              <input type="name" class="form-control" id="inputName" placeholder="Nome completo"
                value={addressData.name}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control" id="inputPhone" placeholder="Telefone"
                value={addressData.phone}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-12">
              <input type="text" class="form-control" id="inputAddress" placeholder="Endereço"
                value={addressData.address}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-12">
              <input type="text" class="form-control" id="inputAddress2" placeholder="Endereço 2"
                value={addressData.address2}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-12">
              <input type="text" class="form-control" id="inputZip" placeholder="CEP"
                value={addressData.zip}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control" id="inputCity" placeholder="Cidade"
                value={addressData.city}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control" id="inputNeighbourhood" placeholder="Bairro"
                value={addressData.neighbourhood}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-md-12">
              <input type="text" class="form-control" id="inputStreet" placeholder="Rua"
                value={addressData.street}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-md-6">
              <select id="inputState" class="form-select"
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                value={addressData.state}>
                <option selected>Estado</option>
                <option>...</option>
              </select>
            </div>
            <div class="col-md-6">
              <input type="text" class="form-control" id="inputNumber" placeholder="Número"
                value={addressData.number}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-md-12">
              <input type="text" class="form-control" id="inputComplement" placeholder="Complemento"
                value={addressData.complement}
                onChange={e => handleInputChange(e, addressData, setAddressData)}
                onFocus={e => handleInputFocus(e, addressData, setAddressData)}
              />
            </div>
            <div class="col-12">
              <div class="form-check">
                <input class="form-check-input" type="checkbox" id="gridCheck" />
                <label class="form-check-label" for="gridCheck">
                  Salvar endereço
                </label>
              </div>
            </div>
            <div class="col-12">
              <button type="submit" class="btn btn-primary">Sign in</button>
            </div>
          </form>
        }

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
                  onChange={e => handleInputChange(e, cardData, setCardData)}
                  onFocus={e => handleInputFocus(e, cardData, setCardData)}
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
                  onChange={e => handleInputChange(e, cardData, setCardData)}
                  onFocus={e => handleInputFocus(e, cardData, setCardData)}
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
                    onChange={e => handleInputChange(e, cardData, setCardData)}
                    onFocus={e => handleInputFocus(e, cardData, setCardData)}
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
                    onChange={e => handleInputChange(e, cardData, setCardData)}
                    onFocus={e => handleInputFocus(e, cardData, setCardData)}
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