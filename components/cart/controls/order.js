import Link from "next/link";

import { Button } from "reactstrap";

const Order = () => {
    return (
        <div
            style={{
                marginTop: 10,
                marginRight: 10,
            }}
        >
            <Link href="/checkout">
                <Button style={{ width: "100%" }} color="primary">
                    <a>Order</a>
                </Button>
            </Link>
        </div>
    )
}

export default Order