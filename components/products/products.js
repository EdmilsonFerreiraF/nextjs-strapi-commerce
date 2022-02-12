import React from "react"

import ProductCard from "./productCard"

const Products = ({ products }) => {
  const leftProductsCount = Math.ceil(products.length / 5)
  const leftProducts = products.slice(0, leftProductsCount)
  const rightProducts = products.slice(leftProductsCount, products.length)

  return (
    <div>
      <div className="uk-child-width-1-2@s" data-uk-grid="true">
        <div>
          {leftProducts.map((product, i) => {
            return (
              <ProductCard
                product={product}
                key={`product__left__${product.attributes.slug}`}
              />
            )
          })}
        </div>
        <div>
          <div className="uk-child-width-1-2@m uk-grid-match" data-uk-grid>
            {rightProducts.map((product, i) => {
              return (
                <ProductCard
                  product={product}
                  key={`product__left__${product.attributes.slug}`}
                />
              )
            })}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
