import { Badge } from "reactstrap";

const Total = () => {
    return (
        <Badge style={{ width: 200, padding: 10 }} color="light">
            <h5 style={{ fontWeight: 100, color: "gray" }}>Total:</h5>
            <h3>${globalContext.cart.total.toFixed(2)}</h3>
        </Badge>
    )
}

export default Total