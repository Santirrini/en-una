import React from 'react';
import { useNavigate } from 'react-router-dom';


const MessageRegister = () => {
const navigate = useNavigate();


  const handleRedirect = () => {
    navigate('/iniciar-sesión')
    }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
        <span className="block sm:inline">Usuario creado correctamente!</span>
      </div>
      <button
        onClick={handleRedirect}
        className=" hover:bg-violet-700 text-white font-bold py-2 px-4 rounded"
        style={{backgroundColor: "#500075"}}
      >
        Iniciar sesión
      </button>
    </div>
  );
};

export default MessageRegister;