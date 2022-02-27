import { QrCodePix } from 'qrcode-pix';
import {useEffect, useState} from 'react'


const QrCode = () => {
    let [qrCode, setQrCode] = useState("")
    
    useEffect(() => {
        const generateQrCode = async () => {
            const qrCodePix = QrCodePix({
                version: '01',
                key: 'test@mail.com.br', //or any PIX key
                name: 'Fulano de Tal',
                city: 'SAO PAULO',
                transactionId: 'YOUR_TRANSACTION_ID', //max 25 characters
                message: 'Pay me :)',
                cep: '99999999',
                value: 150.99,
            });

            setQrCode(await qrCodePix.base64())
            console.log(qrCodePix.payload()); // '00020101021126510014BR.GOV.BCB.PIX...'
            console.log(qrCode); // 'data:image/png;base64,iVBORw0...'
        }
        
        generateQrCode()
    }, [qrCode])

    return (
        <>
            <img className="mx-auto" src={qrCode} />
        </>
    )
}

export default QrCode;