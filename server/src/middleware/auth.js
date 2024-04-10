const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  
  // Verifica si se proporcionó el encabezado de autorización
  if (!authHeader) {
    console.log('No autorizado');
    return res.status(401).json({ message: 'No autorizado' });
  }

  // Extrae el token sin el prefijo "Bearer"
  const token = authHeader.trim(); // Remueve espacios en blanco
  
  jwt.verify(token, process.env.FIRMA_TOKEN, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token inválido' });
    }
    req.user = user; // Añade el usuario decodificado al objeto de solicitud
    next();
  });
}

module.exports = {authenticateToken};
