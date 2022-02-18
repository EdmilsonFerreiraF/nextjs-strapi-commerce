
import 'react-credit-cards/es/styles-compiled.css';
import PaymentTabs from '../../components/checkout/pagseguro/paymentTabs';
import Layout from "../../components/layout"
import { fetchAPI, getStrapiURL } from "../../lib/api"


const Checkout = ({ categories }) => {


  return (
    <Layout categories={categories}>
      <PaymentTabs />
    </Layout>
  );
}

export async function getStaticProps() {
  // Run API calls in parallel
  const [categoriesRes] = await Promise.all([
    fetchAPI("/categories", { populate: "*" }),
  ])

  return {
    props: {
      categories: categoriesRes.data,
    },
    revalidate: 1,
  }
}

export default Checkout;