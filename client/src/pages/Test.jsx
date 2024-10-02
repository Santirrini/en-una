import React, { useEffect } from 'react';

const Login = () => {
  const handleGoogleLogin = () => {
    // Redirige al usuario a Google para la autenticación
    window.location.href = 'http://localhost:3001/api/auth/google';
  };

  const handleGoogleCallback = () => {
    // Captura los parámetros de la URL
    const query = new URLSearchParams(window.location.search);
    const token = query.get('token');
    const userId = query.get('userId');
    const role = query.get('role');

    // Si obtienes un token, guárdalo en localStorage
    if (token) {
      localStorage.setItem('token', token);
      localStorage.setItem('userId', userId);
      localStorage.setItem('role', role); // Guarda el rol si es necesario
      // Redirigir a la página principal o donde desees
      window.location.href = '/'; // Cambia esto a la URL que desees
    }
  };

  // Llama a la función de callback al montar el componente
  useEffect(() => {
    handleGoogleCallback();
  }, []);

  return (
    <div>
      <h1>Iniciar Sesión</h1>
      <button onClick={handleGoogleLogin}>Iniciar Sesión con Google</button>
    </div>
  );
};

export default Login;
