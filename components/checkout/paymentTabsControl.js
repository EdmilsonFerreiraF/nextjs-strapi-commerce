const PaymentTabsControl = ({
    paymentTab,
    handlePreviousTab,
    handleNextTab,
    handleSubmit,
}) => {
    return (
        <div className="form-actions mt-3 d-flex justify-content-center">
            <button onClick={handlePreviousTab} className="btn btn-primary btn-block col col-auto me-4">Voltar</button>
            {paymentTab < 2 ?
                <button onClick={handleNextTab} className="btn btn-primary btn-block col col-auto">Prosseguir</button>
                :
                <button onClick={handleSubmit} className="btn btn-primary btn-block col col-auto">Comprar</button>
            }
        </div>
    )
}

export default PaymentTabsControl