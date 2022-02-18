import {
  Button
} from "reactstrap";
import { useContext } from "react"

import GlobalContext from "../../../context/GlobalContext";

const AddToCart = ({ product }) => {
  const globalContext = useContext(GlobalContext);

  return (
    <Button
      className="col-8 rounded-0"
      color="secondary"
      onClick={() => globalContext.addItem(product)}
    >
      <i className="bi bi-cart-plus me-2"></i>Add to cart
    </Button>
  )
}

export default AddToCart