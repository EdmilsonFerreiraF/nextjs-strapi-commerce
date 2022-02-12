
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
import BoletoMethod from '../../components/checkout/boletoMethod';

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

  let [boletoData, setBoletoData] = useState({
    type: "BOLETO",

    name: "",
    taxId: "",
    email: "",
    boletoFormData: null
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
    } else if (entity === "boleto") {
      setBoletoData({ ...boletoData, [target.name]: target.value });
    } else {
      setAddressData({ ...addressData, [target.name]: target.value });

    }
  };

  const sendPaymentData = async (entity) => {
    const description = "My wonderful Strapi blog payment"
    console.log('creditCardData.creditCardFormData', creditCardData.creditCardFormData)

    console.log('boletoData.type', boletoData.type)
    console.log('boletoData.boletoFormData.type', boletoData.boletoFormData.type)
    console.log('country', addressData.phone.slice(0, 2))
    console.log('area', addressData.phone.slice(2, 4))
    const boleto = {
      // "reference_id": this.name,
      customer: {
        name: addressData.addressFormData.name,
        email: boletoData.boletoFormData.email,
        tax_id: boletoData.boletoFormData.taxId,
        phones: [
          {
            country: addressData.phone.slice(0, 2),
            area: addressData.phone.slice(2, 4),
            number: addressData.phone.slice(2, 11),
            type: "MOBILE"
          }
        ]
      },
      items: cart.items.map(item => {
        // reference_id: items.reference_id,
        return {
          name: item.attributes.title,
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
          street: addressData.addressFormData.street,
          // number: boletoData.boletoFormData.number,
          number: addressData.addressFormData.number,
          complement: addressData.addressFormData.complement,
          locality: addressData.addressFormData.neighbourhood,
          city: addressData.addressFormData.city,
          region_code: addressData.addressFormData.state,
          // country: addressData.addressFormData.country,
          country: "BRA",
          postal_code: addressData.addressFormData.zip,
        }
      },
      notification_urls: [
        "http://localhost:3000/notifications"
      ],
      charges: [
        {
          // reference_id: this.name,
          description: description,
          amount: {
            // value: cart.total,
            value: 100,
            currency: "BRL",
          },
          payment_method: {
            type: boletoData.boletoFormData.type,
            boleto: {
              due_date: "2024-12-31",
              instruction_lines: {
                line_1: "Pagamento processado para DESC Fatura",
                line_2: "Via PagSeguro"
              },
              holder: {
                name: "Jose da Silva",
                tax_id: "22222222222",
                email: "jose@email.com",
                address: {
                  street: "Avenida Brigadeiro Faria Lima",
                  number: "1384",
                  locality: "Pinheiros",
                  city: "Sao Paulo",
                  region: "Sao Paulo",
                  region_code: "SP",
                  country: "Brasil",
                  postal_code: "01452002"
                }
              }
            }
          }
        }
      ],
    }

    const data = {
      // "reference_id": this.name,
      customer: {
        name: creditCardData.creditCardFormData?.name || debitCardData.debitCardFormData?.name || boletoData.boletoCardFormData?.name,
        email: creditCardData.creditCardFormData?.email || debitCardData.debitCardFormData?.email || boletoData.boletoCardFormData?.email,
        tax_id: creditCardData.creditCardFormData?.taxId || debitCardData.debitCardFormData?.taxId || boletoData.boletoCardFormData?.taxId,
        phones: [
          {
            country: addressData.phone.slice(0, 2),
            area: addressData.phone.slice(2, 4),
            number: addressData.phone.slice(2, 11),
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
          // value: cart.total
          value: 100
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
        "http://localhost:3000/notifications"
      ],
      charges: creditCardData.creditCardFormData && [
        {
          // reference_id: this.name,
          description: description,
          amount: {
            // value: cart.total,
            value: 100,
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
              eci: debitCardData.debitCardFormData ? "" : null
            }
          },
          holder: boletoData.boletoFormData && {
            name: "Jose da Silva",
            tax_id: "22222222222",
            email: "jose@email.com",
            address: {
              street: "Avenida Brigadeiro Faria Lima",
              number: "1384",
              locality: "Pinheiros",
              city: "Sao Paulo",
              region: "Sao Paulo",
              region_code: "SP",
              country: "Brasil",
              postal_code: "01452002"
            }
          },
          notification_urls: [
            "http://localhost:3000/order/notifications"
          ]
        }
      ],
      boleto: boletoData.boletoFormData && {
        due_date: "2024-12-31",
        instruction_lines: {
          line_1: "Pagamento processado para DESC Fatura",
          line_2: "Via PagSeguro"
        },
      }
    }

    const res = await axios.post(getStrapiURL('/api/orders/pagseguro'), boleto)
      .then(res => { console.log(res); return res })
      .catch(err => console.error(err));
    console.log('res', res)
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
      setCreditCardData({ ...creditCardData, creditCardFormData: {...creditCardData, formData } });
    } else if (entity === "debit_card") {
      setDebitCardData({ ...debitCardData, debitCardFormData: {...debitCardData, formData } });
    } else if (entity === "boleto") {
      console.log('boletoData', boletoData)
      console.log('formData', formData)
      setBoletoData({ ...boletoData, boletoFormData: {...boletoData, formData } });
    } else {

      setAddressData({ ...addressData, addressFormData: formData } );
    }

    handleNextTab()

    //  e.target.querySelector("form").reset();
    console.log('e.target', e.target)
  };

  const handleBuyButton = () => {
    sendPaymentData();
  }

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

  useEffect(() => {
    if (paymentTab === -1) {
      router.replace("http://localhost:3000/cart")
    }
  }, [paymentTab])

  return (
    <Layout categories={categories}>
      <div className="container bg-light py-4 m-auto mw-805px" onSubmit={handleNextTab} >
        <PaymentTabsMenu
          addressFormData={addressData.addressFormData}
          creditCardFormData={creditCardData.creditCardFormData}
          debitCardFormData={debitCardData.debitCardFormData}
          boletoFormData={boletoData.boletoFormData}
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
            handleBuyButton={handleBuyButton}

            handleInputChange={e => handleInputChange(e, "address")} />
        }

        {paymentTab === 1 && addressData.addressFormData &&
          <div className="container col-auto col-md-10 col-lg-10 mt-4 mb-5 h-574">
            {paymentMethod > 0 &&
              <BackToPaymentMethod handlePaymentMethod={handlePaymentMethod} />
            }
            {paymentMethod === 1 &&
              <CreditCardMethod
                creditCardData={creditCardData}
                handleCallback={handleCallback}
                handleSubmit={handleSubmit}
                handleInputChange={e => handleInputChange(e, "credit_card")}
                handleCardInputFocus={handleCardInputFocus}
                paymentTab={paymentTab}
                handlePreviousTab={handlePreviousTab}
                handleNextTab={handleNextTab}
                handleBuyButton={handleBuyButton}
              />
            }

            {paymentMethod === 2 &&
              <DebitCardMethod
                debitCardData={debitCardData}
                handleCallback={handleCallback}
                handleSubmit={handleSubmit}
                handleInputChange={e => handleInputChange(e, "debit_card")}
                handleCardInputFocus={handleCardInputFocus}
                paymentTab={paymentTab}
                handlePreviousTab={handlePreviousTab}
                handleNextTab={handleNextTab}
                handleBuyButton={handleBuyButton}
              />
            }

            {paymentMethod === 3 &&
              <BoletoMethod
                boletoData={boletoData}

                handleSubmit={handleSubmit}
                handleInputChange={e => handleInputChange(e, "boleto")}
                handleCardInputFocus={handleCardInputFocus}
                paymentTab={paymentTab}
                handlePreviousTab={handlePreviousTab}
                handleNextTab={handleNextTab}
                handleBuyButton={handleBuyButton}

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

        {paymentTab === 2 && (addressData.addressFormData && (creditCardData.creditCardFormData || debitCardData.debitCardFormData || boletoData.boletoFormData)) &&
          <>
            <ConfirmTab
              creditCardFormData={creditCardData.creditCardFormData}
              debitCardFormData={debitCardData.debitCardFormData}
              boletoFormData={boletoData.boletoFormData}
              creditCardData={creditCardData}
              debitCardData={debitCardData}
              boletoData={boletoData}
              addressFormData={addressData.addressFormData}
            />
            <PaymentTabsControl paymentTab={paymentTab}
              disabledNextTab
              handlePreviousTab={handlePreviousTab}
              handleNextTab={handleNextTab}
              handleSubmit={handleSubmit}
              handleBuyButton={handleBuyButton}
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