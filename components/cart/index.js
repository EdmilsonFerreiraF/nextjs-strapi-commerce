import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, CardBody, CardTitle } from "reactstrap";

import GlobalContext from "../../context/GlobalContext";
import ItemList from "./list";
import Total from "./total";
import Order from "./controls/order";

function Cart() {
  const globalContext = useContext(GlobalContext);
  const router = useRouter();

  const { cart, isAuthenticated } = globalContext;

  return (
    <div>
      <Card style={{ padding: "10px 5px" }} className="cart">
        <CardTitle style={{ margin: 10 }}>Your Order:</CardTitle>
        <hr />
        <CardBody style={{ padding: 10 }}>
          <div style={{ marginBottom: 6 }}>
            <small>Items:</small>
          </div>
          <div>
            <ItemList cart={cart} />
            {isAuthenticated ? (
              cart.items.length > 0 ? (
                <div>
                  <Total />
                  {router.pathname === "/restaurants" && (
                    <Order />
                  )}
                </div>
              ) : (
                <Back />
              )
            ) : (
              <h5>Login to Order</h5>
            )}
          </div>
        </CardBody>
      </Card>
      <style jsx>{`
        #item-price {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
        #item-quantity {
          font-size: 0.95em;
          padding-bottom: 4px;
          color: rgba(158, 158, 158, 1);
        }
        #item-name {
          font-size: 1.3em;
          color: rgba(97, 97, 97, 1);
        }
      `}</style>
    </div>
  );
}

export default Cart;