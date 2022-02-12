import Card from 'react-credit-cards';
import PaymentTabsControl from '../../components/checkout/paymentTabsControl';

const CreditCardMethod = ({
    creditCardData,
    handleCallback,
    handleSubmit,
    handleInputChange,
    handleCardInputFocus,
    paymentTab,
    handlePreviousTab,
    handleNextTab,
    handleBuyButton
}) => {
    const {
        type,
        number,
        name,
        installments,
        expiry,
        cvc,
        taxId,
        store,
        issuer,
        focused,
        formData,
    } = creditCardData

    return (
        <form ref={c => (CreditCardMethod.form = c)} onSubmit={e => handleSubmit(e, "credit_card")} className="h-500">
            <div className="h-500">
                <div className="mb-5">
                    <Card
                        number={number}
                        name={name}
                        expiry={expiry}
                        cvc={cvc}
                        focused={focused}
                        callback={(type, isValid) => handleCallback(type, isValid, "credit_card")}
                    />
                </div>
                <div className="form-group my-4">
                    <input
                        type="tel"
                        name="number"
                        className="form-control"
                        placeholder="Card Number"
                        pattern="[\d| ]{16,22}"
                        required
                        onChange={(e) => handleInputChange(e, "credit_card")}
                        value={number}
                        onFocus={handleCardInputFocus}
                    />
                    {/* <small className="position-absolute">E.g.: 49..., 51..., 36..., 37...</small> */}
                </div>
                <div className="row my-4">
                    <div className="form-group col-6 col-md-6">
                        <input
                            type="text"
                            name="name"
                            className="form-control"
                            placeholder="Name"
                            required
                            onChange={(e) => handleInputChange(e, "credit_card")}
                            value={name}
                            onFocus={handleCardInputFocus}
                        />
                    </div>
                    <div className="col-6 col-md-6">
                        <select id="inputInstallments" className="form-select"
                            value={installments}
                            name="installments"
                            onChange={(e) => handleInputChange(e, "credit_card")}>
                            <option>Parcelas</option>
                            <option>1</option>
                        </select>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <input
                            type="tel"
                            name="expiry"
                            className="form-control"
                            placeholder="Valid Thru"
                            pattern="\d\d/\d\d"
                            required
                            onChange={(e) => handleInputChange(e, "credit_card")}
                            value={expiry}
                            onFocus={handleCardInputFocus}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="tel"
                            name="cvc"
                            className="form-control"
                            placeholder="CVC"
                            pattern="\d{3,4}"
                            required
                            onChange={(e) => handleInputChange(e, "credit_card")}
                            value={cvc}
                            onFocus={handleCardInputFocus}
                        />
                    </div>
                    <div className="col-6">
                        <input
                            type="tel"
                            name="taxId"
                            className="form-control"
                            placeholder="CPF"
                            pattern="\d{11}"
                            required
                            onChange={(e) => handleInputChange(e, "credit_card")}
                            value={taxId}
                            onFocus={handleCardInputFocus}
                        />
                    </div>
                </div>
                <div className="col-12 mt-3">
                    <div className="form-check">
                        <input className="form-check-input" type="checkbox" id="gridCheck" />
                        <label className="form-check-label" htmlFor="gridCheck">
                            Salvar cartão
                        </label>
                    </div>
                </div>
                <input type="hidden" name="issuer" value={issuer} />
            </div>

            <PaymentTabsControl
                paymentTab={paymentTab}
                handlePreviousTab={handlePreviousTab}
                handleNextTab={handleNextTab}
                handleSubmit={handleSubmit}
                handleBuyButton={handleBuyButton}
            />
        </form>
    )
}

export default CreditCardMethod