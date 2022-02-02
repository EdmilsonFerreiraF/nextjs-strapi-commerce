import App from "next/app"
import Head from "next/head"
import "../assets/css/style.css"
import { fetchAPI } from "../lib/api"
import { getStrapiMedia } from "../lib/media"
import GlobalContext from "../context/GlobalContext";
import { useState, useEffect } from "react"

// Store Strapi Global object in context

const MyApp = ({ Component, pageProps }) => {
  const { global } = pageProps
  let [user, setUser] = useState(null)

  useEffect(() => {
    // grab token value from cookie
    const token = Cookie.get("token");

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
  
  return (
    <>
      <GlobalContext.Provider
        value={{
          user: user,
          isAuthenticated: !!user,
          setUser,
        }, global.attributes}
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
