import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"

const Profile = ({ categories }) => {
    return (
        <Layout categories={categories}>
            <div className="container-md">
                <h1>My profile</h1>
                <ul class="nav nav-pills">
                    <li class="nav-item">
                        <a class="nav-link active" aria-current="page" href="#">Bought</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Favorites</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="#">Link</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link disabled">Disabled</a>
                    </li>
                </ul>
            </div>
        </Layout>
    )
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

export default Profile