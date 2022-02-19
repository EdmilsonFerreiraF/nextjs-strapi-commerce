import Layout from "../components/layout"
import { fetchAPI } from "../lib/api"

import { useState } from "react"
import Row from "../components/account/row"

const Account = ({ categories }) => {
    let [editField, setEditField] = useState(0)
    let [form, setForm] = useState({
        name: '',
        email: '',
        password: '',
        birthday: '',
    })

    const handleEditField = (field) => {
        setEditField(field)
    }

    const handleFocusField = (field, e) => {
        handleEditField(field)

        e.target.previousElementSibling.childNodes[0].focus()
    }

    return (
        <div>
            <Layout categories={categories}>
                <div className="container-md">
                    <h1 className="m-5 text-center">My account</h1>
                    <div className="container-sm">
                        <Row type="text" editField={editField} value="" fieldName="Name" />
                        <div class="mb-5 row">
                            <label for="staticName" class="col-sm-3 col-form-label">Name</label>
                            <div class="col-sm-8">
                                <input type="text" readOnly={editField !== 1} class={`form-control-plaintext ${editField === 1 ? "focus" : null}`} id="staticName" value="email@example.com" />
                            </div>
                            <i class="bi bi-pencil col" onClick={e => handleFocusField(1, e)}></i>
                        </div>
                        <div class="mb-5 row">
                            <label for="staticEmail" class="col-sm-3 col-form-label">Email</label>
                            <div class="col-sm-8">
                                <input type="text" readOnly={editField !== 2} class={`form-control-plaintext ${editField === 2 ? "focus" : null}`} id="staticEmail" value="email@example.com" />
                            </div>
                            <i class="bi bi-pencil col" onClick={e => handleFocusField(2, e)}></i>
                        </div>
                        <div class="mb-5 row">
                            <label for="staticPassword" class="col-sm-3 col-form-label">Password</label>
                            <div class="col-sm-8">
                                <input type="text" readOnly={editField !== 3} class={`form-control-plaintext ${editField === 3 ? "focus" : null}`} id="staticPassword" value="email@example.com" />
                            </div>
                            <i class="bi bi-pencil col" onClick={e => handleFocusField(3, e)}></i>
                        </div>
                        <div class="mb-5 row">
                            <label for="staticBirthDate" class="col-sm-3 col-form-label">Birth date</label>
                            <div class="col-sm-8">
                                <input type="text" readOnly={editField !== 4} class={`form-control-plaintext ${editField === 4 ? "focus" : null}`} id="staticBirthDate" value="email@example.com" />
                            </div>
                            <i class="bi bi-pencil col" onClick={e => handleFocusField(4, e)}></i>
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