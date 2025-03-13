require('dotenv').config();

module.exports.GetTokenSession = async function (transactionId, {
    requestSource = 'ECOMMERCE',
    merchantCode = process.env.MERCHANT_CODE || '4004353',
    orderNumber = '21',
    publicKey = process.env.PUBLIC_KEY || 'VErethUtraQuxas57wuMuquprADrAHAb',
    amount = '30',
}) {

    // Llamado al backend interno de esta app
    const response = await fetch(process.env.BACKEND_URL || 'http://localhost:3001/api/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'transactionId': transactionId,
        },
        body: JSON.stringify({
            requestSource,
            merchantCode,
            orderNumber,
            publicKey,
            amount,
        }),
    });

    if (!response.ok) {
        throw new Error(`Error al obtener el token: ${response.statusText}`);
    }

    return await response.json();
};
