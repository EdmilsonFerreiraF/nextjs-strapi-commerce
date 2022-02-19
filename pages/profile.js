import { useState, useContext } from "react"

import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"
import GlobalContext from "../context/GlobalContext";

const Profile = ({ categories }) => {
    let [activeTab, setActiveTab] = useState(0)

    const handleActiveTab = (tab) => {
        setActiveTab(tab)
    }

    const globalContext = useContext(GlobalContext);

    const { cart, isAuthenticated } = globalContext;

    return (
        <Layout categories={categories}>
            <div className="container-md">
                <h1 className="mt-5 text-center">Meu perfil</h1>
                <ul className="nav nav-pills mt-5">
                    <li className="nav-item">
                        <a className={`nav-link${!activeTab ? " active" : ""}`} onClick={() => handleActiveTab(0)} aria-current="page" href="#">Comprados</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link${activeTab === 1 ? " active" : ""}`} onClick={() => handleActiveTab(1)} href="#">Pendentes</a>
                    </li>
                    <li className="nav-item">
                        <a className={`nav-link${activeTab === 2 ? " active" : ""}`} onClick={() => handleActiveTab(2)} href="#">Favoritos</a>
                    </li>
                    {/* <li className="nav-item">
                        <a className={`nav-link${activeTab === 3 ? " active" : ""}`} onClick={() => handleActiveTab(3)}>Disabled</a>
                    </li> */}
                </ul>

                <div className="list-group w-100 container-md">
                    <a href="#" className="list-group-item active list-group-item-action d-flex align-items-center" aria-current="true">
                        <input className="form-check-input me-3" type="checkbox" value="" />
                        <div className="d-flex w-100">
                            <div className="card col-sm-2 ms-2 me-3">
                                <a href="#" className="btn btn-primary p-0 buyed-item-link">
                                    <img src="https://m.media-amazon.com/images/I/613bhsrtc4L._AC_SY450_.jpg" className="card-img-top" alt="..." />
                                    {/* <div className="card-body">
                                        <h5 className="card-title">Card title</h5>
                                    </div> */}
                                </a>
                            </div>
                            <div className="w-100">
                                <div className="d-flex w-100 col-sm-auto justify-content-between">
                                    <h5 className="mb-1">Mouse Gamer</h5>
                                    <small className="text-muted">3 dias atrás</small>
                                </div>
                                <p className="mb-1">Mouse Gamer 1x <small className="text-muted">$99,90</small></p>
                                <small className="text-muted">Cartão de crédito</small>
                            </div>
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
                <style jsx>{`
                .nav-link.active {
                    background: #87ceeb;
                    color: black;
                }
                .nav-link {
                    color: #5a5a5a;
                }
                .list-group-item.active {
                    background: #87ceeb;
                    border: none;
                    color: inherit;
                }
                .buyed-item-link {
                    border: 1px solid #e1e1e1;
                }
                `}
                </style>
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