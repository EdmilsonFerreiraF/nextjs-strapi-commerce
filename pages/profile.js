import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"

const Profile = ({ categories }) => {
    return (
        <Layout categories={categories}>
            <div className="container-md">
                <h1>My profile</h1>
                <ul class="nav nav-pills my-5">
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

                <div class="list-group w-100 container-md my-5">
                    <a href="#" class="list-group-item list-group-item-action d-flex align-items-center active" aria-current="true">
                        <input class="form-check-input me-3" type="checkbox" value="" />
                        <div>
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1">List group item heading</h5>
                                <small>3 days ago</small>
                            </div>
                            <p class="mb-1">Some placeholder content in a paragraph.</p>
                            <small>And some small print.</small>
                        </div>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">List group item heading</h5>
                            <small class="text-muted">3 days ago</small>
                        </div>
                        <p class="mb-1">Some placeholder content in a paragraph.</p>
                        <small class="text-muted">And some muted small print.</small>
                    </a>
                    <a href="#" class="list-group-item list-group-item-action">
                        <div class="d-flex w-100 justify-content-between">
                            <h5 class="mb-1">List group item heading</h5>
                            <small class="text-muted">3 days ago</small>
                        </div>
                        <p class="mb-1">Some placeholder content in a paragraph.</p>
                        <small class="text-muted">And some muted small print.</small>
                    </a>
                </div>
                <div class="list-group w-100 container-md my-5">
                    <div class="row">
                    <div class="card col-sm">
                        <a href="#" class="btn btn-primary">
                            <img src="..." class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                            </div>
                        </a>
                    </div>
                    <div class="card col-sm">
                        <a href="#" class="btn btn-primary">
                            <img src="..." class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                            </div>
                        </a>
                    </div>
                    <div class="card col-sm">
                        <a href="#" class="btn btn-primary">
                            <img src="..." class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                            </div>
                        </a>
                    </div>
                    <div class="card col-sm">
                        <a href="#" class="btn btn-primary">
                            <img src="..." class="card-img-top" alt="..." />
                            <div class="card-body">
                                <h5 class="card-title">Card title</h5>
                            </div>
                        </a>
                    </div>
                    </div>
                </div>
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