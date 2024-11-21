const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const jwt = require('jsonwebtoken');
const { User } = require('../db');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
require('dotenv').config();

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: 'https://en-una-production.up.railway.app/api/auth/google/callback',
},
async (accessToken, refreshToken, profile, done) => {
    try {
        console.log(profile)
        let user = await User.findOne({ where: { email: profile.emails[0].value } });

        if (!user) {
            user = await User.create({
                name: profile.displayName,
                lastName: profile.family_name,
                email: profile.emails[0].value,
                password: null,
                role: 'user',
            });
        }

        const tokenPayload = {
            name: user.name,
            email: user.email,
            role: user.role,
        };

        const token = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);
        return done(null, { token, user });
    } catch (err) {
        return done(err, false);
    }
}));

module.exports = {
  // Función para iniciar sesión con Google
  LoginGoogle: (req, res, next) => {
    passport.authenticate('google', { scope: ['profile', 'email'] })(req, res, next);
  },

  // Callback de Google OAuth, donde recibimos el token y autenticamos al usuario
  GoogleCallback: (req, res, next) => {
    passport.authenticate('google', (err, data) => {
        if (err) {
          console.error("Error de autenticación:", err);
          return res.status(500).json({ message: 'Error de autenticación con Google', error: err });
        }
      
        if (!data) {
          return res.status(401).json({ message: 'Autenticación fallida' });
        }
      
        const { token, user } = data;
        res.json({ token, role: user.role, userId: user.id });
      })(req, res, next);
  },

  // Ruta para recibir el token de Google en el servidor
  GoogleAuth: async (req, res) => {
    const { token } = req.body;

    try {
      // Verificar el token de Google usando la librería google-auth-library
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();

      // Ahora puedes usar el payload para buscar o crear al usuario
      let user = await User.findOne({ where: { email: payload.email } });

      if (!user) {
        user = await User.create({
          name: payload.name,
          lastName: payload.family_name,
          email: payload.email,
          password: null,
          role: 'user',
        });
      }

      const tokenPayload = {
        name: user.name,
        email: user.email,
        role: user.role,
      };

      const jwtToken = jwt.sign(tokenPayload, process.env.FIRMA_TOKEN);

      return res.json({ token: jwtToken, user: user });
    } catch (error) {
      return res.status(500).json({ message: 'Error al verificar el token de Google', error });
    }
  },
};
