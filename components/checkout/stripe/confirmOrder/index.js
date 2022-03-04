const ConfirmOrder = ({ submitOrder }) => {
    return (
        <div className="order-button-wrapper">
            <button onClick={submitOrder}>Confirm order</button>
        </div>
    )
}

export default ConfirmOrder