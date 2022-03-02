import React from "react"

import Articles from "../components/articles"
import ProductList from "../components/product/list"
import Layout from "../components/layout"
import Seo from "../components/seo"
import Banner from "../components/banner"
import { fetchAPI } from "../lib/api"
import axios from 'axios'

import { getStrapiURL } from "../lib/api"

const Home = ({ products, articles, categories, homepage }) => {
  const leftProductsCount = Math.ceil(products.length / 5)
  const leftProducts = products.slice(0, leftProductsCount)
  const rightProducts = products.slice(leftProductsCount, products.length)

  return (
    <Layout categories={categories}>
      <Seo seo={homepage.attributes.seo} />
      <div className="uk-section">
        <Banner />
      </div>

      <div className="uk-section">
        <div className="uk-container container">
          <h1>Lançamentos</h1>
          <Articles articles={articles} />
        </div>
      </div>

      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>Mais vendidos</h1>
          <div className="d-flex row row-cols-5 g-3 my-3">
            <ProductList products={leftProducts} />
            <ProductList products={rightProducts} />
          </div>
        </div>
      </div>
    </Layout>
  )
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [productsRes, articlesRes, categoriesRes, homepageRes] = await Promise.all([
    fetchAPI("/products", { populate: "*" }),
    fetchAPI("/articles", { populate: "*" }),
    fetchAPI("/categories", { populate: "*" }),
    fetchAPI("/homepage", {
      populate: {
        hero: "*",
        seo: { populate: "*" },
      },
    }),
  ])

  return {
    props: {
      products: productsRes.data,
      articles: articlesRes.data,
      categories: categoriesRes.data,
      homepage: homepageRes.data,
    },
    revalidate: 1,
  }
}

export default Home
