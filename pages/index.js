import React from "react"
import Articles from "../components/articles"
import Products from "../components/products"
import Layout from "../components/layout"
import Seo from "../components/seo"
import { fetchAPI } from "../lib/api"

const Home = ({ products, articles, categories, homepage }) => {
  console.log('products', products)
  return (
    <Layout categories={categories}>
      <Seo seo={homepage.attributes.seo} />
      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.attributes.hero.title}</h1>
          <Articles articles={articles} />
        </div>
      </div>


      <div className="uk-section">
        <div className="uk-container uk-container-large">
          <h1>{homepage.attributes.hero.title}</h1>
          <Products products={products} />
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
