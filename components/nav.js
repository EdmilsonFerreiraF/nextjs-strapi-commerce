import React, { useContext } from "react"
import Link from "next/link"
import { Nav as NavList, NavItem } from "reactstrap";
import { logout } from "../lib/auth";
import GlobalContext from "../context/GlobalContext";

const Nav = ({ categories }) => {
  const { user, setUser } = useContext(GlobalContext);

  return (
    <div>
      <nav className="uk-navbar-container" data-uk-navbar>
        <div className="uk-navbar-left">
          <ul className="uk-navbar-nav">
            <li>
              <Link href="/">
                <a>Strapi Blog</a>
              </Link>
            </li>
          </ul>
        </div>
        <div className="uk-navbar-right">
          <ul className="uk-navbar-nav">
            {categories.map((category) => {
              return (
                <li key={category.id}>
                  <Link href={`/category/${category.attributes.slug}`}>
                    <a className="uk-link-reset">{category.attributes.name}</a>
                  </Link>
                </li>
              )
            })}
              <NavItem className="ml-auto">
                {user ? (
                  <h5>{user.username}</h5>
                ) : (
                  <Link href="/register">
                    <a className="nav-link"> Sign up</a>
                  </Link>
                )}
              </NavItem>
              <NavItem>
                {user ? (
                  <Link href="/">
                    <a
                      className="nav-link"
                      onClick={() => {
                        logout();
                        setUser(null);
                      }}
                    >
                      Logout
                    </a>
                  </Link>
                ) : (
                  <Link href="/login">
                    <a className="nav-link">Sign in</a>
                  </Link>
                )}
              </NavItem>
          </ul>
        </div>
      </nav>
    </div>
  )
}

export default Nav
