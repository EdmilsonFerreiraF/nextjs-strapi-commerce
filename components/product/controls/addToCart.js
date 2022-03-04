import {
  Button
} from "reactstrap";
import { useContext } from "react"

import GlobalContext from "../../../context/GlobalContext";

const AddToCart = ({ product, quantity }) => {
  const globalContext = useContext(GlobalContext);

  return (
    <Button
      className="col-7 rounded-0"
      color="secondary"
      onClick={() => globalContext.addItem(product, quantity)}
    >
      <i className="bi bi-cart-plus me-2"></i>Adic. ao carrinho
    </Button>
  )
}

export default AddToCart