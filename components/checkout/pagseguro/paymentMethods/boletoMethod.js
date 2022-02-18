import PaymentTabsControl from '../paymentTabsControl';

const BoletoMethod = ({
    paymentTab,
    handlePreviousTab,
    handleNextTab,
    boletoData,
    handleSubmit,
    handlePaymentMethod,
    handleInputChange,
    handleCardInputFocus,
    handleBuyButton

}) => {
    const {
        name,
        taxId,
        email,
        issuer
    } = boletoData

    return (
        <form ref={c => (BoletoMethod.form = c)} onSubmit={e => handleSubmit(e, "boleto")} className="h-500">
            <div className="h-500">

                <div className="mb-5">
                    <h5 className="mb-4">Boleto</h5>
                    <div>
                        <img className="rounded mx-auto d-block mw-150px" src="/img/boleto.png" />
                    </div>
                </div>
                <div className="row my-4">
                    <div className="form-group col-6 col-md-6">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            required
                            onChange={(e) => handleInputChange(e, "boleto")}
                            value={name}
                            onFocus={handleCardInputFocus}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <input
                            type="tel"
                            name="taxId"
                            className="form-control"
                            placeholder="CPF"
                            pattern="\d{11}"
                            required
                            onChange={(e) => handleInputChange(e, "boleto")}
                            value={taxId}
                            onFocus={handleCardInputFocus}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="email"
                            name="email"
                            className="form-control"
                            placeholder="email"
                            required
                            onChange={(e) => handleInputChange(e, "boleto")}
                            value={email}
                            onFocus={handleCardInputFocus}
                        />
                    </div>
                </div>
                <input type="hidden" name="issuer" value={issuer} />
            </div>
            <PaymentTabsControl
                handleBuyButton={handleBuyButton}
                paymentTab={paymentTab}
                handlePreviousTab={handlePreviousTab}
                handleNextTab={handleNextTab}
                handleSubmit={handleSubmit}
            />
        </form>
    )
}

export default BoletoMethod