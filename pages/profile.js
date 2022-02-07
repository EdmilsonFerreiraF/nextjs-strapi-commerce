import { useState } from "react"

import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"

const Profile = ({ categories }) => {
    let [activeTab, setActiveTab] = useState(0)

    const handleActiveTab = (tab) => {
        setActiveTab(tab)
    }

    return (
        <Layout categories={categories}>
            <div className="container-md">
                <h1 className="mt-5 text-center">My profile</h1>
                <ul className="nav nav-pills my-5">
                    <li className="nav-item">
                        <a className={`nav-link${!activeTab ? " active" : ""}`} onClick={() => handleActiveTab(0)} aria-current="page" href="#">Bought</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link${activeTab === 1 ? " active" : ""}`} onClick={() => handleActiveTab(1)} href="#">Favorites</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link${activeTab === 2 ? " active" : ""}`} onClick={() => handleActiveTab(2)} href="#">Link</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link${activeTab === 3 ? " active" : ""}`} onClick={() => handleActiveTab(3)}>Disabled</a>
                    </li>
                </ul>

                <div className="list-group w-100 container-md my-5">
                    <a href="#" className="list-group-item list-group-item-action d-flex align-items-center active" aria-current="true">
                        <input className="form-check-input me-3" type="checkbox" value="" />
                        <div>
                            <div className="d-flex w-100 justify-content-between">
                                <h5 className="mb-1">List group item heading</h5>
                                <small>3 days ago</small>
                            </div>
                            <p className="mb-1">Some placeholder content in a paragraph.</p>
                            <small>And some small print.</small>
                        </div>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Some placeholder content in a paragraph.</p>
                        <small className="text-muted">And some muted small print.</small>
                    </a>
                    <a href="#" className="list-group-item list-group-item-action">
                        <div className="d-flex w-100 justify-content-between">
                            <h5 className="mb-1">List group item heading</h5>
                            <small className="text-muted">3 days ago</small>
                        </div>
                        <p className="mb-1">Some placeholder content in a paragraph.</p>
                        <small className="text-muted">And some muted small print.</small>
                    </a>
                </div>
                <div className="list-group w-100 container-md my-5">
                    <div className="row">
                        <div className="card col-sm">
                            <a href="#" className="btn btn-primary">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                </div>
                            </a>
                        </div>
                        <div className="card col-sm">
                            <a href="#" className="btn btn-primary">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                </div>
                            </a>
                        </div>
                        <div className="card col-sm">
                            <a href="#" className="btn btn-primary">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
                                </div>
                            </a>
                        </div>
                        <div className="card col-sm">
                            <a href="#" className="btn btn-primary">
                                <img src="..." className="card-img-top" alt="..." />
                                <div className="card-body">
                                    <h5 className="card-title">Card title</h5>
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