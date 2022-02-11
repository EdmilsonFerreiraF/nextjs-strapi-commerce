import PaymentTabsControl from '../../components/checkout/paymentTabsControl';

const AddressTab = ({
  addressData,
  handleInputChange,
  handleAddressInputFocus,
  paymentTab,
handlePreviousTab,
handleNextTab,
handleSubmit,
}) => {
    return (
      <form ref={c => (AddressTab.form = c)} onSubmit={e => handleSubmit(e, "address")}>

        <div className="row g-3 col-auto col-md-10 col-lg-6 container-sm m-auto h-500 mb-5 px-0">
        <div className="col-md-6 mt-3 mt-md-0">
          <input type="name" className="form-control" id="inputName" placeholder="Nome completo"
            value={addressData.name}
            onChange={handleInputChange}
            onFocus={handleAddressInputFocus}
            name="name"
            required
          />
        </div>
        <div className="col-md-6 mt-3 mt-md-0">
          <input type="number" className="form-control" id="inputPhone" placeholder="Telefone"
            value={addressData.phone}
            onChange={handleInputChange}
            onFocus={handleAddressInputFocus}
            name="phone"
            pattern="\d{11}"
          />
        </div>
        <div className="col-12">
          <input type="text" className="form-control" id="inputAddress" placeholder="Endereço"
            value={addressData.address}
            onChange={handleInputChange}
            onFocus={handleAddressInputFocus}
            name="address"
          />
        </div>
        <div className="col-12">
          <input type="text" className="form-control" id="inputAddress2" placeholder="Endereço 2"
            value={addressData.address2}
            onChange={handleInputChange}
            onFocus={handleAddressInputFocus}
            name="address2"
          />
        </div>
        <div className="col-12">
          <input type="text" className="form-control" id="inputZip" placeholder="CEP"
            value={addressData.zip}
            onChange={handleInputChange}
            onFocus={handleAddressInputFocus}
            name="zip"
          />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" id="inputCity" placeholder="Cidade"
            value={addressData.city}
            onChange={handleInputChange}
            onFocus={handleAddressInputFocus}
            name="city"
          />
        </div>
        <div className="col-md-6">
          <input type="text" className="form-control" id="inputNeighbourhood" placeholder="Bairro"
            value={addressData.neighbourhood}
            onChange={handleInputChange}
            onFocus={handleAddressInputFocus}
            name="neighbourhood"
          />
        </div>
        <div className="col-md-12">
          <input type="text" className="form-control" id="inputStreet" placeholder="Rua"
            value={addressData.street}
            onChange={handleInputChange}
            onFocus={handleAddressInputFocus}
            name="street"
          />
        </div>
        <div className="col-6 col-md-6">
          <select id="inputState" className="form-select"
            value={addressData.state}
            name="state"
            onChange={handleInputChange}>
            <option>Estado</option>
            <option>...</option>
          </select>
        </div>
        <div className="col-6 col-md-6">
          <input type="text" className="form-control" id="inputNumber" placeholder="Número"
            value={addressData.number}
            onChange={handleInputChange}
            name="number"
            onFocus={e => handleAddressInputFocus(e, addressData, "address")}
          />
        </div>
        <div className="col-md-12">
          <input type="text" className="form-control" id="inputComplement" placeholder="Complemento"
            value={addressData.complement}
            onChange={handleInputChange}
            name="complement"
            onFocus={e => handleAddressInputFocus(e, addressData, "address")}
          />
        </div>
        <div className="col-12">
          <div className="form-check">
            <input className="form-check-input" type="checkbox" id="gridCheck" />
            <label className="form-check-label" htmlFor="gridCheck">
              Salvar endereço
            </label>
          </div>
        </div>
      </div>

      <PaymentTabsControl paymentTab={paymentTab}
              handlePreviousTab={handlePreviousTab}
              handleNextTab={handleNextTab}
              handleSubmit={handleSubmit}
            />
      </form>
    )
}

export default AddressTab