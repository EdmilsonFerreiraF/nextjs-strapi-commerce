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
                        color: #0d6efd;
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