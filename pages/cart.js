import React, { useContext } from "react";
import { Card, CardBody } from "reactstrap";

import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"
import GlobalContext from "../context/GlobalContext";
import { getStrapiMedia } from "../lib/media"

function Cart({ categories }) {
  const globalContext = useContext(GlobalContext);

  const { cart } = globalContext;

  return (
    <Layout categories={categories}>
      <Card style={{ padding: "10px 5px" }} className="cart container-md">
        <h1 className="m-5 text-center">Cart</h1>

        <h3 className="text-center" style={{ margin: 10 }}>Your Order:</h3>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div className="m-4 mb-5">
            <h4 className="text-center">Items:</h4>
          </div>
          <div className="m-2">
            {cart.items.map((item) => {
              if (item.quantity > 0) {
                return (
                  <div
                    className="container items-one"
                    style={{ marginBottom: 15 }}
                    key={item.id}
                  >
                    <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
                      <div className="col">
                        <div className="card">
                          <img src={getStrapiMedia({ data: item.attributes.image.data[0] })} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{item.attributes.title}</h5>
                            <p className="card-text">{item.attributes.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card">
                          <img src={getStrapiMedia({ data: item.attributes.image.data[0] })} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{item.attributes.title}</h5>
                            <p className="card-text">{item.attributes.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card">
                          <img src={getStrapiMedia({ data: item.attributes.image.data[0] })} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{item.attributes.title}</h5>
                            <p className="card-text">{item.attributes.description}</p>
                          </div>
                        </div>
                      </div>
                      <div className="col">
                        <div className="card">
                          <img src={getStrapiMedia({ data: item.attributes.image.data[0] })} className="card-img-top" alt="..." />
                          <div className="card-body">
                            <h5 className="card-title">{item.attributes.title}</h5>
                            <p className="card-text">{item.attributes.description}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }
            })}
          </div>
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </Layout>
  )
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

export default Cart;