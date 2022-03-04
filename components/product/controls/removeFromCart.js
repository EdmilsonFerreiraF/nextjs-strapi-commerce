import {
    Button
} from "reactstrap";
import { useContext } from "react"

import GlobalContext from "../../../context/GlobalContext";

const RemoveFromCart = ({ product }) => {
    const globalContext = useContext(GlobalContext);

    return (
        <>
            <Button
                className="col-7 rounded-0"
                color="secondary"
                onClick={() => globalContext.removeItem(product)}
            >
                <i className="bi bi-cart-dash me-2"></i>Rem. do carrinho
            </Button>
        </>
    )
}

export default RemoveFromCart