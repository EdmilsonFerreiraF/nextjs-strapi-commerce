
import { useState, useEffect, useContext } from 'react'
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
import PaymentTabsMenu from '../../components/checkout/paymentTabsMenu';
import AddressTab from '../../components/checkout/addressTab';
import BackToPaymentMethod from '../../components/checkout/backToPaymentMethod';
import CreditCardMethod from '../../components/checkout/creditCardMethod';
import ConfirmTab from '../../components/checkout/confirmTab';
import PaymentTabsControl from '../../components/checkout/paymentTabsControl';

const Checkout = ({ categories }) => {
  const globalContext = useContext(GlobalContext);

  const { cart } = globalContext;

  let [creditCardData, setCreditCardData] = useState({
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

  const handleCallback = ({ issuer }, isValid, entity) => {
    if (isValid) {
      if (entity === "credit_card") {
        setCreditCardData({ ...creditCardData, issuer });
      } else {
        setDebitCardData({ ...debitCardData, issuer });
      }
    }
  };

  const handleCardInputFocus = ({ target }) => {
    setCreditCardData({
      ...creditCardData,
      focused: target.name
    });
  };
  const handleAddressInputFocus = ({ target }) => {
    setAddressData({
      ...addressData,
      focused: target.name
    });
  };

  const handleAddressInputChange = ({ target }, entity) => {
    if (entity === "card") {
      setCreditCardData({ ...creditCardData, [target.name]: target.value });
    } else {
      setAddressData({ ...addressData, [target.name]: target.value });
    }
  }

  const handleCardInputChange = ({ target }) => {
    if (target.name === "number") {
      target.value = formatCreditCardNumber(target.value);
    } else if (target.name === "expiry") {
      target.value = formatExpirationDate(target.value);
    } else if (target.name === "cvc") {
      target.value = formatCVC(target.value);
    }

    setCreditCardData({ ...creditCardData, [target.name]: target.value });
  };

  const sendPaymentData = async () => {
    const description = "My wonderful Strapi blog payment"

    const data = {
      // "reference_id": this.name,
      customer: {
        name: creditCardData.name,
        email: creditCardData.email,
        tax_id: creditCardData.taxId,
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
            type: creditCardData.type,
            installments: creditCardData.installments,
            capture: creditCardData.store,
            card: {
              number: creditCardData.number,
              exp_month: creditCardData.expiry.slice(0, 2),
              exp_year: creditCardData.expiry.slice(2, 4),
              security_code: creditCardData.cvc,
              holder: {
                name: creditCardData.name,
              },
              store: creditCardData.store,
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
    const { issuer } = creditCardData;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    setCreditCardData({ ...creditCardData, formData });

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

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method)
  }

  console.log('paymentMethod', paymentMethod)
  useEffect(() => {
    if (paymentTab === -1) {
      router.replace("http://localhost:3000/cart")
    }
  }, [paymentTab])

  return (
    <Layout categories={categories}>
      <div className="container bg-light py-4 m-auto">
        <PaymentTabsMenu paymentTab={paymentTab} handlePaymentTab={handlePaymentTab} />

        {paymentTab === 0 &&
          <AddressTab addressData={addressData} handleAddressInputFocus={handleAddressInputFocus} handleAddressInputChange={handleAddressInputChange} />
        }

        {paymentTab === 1 &&
          <div className="container col-auto col-md-10 col-lg-6 mt-4 mb-5 h-574">
            {paymentMethod > 0 &&
              <BackToPaymentMethod handlePaymentMethod={handlePaymentMethod} />
            }
            {paymentMethod === 1 &&
              <CreditCardMethod
                creditCardData={creditCardData}
                handleCallback={handleCallback}
                handleSubmit={handleSubmit}
                handleCardInputChange={handleCardInputChange}
                handleCardInputFocus={handleCardInputFocus}
              />
            }

            {paymentMethod === 0 &&
              <div className="align-items-center h-100 text-center row row-cols-2">
                <div className="">
                  <h5 className="mb-4">Cartão de crédito</h5>
                  <div onClick={() => handlePaymentMethod(1)}>
                    <img className="rounded mx-auto d-block mw-150px" src="/img/credit_card.png" />
                  </div>
                </div>
                <div className="">
                  <h5 className="mb-4">Cartão de débito</h5>
                  <div onClick={() => handlePaymentMethod(2)}>
                    <img className="rounded mx-auto d-block mw-150px" src="/img/debit_card.png" />
                  </div>
                </div>
                <div className="">
                  <h5 className="mb-4">Boleto</h5>
                  <div onClick={() => handlePaymentMethod(3)}>
                    <img className="rounded mx-auto d-block mw-150px" src="/img/boleto.png" />
                  </div>
                </div>
                <div className="">
                  <h5 className="mb-4">PIX</h5>
                  <div onClick={() => handlePaymentMethod(4)}>
                    <img className="rounded mx-auto d-block mw-150px" src="https://logopng.com.br/logos/pix-106.png" />
                  </div>
                </div>
              </div>
            }
          </div>
        }

        {paymentTab === 2 &&
          <ConfirmTab creditCardData={creditCardData} addressData={addressData} />
        }
        <PaymentTabsControl paymentTab={paymentTab}
          handlePreviousTab={handlePreviousTab}
          handleNextTab={handleNextTab}
          handleSubmit={handleSubmit}
        />
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