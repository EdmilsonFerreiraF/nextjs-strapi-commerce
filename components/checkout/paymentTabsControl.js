const PaymentTabsControl = ({
    paymentTab,
    handlePreviousTab,
    handleNextTab,
    handleSubmit,
    disabledNextTab
}) => {
    return (
        <div className="form-actions mt-3 d-flex justify-content-center">
            {console.log('disabledNextTab', disabledNextTab)}
            <button onClick={handlePreviousTab} className="btn btn-primary btn-block col col-auto me-4">Voltar</button>
            {paymentTab < 2 ?
                <button disabled={disabledNextTab} type="submit" className="btn btn-primary btn-block col col-auto">Prosseguir</button>
                :
                <button type="submit" className="btn btn-primary btn-block col col-auto">Comprar</button>
            }
        </div>
    )
}

export default PaymentTabsControl