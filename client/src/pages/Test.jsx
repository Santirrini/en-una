import React, { useState, useEffect } from 'react';

function App() {
  const [data, setData] = useState('');

  // Al cargar el componente, recuperar datos de sessionStorage
  useEffect(() => {
    const storedData = sessionStorage.getItem('sessionData');
    if (storedData) {
      setData(storedData);
    }
  }, []);

  // Guardar los datos en sessionStorage cuando cambien
  const handleSave = (e) => {
    const newData = e.target.value;
    setData(newData);
    sessionStorage.setItem('sessionData', newData);
  };

  return (
    <div>
      <input
        type="text"
        value={data}
        onChange={handleSave}
        placeholder="Type something..."
      />
    </div>
  );
}

export default App;
