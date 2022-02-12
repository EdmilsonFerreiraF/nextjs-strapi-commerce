const confirmTabDC = ({debitCardFormData}) => {
    return (
        <>
        <p>Número: <span className="fw-bold">{debitCardFormData.number}</span></p>
        <p>Nome: <span className="fw-bold">{debitCardFormData.name}</span></p>
        <p>Data de expiração: <span className="fw-bold">{debitCardFormData.expiry}</span></p>
        <p>Código: <span className="fw-bold">{debitCardFormData.cvc}</span></p>
    </>
    )
}

export default confirmTabDC