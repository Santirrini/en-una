import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const EmailVerification = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState('Verificando...');
  const [error, setError] = useState(null);

  useEffect(() => {
    const verifyEmail = async () => {
      const token = searchParams.get('token');
      if (!token) {
        setError('Token no proporcionado.');
        setStatus(null);
        return;
      }

      try {
        const response = await axios.get(
          `https://en-una-production.up.railway.app/api/verificar`,
          { params: { token } }
        );
        setStatus(response.data.message || 'Correo verificado exitosamente.');
      } catch (err) {
        console.error('Error al verificar:', err.response?.data || err.message);
        setError(err.response?.data?.message || 'Error al verificar el correo.');
        setStatus(null);
      }
    };

    verifyEmail();
  }, [searchParams]);

  const handleRedirection = () => {
    navigate('/iniciar-sesión'); // Redirige a la página deseada
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      {status && <h1>{status}</h1>}
      {error && <h1 style={{ color: 'red' }}>{error}</h1>}
      <button
        onClick={handleRedirection}
        style={{
          marginTop: '20px',
          padding: '10px 20px',
          fontSize: '16px',
          cursor: 'pointer',
          backgroundColor: "#500075",
          color: "white"
        }}
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default EmailVerification;
