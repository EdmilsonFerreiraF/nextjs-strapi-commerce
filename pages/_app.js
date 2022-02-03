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
          Cookie.remove("token");
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

  const addItem = (item) => {
    let { items } = cart;
    //check for item already in cart
    //if not in cart, add item if item is found increase quanity ++
    const newItem = items.find((i) => i.id === item.id);
    // if item is not new, add to cart, set quantity to 1
    if (!newItem) {
      //set quantity property to 1
      item.quantity = 1;
      console.log(cart.total, item.price);
      setCart(
        {
            items: [...items, item],
            total: cart.total + item.price,
          },
        
        );
        //  Cookie.set("cart", cart.items)
    } else {
      setCart(
        {
            items: cart.items.map((item) =>
              item.id === newItem.id
                ? Object.assign({}, item, { quantity: item.quantity + 1 })
                : item
            ),
            total: cart.total + item.price,
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
        //  Cookie.set("cart", items)
    } else {
      const items = [...cart.items];
      const index = items.findIndex((i) => i.id === newItem.id);

      items.splice(index, 1);
      setCart(
       { items, total: cart.total - item.price } ,
        );
        //  Cookie.set("cart", items)
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
          <link
            rel="stylesheet"
            href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css"
            integrity="sha384-Gn5384xqQ1aoWXA+058RXPxPg6fy4IWvTNh0E263XmFcJlSAwiGgFAW/dAiS6JXm"
            crossOrigin="anonymous"
          />
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
