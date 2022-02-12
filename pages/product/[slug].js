import { fetchAPI } from "../../lib/api"
import {
  Button,
  Col,
  Card,
  CardTitle
} from "reactstrap";
import { useContext, useState } from "react"

import { getStrapiMedia } from "../../lib/media"
import GlobalContext from "../../context/GlobalContext";
import Layout from "../../components/layout"
import CarouselIndicators from "../../components/carousel/carouselIndicators";
import CarouselItem from "../../components/carousel/carouselItem";
import CarouselControls from "../../components/carousel/carouselControls";

const Product = ({ product, categories }) => {
  const globalContext = useContext(GlobalContext);

  const productFromCart = globalContext.cart.items.find(item => item.id === product.id)

  let [quantity, setQuantity] = useState(1)

  const removeQuantity = () => {
    if (quantity > 1) {
      setQuantity(prevState => prevState - 1)
    }
  }

  const addQuantity = () => {
    setQuantity(prevState => prevState + 1)
  }

  const handleQuantity = (e) => {
    setQuantity(e.target.value)
  }

  return (
    <Layout categories={categories}>
    <div className="uk-card uk-card-muted">
      <div className="uk-card-body">
        <p id="category" className="uk-text-uppercase">
          {product.attributes.category.name}
        </p>
        <h1 className="m-5 text-center">
          {product.attributes.title}
        </h1>
        <div className="card-footer container-sm d-flex">
          <div id="carouselExampleIndicators" className="carousel slide col-6" data-bs-interval="false">
            <CarouselIndicators />
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={getStrapiMedia({ data: product.attributes.image.data[0] })} className="d-block" style={{ height: "450px" }} alt="..." />
              </div>
              <CarouselItem product={product} />
              <CarouselControls />
            </div>
          </div>

          <div className="col-6">
            <h1 className="m-2 text-center">
              {product.attributes.title}
            </h1>

            <h2 id="category" className="uk-text-uppercase text-center">
              {product.attributes.description}
            </h2>

            <div className="col product-actions mt-5 mx-auto">
              <div style={{ padding: 0 }}>
                <Button
                  className="col-4 rounded-0"
                  color="secondary"
                  onClick={() => globalContext.removeItem(product)}
                >
                  <i className="bi bi-cart"></i> Buy
                </Button>

                {productFromCart ?
                  (
                    <>
                      <Button
                        className="col-8 rounded-0"
                        color="secondary"
                        onClick={() => globalContext.removeItem(product)}

                      >
                        <i className="bi bi-cart-dash"></i>Remove from cart
                      </Button>
                    </>
                  )
                  :
                  (
                    <Button
                      className="rounded-0"
                      color="secondary"
                      onClick={() => globalContext.addItem(product, quantity)}
                    >
                      <i className="bi bi-cart-plus"></i>Add to cart
                    </Button>
                  )
                }
              </div>
              <div>
                <Card style={{ padding: "10px 5px" }} className="cart">
                  <CardTitle className="text-center my-2">Quantity:</CardTitle>
                  <div className="text-center my-2">
                    <span id="item-price">&nbsp; $ {product.price}</span>
                  </div>
                  <Col className="mx-auto my-2" xs="3" style={{
                    padding: 0,
                    display: "flex",
                    alignItems: "center"
                  }}>

                    <div>
                      <Button
                        className="rounded-0"
                        color="secondary"
                        onClick={removeQuantity}
                      >
                        <i className="bi bi-dash"></i>
                      </Button>
                    </div>
                    <div
                      className="items-one"
                      key={product.id}
                    >
                      <div>
                        <span id="item-quantity">
                          <input id="quantity" style={{
                            padding: "7px",
                            background: "#515a62",
                            color: "white",
                            fontSize: "20px",
                            textAlign: "center",
                            width: "48px",
                            borderRadius: "3px",
                            border: "1px",
                          }} type="number" value={quantity} onChange={e => handleQuantity(e)} />
                        </span>
                      </div>
                    </div>
                    <div>
                      <Button
                        className="rounded-0"
                        color="secondary"
                        onClick={addQuantity}
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
    </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const productsRes = await fetchAPI("/products", { fields: ["slug"] })

  return {
    paths: productsRes.data.map((product) => ({
      params: {
        slug: product.attributes.slug,
      },
    })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const productsRes = await fetchAPI("/products", {
    filters: {
      slug: params.slug,
    },
    populate: "*",
  })
  const [categoriesRes] = await Promise.all([
    fetchAPI("/categories", { populate: "*" }),
  ])


  return {
    props: { product: productsRes.data[0], categories: categoriesRes.data },
    revalidate: 1,
  }
}

export default Product
