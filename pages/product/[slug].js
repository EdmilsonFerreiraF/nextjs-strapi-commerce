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
import AddToCart from "../../components/products/addToCart"
import RemoveFromCart from "../../components/products/removeFromCart";
import Quantity from "../../components/products/quantity";

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
          <Quantity product={product} quantity={quantity} addQuantity={addQuantity} removeQuantity={removeQuantity} handleQuantity={handleQuantity} />
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
                <RemoveFromCart product={product} />
              )
              :
              (
                <AddToCart product={product} />
              )
            }
              </div>
              <div>

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
