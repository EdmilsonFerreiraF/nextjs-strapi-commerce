import React from "react"

import ProductList from "./productList"

const Products = ({ products }) => {
  const leftProductsCount = Math.ceil(products.length / 5)
  const leftProducts = products.slice(0, leftProductsCount)
  const rightProducts = products.slice(leftProductsCount, products.length)

  return (
    <div>
      <div
      className="uk-child-width-1-2@s"
      data-uk-grid="true">
        <div>
          <ProductList products={leftProducts} />
        </div>
        <div>
          <div
          className="uk-child-width-1-2@m uk-grid-match"
          data-uk-grid>
            <ProductList products={rightProducts} />
          </div>
        </div>
      </div>
    </div>
  )
}

export default Products
