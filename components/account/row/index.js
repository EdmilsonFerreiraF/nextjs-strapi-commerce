const Row = ({ id, handleFocusField, type, editField, value, fieldName }) => {
    return (
        <div class="mb-5 row">
            <label for={`static${fieldName}`} class="col-sm-3 col-form-label">{fieldName}</label>
            <div class="col-sm-8">
                <input type={type} readOnly={editField !== id} class={`form-control-plaintext ${editField === id ? "focus" : null}`} id={`static${fieldName}`} value={value} />
            </div>
            <i class="bi bi-pencil col" onClick={e => handleFocusField(id, e)}></i>
        </div>
    )
}

export default Row