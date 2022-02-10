
import { useState, useEffect, useContext } from 'react'
import Card from 'react-credit-cards';
import { useRouter } from 'next/router';

import Layout from "../../components/layout"
import { fetchAPI, getStrapiURL } from "../../lib/api"
import {
  formatCreditCardNumber,
  formatCVC,
  formatExpirationDate,
} from "../../components/utils";
import 'react-credit-cards/es/styles-compiled.css';
import axios from 'axios'
import GlobalContext from "../../context/GlobalContext";

const Checkout = ({ categories }) => {
  const globalContext = useContext(GlobalContext);

  const { cart } = globalContext;

  let [cardData, setCardData] = useState({
    type: "CREDIT_CARD",
    number: "",
    name: "",
    installments: "Parcelas",
    expiry: "",
    cvc: "",
    taxId: "",
    store: "",
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
    state: "Estado",
    number: "",
    complement: "",
    formData: null
  })

  let [paymentTab, setPaymentTab] = useState(0)

  let [paymentMethod, setPaymentMethod] = useState(0)

  const router = useRouter()

  const handleCallback = ({ issuer }, isValid) => {
    if (isValid) {
      setCardData({ ...cardData, issuer });
    }
  };

  const handleCardInputFocus = ({ target }) => {
    setCardData({
      ...cardData,
      focused: target.name
    });
  };
  const handleAddressInputFocus = ({ target }) => {
    setAddressData({
      ...addressData,
      focused: target.name
    });
  };

  const handleAddressInputChange = ({ target }) => {
    setAddressData({ ...addressData, [target.name]: target.value });
  }

  const handleCardInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setCardData({ ...cardData, [target.name]: target.value });
  };

  const sendPaymentData = async () => {
    const description = "My wonderful Strapi blog payment"

    const data = {
      // "reference_id": this.name,
      customer: {
        name: cardData.name,
        email: cardData.email,
        tax_id: cardData.taxId,
        phones: [
          {
            country: addressData.phone.slice(0, 2),
            area: addressData.phone.slice(2, 6),
            number: addressData.phone.slice(6, 10),
            // type: addressData.phone.slice(0, 1),
          }
        ]
      },
      items: cart.items.map(item => {
        // reference_id: items.reference_id,
        return {
          name: item.name,
          quantity: item.quantity,
          // unit_amount: item.unit_amount,
        }
      }
      ),
      qr_code: {
        amount: {
          value: cart.total
        }
      },
      shipping: {
        address: {
          street: addressData.street,
          number: addressData.number,
          complement: addressData.complement,
          locality: addressData.neighbourhood,
          city: addressData.city,
          // region_code: addressData.region_code,
          country: addressData.country,
          postal_code: addressData.zip,
        }
      },
      notification_urls: [
        notification_urls
      ],
      charges: [
        {
          // reference_id: this.name,
          description: description,
          amount: {
            value: cart.total,
            currency: "BRL",
          },
          payment_method: {
            type: cardData.type,
            installments: cardData.installments,
            capture: cardData.store,
            card: {
              number: cardData.number,
              exp_month: cardData.expiry.slice(0, 2),
              exp_year: cardData.expiry.slice(2, 4),
              security_code: cardData.cvc,
              holder: {
                name: cardData.name,
              },
              store: cardData.store,
            }
          },
          notification_urls: [

          ]
        }
      ]
    }

    await axios.post(getStrapiURL('/pagseguro', data))
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

    sendPaymentData();

    Checkout.form.reset();
  };

  const handlePreviousTab = () => {
    setPaymentTab(prevState => prevState - 1)

    console.log('paymentTab', paymentTab)

  }

  const handleNextTab = () => {
    setPaymentTab(prevState => prevState + 1)
  }

  const handlePaymentTab = (tab) => {
    setPaymentTab(tab)
  }

  useEffect(() => {
    if (paymentTab === -1) {
      router.replace("http://localhost:3000/cart")
    }
  }, [paymentTab])

  const { name, number, expiry, cvc, focused, issuer, formData } = cardData;

  return (
    <Layout categories={categories}>
      <div className="container bg-light py-4 m-auto">
        <ul className="nav nav-pills container-md justify-content-center mb-5">
          <li className="nav-item">
            <a className="nav-link disabled">Carrinho</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link${paymentTab === 0 ? ' active' : ''}`} onClick={() => handlePaymentTab(0)} aria-current="page" href="#">Endereço</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link${paymentTab === 1 ? ' active' : ''}`} onClick={() => handlePaymentTab(1)} href="#">Forma de pagamento</a>
          </li>
          <li className="nav-item">
            <a className={`nav-link${paymentTab === 2 ? ' active' : ''}`} onClick={() => handlePaymentTab(2)} href="#">Confirmar</a>
          </li>
        </ul>

        {paymentTab === 0 &&
          <form className="row g-3 col-auto col-md-10 col-lg-6 container-sm m-auto h-500 mb-5 px-0">
            <div className="col-md-6 mt-3 mt-md-0">
              <input type="name" className="form-control" id="inputName" placeholder="Nome completo"
                value={addressData.name}
                onChange={handleAddressInputChange}
                onFocus={handleAddressInputFocus}
                name="name"
              />
            </div>
            <div className="col-md-6 mt-3 mt-md-0">
              <input type="number" className="form-control" id="inputPhone" placeholder="Telefone"
                value={addressData.phone}
                onChange={handleAddressInputChange}
                onFocus={handleAddressInputFocus}
                name="phone"
                pattern="\d{11}"
              />
            </div>
            <div className="col-12">
              <input type="text" className="form-control" id="inputAddress" placeholder="Endereço"
                value={addressData.address}
                onChange={handleAddressInputChange}
                onFocus={handleAddressInputFocus}
                name="address"
              />
            </div>
            <div className="col-12">
              <input type="text" className="form-control" id="inputAddress2" placeholder="Endereço 2"
                value={addressData.address2}
                onChange={handleAddressInputChange}
                onFocus={handleAddressInputFocus}
                name="address2"
              />
            </div>
            <div className="col-12">
              <input type="text" className="form-control" id="inputZip" placeholder="CEP"
                value={addressData.zip}
                onChange={handleAddressInputChange}
                onFocus={handleAddressInputFocus}
                name="zip"
              />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" id="inputCity" placeholder="Cidade"
                value={addressData.city}
                onChange={handleAddressInputChange}
                onFocus={handleAddressInputFocus}
                name="city"
              />
            </div>
            <div className="col-md-6">
              <input type="text" className="form-control" id="inputNeighbourhood" placeholder="Bairro"
                value={addressData.neighbourhood}
                onChange={handleAddressInputChange}
                onFocus={handleAddressInputFocus}
                name="neighbourhood"
              />
            </div>
            <div className="col-md-12">
              <input type="text" className="form-control" id="inputStreet" placeholder="Rua"
                value={addressData.street}
                onChange={handleAddressInputChange}
                onFocus={handleAddressInputFocus}
                name="street"
              />
            </div>
            <div className="col-6 col-md-6">
              <select id="inputState" className="form-select"
                value={addressData.state}
                name="state"
                onChange={handleAddressInputChange}>
                <option>Estado</option>
                <option>...</option>
              </select>
            </div>
            <div className="col-6 col-md-6">
              <input type="text" className="form-control" id="inputNumber" placeholder="Número"
                value={addressData.number}
                onChange={handleAddressInputChange}
                name="number"
                onFocus={e => handleAddressInputFocus(e, addressData, "address")}
              />
            </div>
            <div className="col-md-12">
              <input type="text" className="form-control" id="inputComplement" placeholder="Complemento"
                value={addressData.complement}
                onChange={handleAddressInputChange}
                name="complement"
                onFocus={e => handleAddressInputFocus(e, addressData, "address")}
              />
            </div>
            <div className="col-12">
              <div className="form-check">
                <input className="form-check-input" type="checkbox" id="gridCheck" />
                <label className="form-check-label" htmlFor="gridCheck">
                  Salvar endereço
                </label>
              </div>
            </div>
          </form>
        }

        {paymentTab === 1 &&
          <div className="container col-auto col-md-10 col-lg-6 mt-4 mb-5 h-500">
            <div className="d-flex">
              <i class="bi bi-arrow-left"></i>
              <p className="ms-2">Método</p>
            </div>

            <div className="mb-5 g-4 text-center row row-cols-2">
              <div className="">
                <h5 className="mb-4">Cartão de crédito</h5>
                <img className="rounded mx-auto d-block mw-150px" src="/img/credit_card.png" />
              </div>
              <div className="">
                <h5 className="mb-4">Cartão de débito</h5>
                <img className="rounded mx-auto d-block mw-150px" src="/img/debit_card.png" />
              </div>
              <div className="">
                <h5 className="mb-4">Boleto</h5>
                <img className="rounded mx-auto d-block mw-150px" src="/img/boleto.png" />
              </div>
              <div className="">
                <h5 className="mb-4">PIX</h5>
                <img className="rounded mx-auto d-block mw-150px" src="https://logopng.com.br/logos/pix-106.png" />
              </div>
            </div>

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
                  onChange={handleCardInputChange}
                  value={cardData.number}
                  onFocus={handleCardInputFocus}
                />
                {/* <small className="position-absolute">E.g.: 49..., 51..., 36..., 37...</small> */}
              </div>
              <div className="row my-4">
                <div className="form-group col-6 col-md-6">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="Name"
                    required
                    onChange={handleCardInputChange}
                    value={cardData.name}
                    onFocus={handleCardInputFocus}
                  />
                </div>
                <div className="col-6 col-md-6">
                  <select id="inputInstallments" className="form-select"
                    value={cardData.installments}
                    name="installments"
                    onChange={handleCardInputChange}>
                    <option>Parcelas</option>
                    <option>...</option>
                  </select>
                </div>
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
                    onChange={handleCardInputChange}
                    value={cardData.expiry}
                    onFocus={handleCardInputFocus}
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
                    onChange={handleCardInputChange}
                    value={cardData.cvc}
                    onFocus={handleCardInputFocus}
                  />
                </div>
                <div className="col-6">
                  <input
                    type="tel"
                    name="cpf"
                    className="form-control"
                    placeholder="CPF"
                    pattern="\d{3,4}"
                    required
                    onChange={handleCardInputChange}
                    value={cardData.taxId}
                    onFocus={handleCardInputFocus}
                  />
                </div>
              </div>
              <div className="col-12 mt-3">
                <div className="form-check">
                  <input className="form-check-input" type="checkbox" id="gridCheck" />
                  <label className="form-check-label" htmlFor="gridCheck">
                    Salvar cartão
                  </label>
                </div>
              </div>
              <input type="hidden" name="issuer" value={issuer} />
            </form>
          </div>
        }

        {paymentTab === 2 &&
          <div className="container-md mt-4 mb-5 h-500">
            <h4 className="mb-1 text-center">Seus dados estão corretos?</h4>
            <div className="d-flex justify-content-between col-12 col-sm-10 col-md-8 col-lg-6 m-auto">
              <div>
                <h5 className="mt-4 mb-3">Endereço</h5>
                <p>Nome: <span className="fw-bold ps-1">{addressData.name}</span></p>
                <p>Telefone: <span className="fw-bold ps-1">{addressData.phone}</span></p>
                <p>Endereço: <span className="fw-bold ps-1">{addressData.address}</span></p>
                <p>Endereço 2: <span className="fw-bold ps-1">{addressData.address2}</span></p>
                <p>CEP: <span className="fw-bold ps-1">{addressData.zip}</span></p>
                <p>Cidade: <span className="fw-bold ps-1">{addressData.city}</span></p>
                <p>Bairro: <span className="fw-bold ps-1">{addressData.neighbourhood}</span></p>
                <p>Rua: <span className="fw-bold ps-1">{addressData.street}</span></p>
                <p>Estado: <span className="fw-bold ps-1">{addressData.state}</span></p>
                <p>Number: <span className="fw-bold ps-1">{addressData.number}</span></p>
                <p>Complemento: <span className="fw-bold ps-1">{addressData.complement}</span></p>
              </div>
              <div>
                <h5 className="mt-4 mb-3">Forma de pagamento</h5>
                <p>Cartão de crédito</p>
                <p>Número: <span className="fw-bold">{addressData.number}</span></p>
                <p>Nome: <span className="fw-bold">{addressData.name}</span></p>
                <p>Data de expiração: <span className="fw-bold">{addressData.expiry}</span></p>
                <p>Código: <span className="fw-bold">{addressData.cvc}</span></p>
              </div>
            </div>
          </div>
        }
        <div className="form-actions mt-3 d-flex justify-content-center">
          <button onClick={handlePreviousTab} className="btn btn-primary btn-block col col-auto me-4">Voltar</button>
          {paymentTab < 2 ?
            <button onClick={handleNextTab} className="btn btn-primary btn-block col col-auto">Prosseguir</button>
            :
            <button onClick={handleSubmit} className="btn btn-primary btn-block col col-auto">Comprar</button>
          }
        </div>
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