export async function GetTokenSession(transactionId, {
    requestSource = 'ECOMMERCE',
    merchantCode = '4004353',
    orderNumber = '21',
    publicKey = 'VErethUtraQuxas57wuMuquprADrAHAb',
    amount = '30',
}) {
    
    //llamado al backend interno de esta app
    const response = await fetch('https://en-una-production.up.railway.app/api/token', {
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
