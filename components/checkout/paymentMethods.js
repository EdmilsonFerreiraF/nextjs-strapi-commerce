import PaymentTabsControl from '../../components/checkout/paymentTabsControl';

const PaymentMethods = ({
    handlePaymentMethod,
paymentTab,
disabledNextTab,
handlePreviousTab,
handleNextTab,
handleSubmit,
handleBuyButton
}) => {
    return (
        <>
        <div className="align-items-center h-100 text-center row row-cols-2">
          <div className="cursor-pointer">
            <h5 className="mb-4">Cartão de crédito</h5>
            <div className="cursor-pointer" onClick={() => handlePaymentMethod(1)}>
              <img className="rounded mx-auto d-block mw-150px" src="/img/credit_card.png" />
            </div>
          </div>
          <div className="">
            <h5 className="mb-4">Cartão de débito</h5>
            <div className="cursor-pointer" onClick={() => handlePaymentMethod(2)}>
              <img className="rounded mx-auto d-block mw-150px" src="/img/debit_card.png" />
            </div>
          </div>
          <div className="">
            <h5 className="mb-4">Boleto</h5>
            <div className="cursor-pointer" onClick={() => handlePaymentMethod(3)}>
              <img className="rounded mx-auto d-block mw-150px" src="/img/boleto.png" />
            </div>
          </div>
          <div className="">
            <h5 className="mb-4">PIX</h5>
            <div className="cursor-pointer" onClick={() => handlePaymentMethod(4)}>
              <img className="rounded mx-auto d-block mw-150px" src="https://logopng.com.br/logos/pix-106.png" />
            </div>
          </div>
        </div>
        <PaymentTabsControl paymentTab={paymentTab}
          disabledNextTab
          handlePreviousTab={handlePreviousTab}
          handleNextTab={handleNextTab}
          handleSubmit={handleSubmit}
          handleBuyButton={handleBuyButton}
        />
      </>
    )
}

export default PaymentMethods