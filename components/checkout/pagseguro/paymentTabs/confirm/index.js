import ConfirmCreditCard from './confirmCreditCard';
import ConfirmDebitCard from './confirmDebitCard';
import ConfirmBoleto from './confirmBoleto';
import ConfirmPix from './confirmPix';


const ConfirmTab = ({
    creditCardFormData,
    debitCardFormData,
    boletoFormData,
    creditCardData,
    debitCardData,
    boletoData,
    pixData,
    pixFormData,
    addressFormData }) => {
    const {
        phone,
        address,
        address2,
        zip,
        city,
        neighbourhood,
        street,
        state,
        complement,
    } = addressFormData

    return (
        <div className="container-md mt-4 mb-5 h-500">
            <h4 className="mb-1 text-center">Seus dados estão corretos?</h4>
            <div className="d-flex justify-content-between col-12 col-sm-10 col-md-8 col-lg-6 m-auto">
                <div>
                    <h5 className="mt-4 mb-3">Endereço</h5>
                    <p>Nome: <span className="fw-bold ps-1">{addressFormData.name}</span></p>
                    <p>Telefone: <span className="fw-bold ps-1">{phone}</span></p>
                    <p>Endereço: <span className="fw-bold ps-1">{address}</span></p>
                    <p>Endereço 2: <span className="fw-bold ps-1">{address2}</span></p>
                    <p>CEP: <span className="fw-bold ps-1">{zip}</span></p>
                    <p>Cidade: <span className="fw-bold ps-1">{city}</span></p>
                    <p>Bairro: <span className="fw-bold ps-1">{neighbourhood}</span></p>
                    <p>Rua: <span className="fw-bold ps-1">{street}</span></p>
                    <p>Estado: <span className="fw-bold ps-1">{state}</span></p>
                    <p>Number: <span className="fw-bold ps-1">{addressFormData.number}</span></p>
                    <p>Complemento: <span className="fw-bold ps-1">{complement}</span></p>
                </div>
                <div>
                    <h5 className="mt-4 mb-3">Forma de pagamento</h5>
                    <p>Tipo: <span className="fw-bold">{creditCardData?.type && "Cartão de crédito" || debitCardData?.type && "Cartão de débito" || boletoData?.type && "Boleto" || pixData?.type && "PIX"}</span></p>
                    {creditCardFormData &&
                        <ConfirmCreditCard
                            creditCardFormData={creditCardFormData}
                        />
                    }

                    {
                        debitCardFormData &&
                        <ConfirmDebitCard
                            debitCardFormData={debitCardFormData}
                        />
                    }

                    {
                        boletoFormData &&
                        <ConfirmBoleto
                            boletoFormData={boletoFormData}
                        />
                    }

                    {
                        pixFormData &&
                        <ConfirmPix
                            pixFormData={pixFormData}
                        />
                    }
                </div>
            </div>
        </div>
    )
}

export default ConfirmTab