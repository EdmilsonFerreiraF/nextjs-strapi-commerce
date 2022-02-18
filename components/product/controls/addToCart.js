import {
  Button
} from "reactstrap";
import { useContext } from "react"

import GlobalContext from "../../../context/GlobalContext";

const AddToCart = ({ product }) => {
  const globalContext = useContext(GlobalContext);

  return (
    <Button
      className="rounded-0"
      color="secondary"
      onClick={() => globalContext.addItem(product)}
    >
      <i className="bi bi-cart-plus"></i>Add to cart
    </Button>
  )
}

export default AddToCart