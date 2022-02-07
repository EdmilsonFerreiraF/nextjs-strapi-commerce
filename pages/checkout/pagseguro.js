
import { useState, useEffect } from 'react'
import Card from 'react-credit-cards';

import Layout from "../../components/layout"
import { fetchAPI } from "../../lib/api"
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
    
      const { name, number, expiry, cvc, focused, issuer, formData } = cardData;

        return (
            <Layout categories={categories}>
                <div className="container-md">
                    <div className="mb-5">
                        <Card
                            number={number}
                            name={name}
                            expiry={expiry}
                            cvc={cvc}
                            focused={focused}
                        />
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