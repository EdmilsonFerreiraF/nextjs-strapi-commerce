const PaymentTabsMenu = ({paymentTab, handlePaymentTab}) => {
    return (
        <ul className="nav nav-pills container-md justify-content-center mb-5">
        <li className="nav-item">
          <a className="nav-link disabled">Carrinho</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link${paymentTab === 0 ? ' active' : ''}`} onClick={() => handlePaymentTab(0)} aria-current="page" href="#">Endereço</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link${paymentTab === 1 ? ' active' : ''}`} onClick={() => handlePaymentTab(1)} href="#">Forma de pagamento</a>
        </li>
        <li className="nav-item">
          <a className={`nav-link${paymentTab === 2 ? ' active' : ''}`} onClick={() => handlePaymentTab(2)} href="#">Confirmar</a>
        </li>
      </ul>
    )
}

export default PaymentTabsMenu