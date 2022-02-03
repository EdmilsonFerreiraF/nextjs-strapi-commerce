import ReactMarkdown from "react-markdown"
import Moment from "react-moment"
import { fetchAPI } from "../../lib/api"
import Layout from "../../components/layout"
import NextImage from "../../components/image"
import Seo from "../../components/seo"
import { getStrapiMedia } from "../../lib/media"
import Cart from '../../components/cart'
import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
const Product = ({ product, categories }) => {

  const seo = {
    metaTitle: product.attributes.title,
    metaDescription: product.attributes.description,
    shareImage: product.attributes.image,
    product: true,
  }

  return (
    <Layout categories={categories.data}>
      {/* <Seo seo={seo} /> */}
      {console.log('product', product)}
      {product.attributes.image.data.map(image => {
  const imageUrl = getStrapiMedia({data: image})

  return (
      <div
        id="banner"
        className="uk-height-medium uk-flex uk-flex-center uk-flex-middle uk-background-cover uk-light uk-padding uk-margin"
        data-src={imageUrl}
        data-srcset={imageUrl}
        data-uk-img
      >
        <h1>{product.attributes.title}</h1>
      </div>)
      })}
      
      <div className="uk-section">
        <div className="uk-container uk-container-small">
          <ReactMarkdown
            source={product.attributes.content}
            escapeHtml={false}
          />
          <hr className="uk-divider-small" />
          <div className="uk-grid-small uk-flex-left" data-uk-grid="true">
            <div>
              {/* {product.attributes.author.picture && (
                <NextImage image={product.attributes.author.picture} />
              )} */}
            </div>
            <div className="uk-width-expand">
              {/* <p className="uk-margin-remove-bottom">
                By {product.attributes.author.name}
              </p> */}
              {/* <p className="uk-text-meta uk-margin-remove-top">
                <Moment format="MMM Do YYYY">
                  {product.attributes.published_at}
                </Moment>
              </p> */}


              <div className="card-footer">
                  <Button
                    outline
                    color="primary"
                    onClick={() => globalContext.addItem(res)}
                  >
                    + Add To Cart
                  </Button>

                  <style jsx>
                    {`
                      a {
                        color: white;
                      }
                      a:link {
                        text-decoration: none;
                        color: white;
                      }
                      .container-fluid {
                        margin-bottom: 30px;
                      }
                      .btn-outline-primary {
                        color: #007bff !important;
                      }
                      a:hover {
                        color: white !important;
                      }
                    `}
                  </style>
                </div>

                <Col xs="3" style={{ padding: 0 }}>
                  <div>
                    <Cart />
                  </div>
                </Col>
              </div>
            </div>
          </div>
        </div>
    </Layout>
  )
}

export async function getStaticPaths() {
  const productsRes = await fetchAPI("/products", { fields: ["slug"] })
  console.log('productsRes', productsRes)

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
  const categoriesRes = await fetchAPI("/categories")

  return {
    props: { product: productsRes.data[0], categories: categoriesRes },
    revalidate: 1,
  }
}

export default Product
