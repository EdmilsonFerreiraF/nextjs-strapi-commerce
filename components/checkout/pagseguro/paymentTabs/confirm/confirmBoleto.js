const ConfirmBoleto = ({ boletoFormData }) => {
    return (
        <>
            <p>Nome: <span className="fw-bold">{boletoFormData.name}</span></p>
            <p>CPF: <span className="fw-bold">{boletoFormData.taxId}</span></p>
            <p>Email: <span className="fw-bold">{boletoFormData.email}</span></p>
        </>
    )
}

export default ConfirmBoleto