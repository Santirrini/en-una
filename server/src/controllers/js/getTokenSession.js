// Cambia export async function por module.exports
async function GetTokenSession(transactionId, {
    requestSource = 'ECOMMERCE',
    merchantCode = '4004353',
    orderNumber = '21',
    publicKey = 'VErethUtraQuxas57wuMuquprADrAHAb',
    amount = '30',
}) {

    // Llamado al backend interno de esta app
    const response = await fetch('http://localhost:3001/api/token', {
        method: 'POST',
        headers: {'Content-Type': 'application/json', 'transactionId': transactionId},
        body: JSON.stringify({
            requestSource,
            merchantCode,
            orderNumber,
            publicKey,
            amount,
        }),
    });
    return await response.json();
}

// Usar module.exports para exportar la función
module.exports = {
    GetTokenSession,
};
