import React from "react"
import Link from "next/link"
import NextImage from "./image"

const ProductCard = ({ product }) => {
  console.log('product', product)
  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            {/* <NextImage image={product.attributes.image} /> */}
          </div>
          <div className="uk-card-body">
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

export default ProductCard
