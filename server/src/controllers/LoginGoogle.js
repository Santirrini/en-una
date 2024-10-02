const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require('../db');
require('dotenv').config();


// Configura la estrategia de Google OAuth con Passport
passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,     // Obtén esto desde tu archivo .env
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'http://localhost:3001/api/auth/google/callback',      // Asegúrate de que esta URL esté registrada en las credenciales de Google
  },
  async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
      // Busca al usuario en la base de datos por su email (proporcionado por Google)
      let user = await User.findOne({ where: { email: profile.emails[0].value } });

      // Si el usuario no existe, lo crea en la base de datos
      if (!user) {
        user = await User.create({
          
          name: profile.displayName,
          lastName: profile.family_name,

          email: profile.emails[0].value,
          password: null,  // No necesitamos contraseña si usan Google OAuth
          role: 'user',    // Puedes cambiar el rol por defecto según tu lógica
        });
      }

      // Prepara el payload del token JWT
      const tokenPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
      };

      // Genera el token
      const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      // Devuelve el token y la información del usuario
      return done(null, { token, user });
    } catch (err) {
      return done(err, false);
    }
  }
));

module.exports = {
  // Función para iniciar sesión con Google
  LoginGoogle: (req, res, next) => {
    // Inicia el proceso de autenticación con Google
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  },

  // Callback de Google OAuth, donde recibimos el token y autenticamos al usuario
  GoogleCallback: (req, res, next) => {
    passport.authenticate('google', (err, data) => {
        if (err) {
          console.error("Error de autenticación:", err); // Imprime el error
          return res.status(500).json({ message: 'Error de autenticación con Google', error: err });
        }
      
        if (!data) {
          return res.status(401).json({ message: 'Autenticación fallida' });
        }
      
        const { token, user } = data;
        res.json({ token, role: user.role, userId: user.id });
      })(req, res, next);
      
  },
};
