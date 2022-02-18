import {
    Button,
    Col,
    Card,
    CardTitle
} from "reactstrap";

const Quantity = ({
    product,
    quantity,
    addQuantity,
    removeQuantity,
    handleQuantity,
}) => {
    return (
        <Card style={{ padding: "10px 5px" }} className="cart">
            <CardTitle className="text-center my-2">Quantity:</CardTitle>
            <div className="text-center my-2">
                <span id="item-price">&nbsp; $ {product.price}</span>
            </div>
            <Col className="mx-auto my-2" style={{
                padding: 0,
                display: "flex",
                alignItems: "center"
            }}>

                <div>
                    <Button
                        className="rounded-0"
                        color="secondary"
                        onClick={removeQuantity}
                    >
                        <i className="bi bi-dash"></i>
                    </Button>
                </div>
                <div
                    className="items-one"
                    key={product.id}
                >
                    <div>
                        <span id="item-quantity">
                            <input id="quantity" style={{
                                padding: "7px",
                                background: "#515a62",
                                color: "white",
                                fontSize: "20px",
                                textAlign: "center",
                                width: "48px",
                                borderRadius: "3px",
                                border: "1px",
                            }} type="number" value={quantity} onChange={e => handleQuantity(e)} />
                        </span>
                    </div>
                </div>
                <div>
                    <Button
                        className="rounded-0"
                        color="secondary"
                        onClick={addQuantity}
                    >
                        <i className="bi bi-plus"></i>
                    </Button>
                </div>
            </Col>
        </Card>
    )
}

export default Quantity