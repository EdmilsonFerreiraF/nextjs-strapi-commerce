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
            {product.attributes.image.data.map(image => {
              return (<NextImage image={{ data: image }} />)
            })}

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
            {globalContext.cart.items.find(item => item.id === product.id) ?
              (
                <Button
                  className="rounded-0"
                  color="secondary"
                  onClick={() => globalContext.removeItem(product)}

                >
                  <i className="bi bi-dash-lg"></i> Remove from Cart
                </Button>
              )
              :
              (
                <Button
                  className="rounded-0"
                  color="secondary"
                  onClick={() => globalContext.addItem(product)}
                >
                  <i className="bi bi-plus-lg "></i> Add To Cart
                </Button>
              )
            }


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
