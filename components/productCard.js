import React, { useContext } from "react"
import Link from "next/link"
import NextImage from "./image"
import Cart from './cart'
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
import GlobalContext from "../context/GlobalContext";

const ProductCard = ({ product }) => {
  const globalContext = useContext(GlobalContext);

  return (
    <Link href={`/product/${product.attributes.slug}`}>
      <a className="uk-link-reset">
        <div className="uk-card uk-card-muted">
          <div className="uk-card-media-top">
            {/* {product.attributes.image.data.map(image => {
              return (<NextImage image={{data: image}} />)
            })} */}
            
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
          <Col xs="3" style={{ padding: 0 }}>
            <div>
              <Cart />
            </div>
          </Col>
            </div>
        </div>
      </a>
      </Link>
  )
}

export default ProductCard
