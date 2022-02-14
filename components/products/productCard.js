import React, { useContext } from "react"
import Link from "next/link"
import {
  Button, CarouselItem,
} from "reactstrap";

import GlobalContext from "../../context/GlobalContext";
import { getStrapiMedia } from "../../lib/media"
import CarouselIndicators from "../carousel/carouselIndicators"
import CarouselPrevButton from "../carousel/carouselPrevButton"
import CarouselNextButton from "../carousel/CarouselNextButton"
import CarouselActiveitem from "../carousel/CarouselActiveitem"

const ProductCard = ({ product }) => {
  const globalContext = useContext(GlobalContext);
  const productFromCart = globalContext.cart.items.find(item => item.id === product.id)

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <div id="carouselExampleIndicators" className="carousel slide" data-bs-interval="false">
              <CarouselIndicators />
              <div className="carousel-inner">

                <CarouselActiveitem product={product} />
                <CarouselItem product={product} />
                <CarouselPrevButton />
                <CarouselNextButton />
              </div>
            </div>
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
                  onClick={() => globalContext.addItem(product)}
                >
                  <i className="bi bi-cart-plus"></i>Add to cart
                </Button>
              )
            }
          </div>
        </div>
      </a>
    </Link>
  )
}

export default ProductCard
