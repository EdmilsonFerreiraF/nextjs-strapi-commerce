import { fetchAPI } from "../../lib/api"
import Cart from '../../components/cart'
import {
  Button,
  Col,
  Card,
  CardTitle
} from "reactstrap";
import { useContext, useState } from "react"
import { getStrapiMedia } from "../../lib/media"

import GlobalContext from "../../context/GlobalContext";

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
    <div className="uk-card uk-card-muted">
      <div className="uk-card-body">
        <p id="category" className="uk-text-uppercase">
          {product.attributes.category.name}
        </p>

        <div className="card-footer" style={{ maxWidth: "800px" }}>
          <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false">
            <div className="carousel-indicators">
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
              <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="3" aria-label="Slide 4"></button>
            </div>
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img src={getStrapiMedia({ data: product.attributes.image.data[0] })} className="d-block" style={{ height: "450px" }} alt="..." />
              </div>

              {product.attributes.image.data.slice(1).map(image => (
                <div className="carousel-item">
                  <img key={image.attributes.id} src={getStrapiMedia({ data: image })} className="d-block" style={{ height: "450px" }} alt="..." />
                </div>
              )
              )}

              <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>

              <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
          <p id="title" className="uk-text-large text-center">
            {product.attributes.title}
          </p>
          <Button
            className="rounded-0"
            color="secondary"
            onClick={() => globalContext.removeItem(product)}
          >
            <i className="bi bi-cart"></i> Buy
          </Button>

          {productFromCart ?
            (
              <>
                <Button
                  className="rounded-0"
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

          <Col xs="3" style={{ padding: 0 }}>
            <Card style={{ padding: "10px 5px" }} className="cart">
              <CardTitle style={{ margin: 10 }}>Quantity:</CardTitle>
              <div>
                <span id="item-price">&nbsp; $ {product.price}</span>
              </div>
              <Col xs="3" style={{ padding: 0,
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
                  style={{ marginBottom: 15 }}
                  key={product.id}
                >
                  <div>
                    <span style={{ marginLeft: 5 }} id="item-quantity">
                      <input id="quantity" style={{
                        padding: "5px",
                        background: "#515a62",
                        color: "white",
                        fontSize: "20px",
                        textAlign: "center",
                        width: "45px",
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
          </Col>
        </div>
      </div>
    </div>
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
  const categoriesRes = await fetchAPI("/categories")

  return {
    props: { product: productsRes.data[0], categories: categoriesRes },
    revalidate: 1,
  }
}

export default Product
