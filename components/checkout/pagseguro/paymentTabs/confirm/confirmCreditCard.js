
const confirmCreditCard = ({ creditCardFormData }) => {
    return (
        <>
            <p>Número: <span className="fw-bold">{creditCardFormData.number}</span></p>
            <p>Nome: <span className="fw-bold">{creditCardFormData.name}</span></p>
            <p>Data de expiração: <span className="fw-bold">{creditCardFormData.expiry}</span></p>
            <p>Código: <span className="fw-bold">{creditCardFormData.cvc}</span></p>
        </>
    )
}

export default confirmCreditCard