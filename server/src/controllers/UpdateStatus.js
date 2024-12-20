// controllers/YourControllerFile.js
const { User } = require('../db');

module.exports = {
    UpdateStatus: async (req, res) => {
        const { userId } = req.params;
        const { status } = req.body;

        try {
            console.log('Valor del status:', status);
            if (!['pendiente', 'activo'].includes(status)) {
                return res.status(400).json({ message: 'Estado no válido' });
            }

            const [updatedCount, updatedRows] = await User.update(
                { status },
                { 
                    where: { id: userId },
                }
            );

            if (updatedCount === 0) {
                return res.status(404).json({ message: 'Usuario no encontrado' });
            }

            return res.status(200).json(updatedRows[0]);  // Devuelve el profesional actualizado.
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: 'Error al actualizar el estado' });
        }
    },
};
