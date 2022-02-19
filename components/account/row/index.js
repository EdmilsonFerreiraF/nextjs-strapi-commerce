const Row = ({ type, editField, value, fieldName }) => {
    return (
        <div class="mb-5 row">
            <label for={`static${fieldName}`} class="col-sm-3 col-form-label">{fieldName}</label>
            <div class="col-sm-8">
                <input type={type} readOnly={editField !== 1} class={`form-control-plaintext ${editField === 1 ? "focus" : null}`} id={`static${fieldName}`} value={value} />
            </div>
            <i class="bi bi-pencil col" onClick={e => handleFocusField(1, e)}></i>
        </div>
    )
}

export default Row