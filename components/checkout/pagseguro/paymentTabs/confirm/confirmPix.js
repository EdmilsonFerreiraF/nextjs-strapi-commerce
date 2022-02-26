const confirmDebitCard = ({ pixFormData }) => {
    return (
        <>
            <p>Nome: <span className="fw-bold">{pixFormData.nome}</span></p>
            <p>CPF: <span className="fw-bold">{pixFormData.taxId}</span></p>
            <p>Total a pagar: <span className="fw-bold">{pixFormData.original}</span></p>
            <p>Solicitação do pagador: <span className="fw-bold">{pixFormData.solicitacaoPagador}</span></p>
            <p>InfoAdicionais: <span className="fw-bold">{pixFormData.infoAdicionais}</span></p>
            <p>Expiração: <span className="fw-bold">{pixFormData.expiracao}</span></p>
        </>
    )
}

export default confirmDebitCard