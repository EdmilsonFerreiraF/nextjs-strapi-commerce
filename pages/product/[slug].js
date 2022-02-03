import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import { getStrapiMedia } from "../../lib/media"
import Cart from '../../components/cart'
import {
  Button,
  Col,
} from "reactstrap";
import { useContext, useState } from "react"

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
      <div className="uk-card-media-top">
        {product.attributes.image.data.map(image => {
          return (<NextImage image={{ data: image }} />)
        })}
      </div>
      <div className="uk-card-body">
        <p id="category" className="uk-text-uppercase">
          {product.attributes.category.name}
        </p>

        <p id="title" className="uk-text-large">
          {product.attributes.title}
        </p>
      </div>
      <div className="card-footer">
        <Button
          className="rounded-0"
          color="secondary"
          onClick={() => globalContext.removeItem(product)}
        >
          <i class="bi bi-cart"></i> Buy
        </Button>

        {productFromCart ?
          (
            <>
              <Button
                className="rounded-0"
                color="secondary"
                onClick={() => globalContext.removeItem(product)}

              >
                <i class="bi bi-cart-dash"></i>Remove from cart
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
              <i class="bi bi-cart-plus"></i>Add to cart
            </Button>
          )
        }

        <Col xs="3" style={{ padding: 0 }}>
          <div>
            <Button
              className="rounded-0"
              color="secondary"
              onClick={removeQuantity}
            >
              <i class="bi bi-dash"></i>
            </Button>
          </div>
          <div
            className="items-one"
            style={{ marginBottom: 15 }}
            key={product.id}
          >
            <div>
              <span id="item-price">&nbsp; ${product.price}</span>
            </div>
            <div>
              <span style={{ marginLeft: 5 }} id="item-quantity">
                <input id="quantity" type="number" value={quantity} onChange={e => handleQuantity(e)} />
              </span>
            </div>
          </div>
          <Button
            className="rounded-0"
            color="secondary"
            onClick={addQuantity}
          >
            <i class="bi bi-plus"></i>
          </Button>
        </Col>
        <Col xs="3" style={{ padding: 0 }}>
          <div>
            <Cart />
          </div>
        </Col>
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
