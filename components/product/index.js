import React, { useContext } from "react"
import Link from "next/link"

import GlobalContext from "../../context/GlobalContext";
import Carousel from "../carousel"
import AddToCart from "./controls/addToCart"
import RemoveFromCart from "./controls/removeFromCart";
import Buy from "./controls/buy";
import { getStrapiMedia } from "../../lib/media"

const Product = ({ product }) => {
  const globalContext = useContext(GlobalContext);
  const productFromCart = globalContext.cart.items.find(item => item.id === product.id)
  const firstImageId = product.attributes.image.data[0].attributes.id
  const firstImage = product.attributes.image.data[0]

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top d-flex">
            <div className="carousel-item d-block">
              <img key={firstImageId} src={getStrapiMedia({ data: firstImage })} className="d-block" alt="..." />
            </div>
          </div>
          <div className="card-body text-center">
            <p id="category" className="uk-text-uppercase">
              {product.attributes.category.name}
            </p>
            <p id="title" className="uk-text-large">
              {product.attributes.title}
            </p>
          </div>
        </div>
      </a>
    </Link>
  )
}

export default Product
