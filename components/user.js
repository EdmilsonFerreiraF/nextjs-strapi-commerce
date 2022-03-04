import Link from "next/link"

import { logout } from "../lib/auth";

const User = () => {
    return (
        <div className="dropdown">
            <button className="btn user dropdown-toggle user-options-button d-flex align-items-center" type="button" id="dropdownMenu2" data-bs-toggle="dropdown" aria-expanded="false">
                <div>
                    <img className="user-options-img" src="http://localhost:3000/_next/image?url=http%3A%2F%2Flocalhost%3A1337%2Fuploads%2Fthe_internet_s_own_boy_458776dd00.jpg&w=1920&q=75" alt="" />
                </div>
            </button>
            <ul className="dropdown-menu" aria-labelledby="dropdownMenu2">
                <Link href="/profile"><li><button className="dropdown-item" type="button">Perfil</button></li></Link>
                <Link href="/account"><li><button className="dropdown-item" type="button">Conta</button></li></Link>
                <button className="dropdown-item" type="button" onClick={logout}>Sair</button>
            </ul>
            <style jsx>
                {`
                    .dropdown-menu {
                        border: 1px solid #bdbdbd;
                    }
                `
                }
            </style>
        </div>
    )
}

export default User