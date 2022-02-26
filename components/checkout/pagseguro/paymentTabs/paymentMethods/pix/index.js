import Controls from '../../../controls';

const Pix = ({
    paymentTab,
    handlePreviousTab,
    handleNextTab,
    pixData,
    handleSubmit,
    handlePaymentMethod,
    handleInputChange,
    handleCardInputFocus,
    handleBuyButton

}) => {
    const {
        nome,
        taxId,
        issuer
    } = pixData

    return (
        <form ref={c => (Pix.form = c)} onSubmit={e => handleSubmit(e, "pix")} className="h-500">
            <div className="h-500">
                <div className="mb-5">
                    <h5 className="mb-4">Pix</h5>
                    <div>
                        <img className="rounded mx-auto d-block mw-150px" src="https://logopng.com.br/logos/pix-106.png" />
                    </div>
                </div>
                <div className="row my-4">
                    <div className="form-group col-6 col-md-6">
                        <input
                            type="text"
                            name="nome"
                            className="form-control"
                            placeholder="Nome"
                            required
                            onChange={(e) => handleInputChange(e, "pix")}
                            value={nome}
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
                            onChange={(e) => handleInputChange(e, "pix")}
                            value={taxId}
                            onFocus={handleCardInputFocus}
                        />
                    </div>
                </div>
                <input type="hidden" name="issuer" value={issuer} />
            </div>
            <Controls
                handleBuyButton={handleBuyButton}
                paymentTab={paymentTab}
                handlePreviousTab={handlePreviousTab}
                handleNextTab={handleNextTab}
                handleSubmit={handleSubmit}
            />
        </form>
    )
}

export default Pix