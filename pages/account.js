import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"

const Account = ({ categories }) => {
    return (
        <div>
            <Layout categories={categories}>
                <div className="container-md">
                    <h1 className="m-5 text-center">My account</h1>
                    <div className="container-sm">
                        <div class="mb-5 row">
                            <label for="staticName" class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-8">
                                <input type="text" id="staticName" value="email@example.com" />
                            </div>
                            <i class="bi bi-pencil col"></i>
                        </div>
                        <div class="mb-5 row">
                            <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-8">
                                <input type="text" id="staticEmail" value="email@example.com" />
                            </div>
                            <i class="bi bi-pencil col"></i>
                        </div>
                        <div class="mb-5 row">
                            <label for="staticPassword" class="col-sm-3 col-form-label">Password</label>
                            <div class="col-sm-8">
                                <input type="text" id="staticPassword" value="email@example.com" />
                            </div>
                            <i class="bi bi-pencil col"></i>
                        </div>
                        <div class="mb-5 row">
                            <label for="staticBirthDate" class="col-sm-3 col-form-label">Birth date</label>
                            <div class="col-sm-8">
                                <input type="text" id="staticBirthDate" value="email@example.com" />
                            </div>
                            <i class="bi bi-pencil col"></i>
                        </div>
                    </div>
                </div>
            </Layout>
        </div>
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

export default Account