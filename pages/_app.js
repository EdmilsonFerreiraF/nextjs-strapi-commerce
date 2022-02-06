import App from "next/app"
import Head from "next/head"
import "../assets/css/style.css"
import { fetchAPI } from "../lib/api"
import { getStrapiMedia } from "../lib/media"
import GlobalContext from "../context/GlobalContext";
import { useState, useEffect } from "react"
import Cookie from "js-cookie";
import fetch from "isomorphic-fetch";

// Store Strapi Global object in context

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps
  let [user, setUser] = useState(null)
  let [cart, setCart] = useState({ items: [], total: 0 })

  useEffect(() => {
    // grab token value from cookie
    const token = Cookie.get("token");

    // restore cart from cookie, this could also be tracked in a db
    const cart = Cookie.get("cart");
    //if items in cart, set items and total from cookie
    console.log(cart);

    if (typeof cart === "string" && cart !== "undefined") {
      console.log("foyd");
      JSON.parse(cart).forEach((item) => {
        setCart({ items: JSON.parse(cart), total: item.price * item.quantity },
        );
      });
    }

    if (token) {
      // authenticate the token on the server and place set user object
      fetch(`${process.env.NEXT_PUBLIC_API_URL}users/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(async (res) => {
        // if res comes back not valid, token is not valid
        // delete the token and log the user out on client
        if (!res.ok) {
          // Cookie.remove("token");
          setUser({ user: null });
          return null;
        }
        const user = await res.json();
        setUser(user);
      });
    }
  }, [])

  useEffect(() => {
    Cookie.set("cart", JSON.stringify(cart.items))
  }, [cart])

  const handleSetUser = (user) => {
    setUser({ user });
  };

  const addItem = (item, quantity = 1) => {
    let { items } = cart;
    // Check for item already in cart
    // If not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    // If item is not new, add to cart, set quantity to 1
    if (!newItem) {
      // Set quantity property to 1
      item.quantity = quantity;

      setCart(
        {
          items: [...items, item],
          total: cart.total + (item.price * item.quantity),
        },

      );
    } else {
      setCart(
        {
          items: cart.items.map((item) =>
            item.id === newItem.id
              ? Object.assign({}, item, { quantity: item.quantity + quantity })
              : item
          ),
          total: cart.total + (item.price * item.quantity),
        },

      );
      //  Cookie.set("cart", cart.items)
    }
  };
  const removeItem = (item) => {
    let { items } = cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    if (newItem.quantity > 1) {
      setCart(
        {
          items: cart.items.map((item) =>
            item.id === newItem.id
              ? Object.assign({}, item, { quantity: item.quantity - 1 })
              : item
          ),
          total: cart.total - item.price,
        },

      );
    } else {
      const items = [...cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      setCart(
        { items, total: cart.total - item.price } ,
      );
    }
  };

  return (
    <>
      <GlobalContext.Provider
        value={{
          user,
          isAuthenticated: !!user,
          handleSetUser,
          cart,
          addItem,
          removeItem,
          global: global.attributes
        }}
      >
        <Head>
          <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous"></link>
          <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
          <script src="https://assets.pagseguro.com.br/checkout-sdk-js/rc/dist/browser/pagseguro.min.js"></script>
          <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.0/font/bootstrap-icons.css"></link>
        </Head>
        <Head>
          <link
            rel="shortcut icon"
            href={getStrapiMedia(global.attributes.favicon)}
          />
        </Head>
        <Component {...pageProps} />
      </GlobalContext.Provider>
    </>
  )
}

// getInitialProps disables automatic static optimization for pages that don't
// have getStaticProps. So article, category and home pages still get SSG.
// Hopefully we can replace this with getStaticProps once this issue is fixed:
// https://github.com/vercel/next.js/discussions/10949
MyApp.getInitialProps = async (ctx) => {
  // Calls page's `getInitialProps` and fills `appProps.pageProps`
  const appProps = await App.getInitialProps(ctx)
  // Fetch global site settings from Strapi
  const globalRes = await fetchAPI("/global", {
    populate: {
      favicon: "*",
      defaultSeo: {
        populate: "*",
      },
    },
  })
  // Pass the data to our page via props
  return { ...appProps, pageProps: { global: globalRes.data } }
}

export default MyApp
