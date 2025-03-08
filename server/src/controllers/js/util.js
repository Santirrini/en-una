// Cambia export const por module.exports
const getDataOrderDynamic = () => {

    const currentTimeUnix = Math.floor(Date.now()) * 1000;
    const transactionId = currentTimeUnix.toString().slice(0, 14);
    const orderNumber = currentTimeUnix.toString().slice(0, 10).toString();

    return {
        currentTimeUnix,
        transactionId,
        orderNumber,
    };
};

// Usar module.exports para exportar la función
module.exports = {
    getDataOrderDynamic,
};
