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
                    <h1 className="m-5 text-center">Minha conta</h1>
                    <div className="container-sm">
                        <Row type="text" editField={editField} id="1" value="dasd" fieldName="Nome" handleFocusField={handleFocusField} />
                        <Row type="email" editField={editField} id="2" value="gsdfsdf" fieldName="E-mail" handleFocusField={handleFocusField} />
                        <Row type="password" editField={editField} id="3" value="gsdfsdf" fieldName="Senha" handleFocusField={handleFocusField} />
                        <Row type="date" editField={editField} id="4" value="gsdfsdf" fieldName="Data de nascimento" handleFocusField={handleFocusField} />
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