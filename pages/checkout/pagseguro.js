
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
import DebitCardMethod from '../../components/checkout/debitCardMethod';
import ConfirmTab from '../../components/checkout/confirmTab';
import PaymentTabsControl from '../../components/checkout/paymentTabsControl';
import PaymentMethods from '../../components/checkout/paymentMethods';

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
    creditCardFormData: null
  })

  let [debitCardData, setDebitCardData] = useState({
    type: "DEBIT_CARD",
    number: "",
    name: "",
    installments: "Parcelas",
    expiry: "",
    cvc: "",
    taxId: "",
    store: "",
    issuer: "",
    focused: "",
    debitCardFormData: null
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
    addressFormData: null
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

  const handleInputChange = ({ target }, entity) => {
    if (entity === "credit_card") {
      if (target.name === "number") {
        target.value = formatCreditCardNumber(target.value);
      } else if (target.name === "expiry") {
        target.value = formatExpirationDate(target.value);
      } else if (target.name === "cvc") {
        target.value = formatCVC(target.value);
      }

      setCreditCardData({ ...creditCardData, [target.name]: target.value });
    } else if (entity === "debit_card") {
      setDebitCardData({ ...debitCardData, [target.name]: target.value });
    } else {
      setAddressData({ ...addressData, [target.name]: target.value });
    }
  };

  const sendPaymentData = async (entity) => {
    const description = "My wonderful Strapi blog payment"

    const data = {
      // "reference_id": this.name,
      customer: {
        name: creditCardData.creditCardFormData.name,
        email: creditCardData.creditCardFormData.email,
        tax_id: creditCardData.creditCardFormData.taxId,
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
          unit_amount: 1,
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
            type: creditCardData.creditCardFormData ? creditCardData.creditCardFormData.type : debitCardData.debitCardFormData.type, 
            installments: creditCardData.creditCardFormData.installments,
            capture: entity === "credit_card",
            soft_descriptor: entity === "credit_card" ? "My wonderful Strapi blog" : null,
            card: {
              number: creditCardData.creditCardFormData.number,
              exp_month: creditCardData.creditCardFormData.expiry.slice(0, 2),
              exp_year: creditCardData.creditCardFormData.expiry.slice(2, 4),
              security_code: creditCardData.creditCardFormData.cvc,
              holder: {
                name: creditCardData.creditCardFormData.name,
              },
              store: entity === "credit_card" ? creditCardData.creditCardFormData.store : null,
            },
            authentication_method: {
              type: debitCardData.debitCardFormData ? "INAPP" : null,
              cavv: debitCardData.debitCardFormData ? "" : null,
              eci: debitCardData.debitCardFormData ? ""  : null 
            }
          },
          notification_urls: [
            "http://localhost:3000/order/notifications"
          ]
        }
      ]
    }

    await axios.post(getStrapiURL('/pagseguro', data))
      .then(res => { console.log(res); return res })
      .catch(err => console.error(err));
  }

  const handleSubmit = (e, entity) => {
    e.preventDefault();
    const { issuer } = creditCardData;
    const formData = [...e.target.elements]
      .filter(d => d.name)
      .reduce((acc, d) => {
        acc[d.name] = d.value;
        return acc;
      }, {});

    if (entity === "credit_card") {
      setCreditCardData({ ...creditCardData, creditCardFormData: formData });
    } else if (entity === "debit_card") {
      setDebitCardData({ ...debitCardData, debitCardFormData: formData });
    } else {
      setAddressData({ ...addressData, addressFormData: formData });
    }

    handleNextTab()

    //  e.target.querySelector("form").reset();
    console.log('e.target', e.target)
  };

  // sendPaymentData();

  const handlePreviousTab = () => {
    setPaymentTab(paymentTab - 1)
  }

  const handleNextTab = () => {
    setPaymentTab(paymentTab + 1)
  }

  const handlePaymentTab = (tab) => {
    setPaymentTab(tab)
  }

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method)
  }

  console.log('paymentTab', paymentTab)
  console.log('paymentMethod', paymentMethod)
  useEffect(() => {
    if (paymentTab === -1) {
      router.replace("http://localhost:3000/cart")
    }
  }, [paymentTab])

  return (
    <Layout categories={categories}>
      <div className="container bg-light py-4 m-auto" onSubmit={handleNextTab} >
        <PaymentTabsMenu
          addressFormData={addressData.addressFormData}
          creditCardFormData={creditCardData.creditCardFormData}
          debitCardFormData={creditCardData.debitCardFormData}
          paymentTab={paymentTab} handlePaymentTab={handlePaymentTab}
        />
        {console.log('addressData.addressFormData', addressData.addressFormData)}
        {paymentTab === 0 &&
          <AddressTab
            paymentTab={paymentTab}
            handlePreviousTab={handlePreviousTab}
            handleNextTab={handleNextTab}
            handleSubmit={handleSubmit}
            addressData={addressData}
            handleAddressInputFocus={handleAddressInputFocus}
            handleInputChange={handleInputChange} />
        }

        {paymentTab === 1 && addressData.addressFormData &&
          <div className="container col-auto col-md-10 col-lg-6 mt-4 mb-5 h-574">
            {paymentMethod > 0 &&
              <BackToPaymentMethod handlePaymentMethod={handlePaymentMethod} />
            }
            {paymentMethod === 1 &&
              <CreditCardMethod
                creditCardData={creditCardData}
                handleCallback={handleCallback}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                handleCardInputFocus={handleCardInputFocus}
                paymentTab={paymentTab}
                handlePreviousTab={handlePreviousTab}
                handleNextTab={handleNextTab}
              />
            }

            {paymentMethod === 2 &&
              <DebitCardMethod
                debitCardData={debitCardData}
                handleCallback={handleCallback}
                handleSubmit={handleSubmit}
                handleInputChange={handleInputChange}
                handleCardInputFocus={handleCardInputFocus}
                paymentTab={paymentTab}
                handlePreviousTab={handlePreviousTab}
                handleNextTab={handleNextTab}
              />
            }

            {paymentMethod === 0 &&
             <PaymentMethods
             handlePaymentMethod={handlePaymentMethod}
             paymentTab={paymentTab}
             disabledNextTab
             handlePreviousTab={handlePreviousTab}
             handleNextTab={handleNextTab}
             handleSubmit={handleSubmit}
             />
            }
          </div>
        }

        {paymentTab === 2 && (addressData.addressFormData && (creditCardData.creditCardFormData || debitCardData.debitCardFormData)) &&
          <>
            <ConfirmTab creditCardData={creditCardData} addressData={addressData} />
            <PaymentTabsControl paymentTab={paymentTab}
              disabledNextTab
              handlePreviousTab={handlePreviousTab}
              handleNextTab={handleNextTab}
              handleSubmit={handleSubmit}
            />
          </>
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