const BackToPaymentMethod = ({ handlePaymentMethod }) => {
    return (
        <div onClick={() => handlePaymentMethod(0)} className="d-flex">
            <i class="bi bi-arrow-left"></i>
            <p className="ms-2">Método</p>
        </div>
    )
}

export default BackToPaymentMethod