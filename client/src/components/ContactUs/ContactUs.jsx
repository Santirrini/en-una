import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import styles from "./ContactUs.module.css";
import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Alert from "@mui/material/Alert"; // Importamos el componente Alert de Material UI

export default function ContactUs() {
  const { pathname } = useLocation();
  const [error, setError] = useState(null); // Para mensajes de error
  const [successMessage, setSuccessMessage] = useState(null); // Para mensajes de éxito
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    affair: "",
    message: "",
  });
  const [loading, setLoading] = useState(false); // Estado para controlar el spinner

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true); // Activar el spinner al iniciar la consulta

    try {
      const response = await fetch("https://en-una-production.up.railway.app/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setSuccessMessage("Mensaje enviado correctamente.");
        setError(null); // Limpiar cualquier mensaje de error
        setFormData({ name: "", email: "", affair: "", message: "" }); // Resetear el formulario
      } else {
        setError(result.message || "Error al enviar el correo.");
        setSuccessMessage(null); // Limpiar cualquier mensaje de éxito
      }
    } catch (error) {
      console.error("Error:", error);
      setError("Error en el servidor.");
      setSuccessMessage(null); // Limpiar cualquier mensaje de éxito
    }

    setLoading(false); // Desactivar el spinner después de que la consulta termine
  };

  return (
    <div className={styles.contact_container}>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Contáctanos
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Para consultas llene el formulario y nos comunicaremos con usted o escribanos a:
          <br />
          Correo electrónico: contacto@enunaapp.com
          <br />
          WhatsApp: <a href="https://wa.me/+51997915937">+51997915937</a>
        </p>
      </div>

      <form onSubmit={handleSubmit} className="mx-auto mt-16 max-w-xl sm:mt-20">
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Asunto
            </label>
            <input
              type="text"
              name="affair"
              value={formData.affair}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
              required
            />
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-semibold leading-6 text-gray-900">
              Mensaje
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
              required
            />
          </div>
        </div>
        <div className="mt-10">
          <div className={styles.btn_container}>
            <Button
              type="submit"
              className={styles.btn_login}
              variant="contained"
              disabled={loading} // Deshabilitar el botón si está cargando
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" /> // Mostrar spinner si está cargando
              ) : (
                "Enviar"
              )}
            </Button>
          </div>
          {error && (
        <Alert
          severity="error"
          onClose={() => setError(null)} // Limpiar el error cuando se cierre el mensaje
          className="mt-4"
        >
          {error}
        </Alert>
      )}

      {/* Mostrar Alert si el mensaje se envió correctamente */}
      {successMessage && (
        <Alert
          severity="success"
          onClose={() => setSuccessMessage(null)} // Limpiar el mensaje de éxito cuando se cierre
          className="mt-4"
        >
          {successMessage}
        </Alert>
      )}
        </div>
      </form>

      {/* Mostrar Alert si hay un mensaje de error */}
   
    </div>
  );
}
