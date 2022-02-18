import React, { useContext } from "react"
import Link from "next/link"

import GlobalContext from "../../context/GlobalContext";
import Carousel from "../carousel"
import AddToCart from "./controls/addToCart"
import RemoveFromCart from "./controls/removeFromCart";
import Buy from "./controls/buy";

const Product = ({ product }) => {
  const globalContext = useContext(GlobalContext);
  const productFromCart = globalContext.cart.items.find(item => item.id === product.id)

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            <Carousel product={product} />
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
            <Buy product={product} />

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
        </div>
      </a>
    </Link>
  )
}

export default Product
