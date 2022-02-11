const PaymentTabsMenu = ({ creditCardFormData, debitCardFormData, addressFormData, creditCardData, debitCardData, paymentTab, handlePaymentTab }) => {
    return (
        <ul className="nav nav-pills container-md justify-content-center mb-5">
            <li className="nav-item">
                <button className="nav-link disabled">Carrinho</button>
            </li>
            <li className="nav-item">
                <button className={`nav-link${paymentTab === 0 ? ' active' : ''}`}
                onClick={() => handlePaymentTab(0)} aria-current="page" href="#">Endereço</button>
            </li>
            <li className="nav-item">
                <button disabled={!addressFormData} className={`nav-link${paymentTab === 1 ? ' active' : ''}${!addressFormData ? " text-secondary" : ""}`}
                onClick={() => handlePaymentTab(1)} href="#">Forma de pagamento</button>
            </li>
            <li className="nav-item">
                <button  disabled={!addressFormData || (!creditCardFormData && !debitCardFormData)} className={`nav-link${paymentTab === 2 ? ' active' : ''}${(!addressFormData || (!creditCardFormData && !debitCardFormData)) ? " text-secondary" : ""}`}
                onClick={() => handlePaymentTab(2)} href="#">Confirmar</button>
            </li>
        </ul>
    )
}

export default PaymentTabsMenu