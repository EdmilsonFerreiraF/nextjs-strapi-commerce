import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle, Badge, Col } from "reactstrap";

import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"
import GlobalContext from "../context/GlobalContext";
import { getStrapiMedia } from "../lib/media"

function Cart({ categories }) {
  const globalContext = useContext(GlobalContext);
  const router = useRouter();

  const { cart, isAuthenticated } = globalContext;

  return (
    <Layout categories={categories}>
      <Card style={{ padding: "10px 5px" }} className="cart container-md">
        <h1 className="m-4 text-center">Cart</h1>

        <h4 className="text-center" style={{ margin: 10 }}>Your Order:</h4>
        <hr />
        <CardBody style={{ padding: 10 }}>
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
                            <div>
                              <div>
                                <Card className="cart">
                                  <CardTitle className="text-center my-2">Quantity:</CardTitle>
                                  <div className="text-center my-2">
                                    <small id="item-price" className="fw-bold">${item.attributes.price}&nbsp; 30,00</small>
                                  </div>
                                  <Col className="mx-auto my-2" style={{
                                    padding: 0,
                                    display: "flex",
                                    alignItems: "center"
                                  }}>
                                    <div>
                                      <Button
                                        className="rounded-0"
                                        color="secondary"
                                        // onClick={removeQuantity}
                                        style={{
                                          padding: "2px 7px"
                                        }}
                                      >
                                        <i className="bi bi-dash"></i>
                                      </Button>
                                    </div>
                                    <div
                                      className="items-one"
                                      key={item.id}
                                    >
                                      <div>
                                        <span id="item-quantity">
                                          <input id="quantity" style={{
                                            padding: "6px",
                                            background: "#515a62",
                                            color: "white",
                                            fontSize: "17px",
                                            textAlign: "center",
                                            width: "40px",
                                            borderRadius: "3px",
                                            border: "1px",
                                          }} type="number" value={item.attributes.quantity} onChange={e => handleQuantity(e)} />
                                        </span>
                                      </div>
                                    </div>
                                    <div>
                                      <Button
                                        className="rounded-0"
                                        color="secondary"
                                        // onClick={addQuantity}
                                        style={{
                                          padding: "2px 7px"
                                        }}
                                      >
                                        <i className="bi bi-plus"></i>
                                      </Button>
                                    </div>
                                  </Col>
                                </Card>
                              </div>
                            </div>
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
            {isAuthenticated ? (
              cart.items.length > 0 ? (
                <div className="d-flex justify-content-center flex-column align-items-center my-3">
                  <Badge style={{ width: 200, padding: 10 }} className="mb-4" color="light">
                    <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
                    <h3>${globalContext.cart.total.toFixed(2)}</h3>
                  </Badge>
                  <div
                    style={{
                      marginTop: 10,
                      marginRight: 10,
                    }}
                  >
                    <Link href="/checkout">
                      <Button style={{ width: "100%"}} color="primary" className="btn-lg">
                        <a className="text-white">Order</a>
                      </Button>
                    </Link>
                  </div>
                </div>
              ) : (
                <>
                  {router.pathname === "/checkout" && (
                    <small
                      style={{ color: "blue" }}
                      onClick={() => window.history.back()}
                    >
                      back to restaurant
                    </small>
                  )}
                </>
              )
            ) : (
              <h5>Login to Order</h5>
            )}
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