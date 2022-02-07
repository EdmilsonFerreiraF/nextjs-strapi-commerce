import React, { useContext } from "react"
import Link from "next/link"
import {
  Button,
} from "reactstrap";

import GlobalContext from "../context/GlobalContext";
import { getStrapiMedia } from "../lib/media"

const ProductCard = ({ product }) => {
  const globalContext = useContext(GlobalContext);
  const productFromCart = globalContext.cart.items.find(item => item.id === product.id)

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
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
