
import { useState, useEffect } from 'react'
import Card from 'react-credit-cards';

import Layout from "../../components/layout"
import { fetchAPI } from "../../lib/api"
import {
    formatCreditCardNumber,
    formatCVC,
    formatExpirationDate,
} from "../../components/utils";
import 'react-credit-cards/es/styles-compiled.css';

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
    
      const handleCallback = ({ issuer }, isValid) => {
        if (isValid) {
          setCardData({...cardData, issuer });
        }
      };

      const handleInputFocus = ({ target }) => {
        setCardData({...cardData,
          focused: target.name
        });
      };

      const handleSubmit = e => {
        e.preventDefault();
        const { issuer } = cardData;
        const formData = [...e.target.elements]
          .filter(d => d.name)
          .reduce((acc, d) => {
            acc[d.name] = d.value;
            return acc;
          }, {});
    
        setCardData({...cardData, formData });

        form.reset();
      };

      const { name, number, expiry, cvc, focused, issuer, formData } = cardData;

        return (
            <Layout categories={categories}>
                        <Card
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                            callback={handleCallback}
                        />
                    <form ref={c => (Checkout.form = c)} onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input
                                type="tel"
                                name="number"
                                className="form-control"
                                placeholder="Card Number"
                                pattern="[\d| ]{16,22}"
                                required
                                onFocus={handleInputFocus}
                            />
                            <small>E.g.: 49..., 51..., 36..., 37...</small>
                        </div>
                        <div className="form-group">
                            <input
                                type="text"
                                name="name"
                                className="form-control"
                                placeholder="Name"
                                required
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
                                onFocus={handleInputFocus}
                                />
                            </div>
                        <input type="hidden" name="issuer" value={issuer} />
                        <div className="form-actions">
                            <button className="btn btn-primary btn-block">Pay</button>
                        </div>
                        </div>
                    </form>
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