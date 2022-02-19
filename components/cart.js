import Link from "next/link"

import { logout } from "../lib/auth";

const Cart = () => {
    return (
        <button className="btn cart d-flex align-items-center">
            <Link href="/cart">
                <i className="bi bi-cart2"></i>
            </Link>
            <style jsx>{`
                    .cart {
                        background-color: #87ceeb;
                        border-color: #5c9fdb;
                    }

                    .bi-cart2 {
                        font-size: 23px;
                    }
                `
            }
            </style>
        </button>
    )
}

export default Cart