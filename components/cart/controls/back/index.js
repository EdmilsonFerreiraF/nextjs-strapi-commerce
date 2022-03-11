const Back = () => {
    return (
        <>
            {router.pathname === "/checkout" && (
                <small
                    style={{ color: "blue" }}
                    onClick={() => window.history.back()}
                >
                    back to products
                </small>
            )}
        </>
    )
}

export default Back