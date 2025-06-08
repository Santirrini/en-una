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
      const response = await fetch(
        "https://en-una-production.up.railway.app/api/contact",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        },
      );

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
    <div className={styles.contact_container} data-oid="o72for9">
      <div className="mx-auto max-w-2xl text-center" data-oid="9quic72">
        <h2
          className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl"
          data-oid="qn8aobh"
        >
          Contáctanos
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600" data-oid="80gu5:l">
          Para consultas llene el formulario y nos comunicaremos con usted o
          escribanos a:
          <br data-oid="yykrtlx" />
          Correo electrónico: contacto@enunaapp.com
          <br data-oid="9k.4s2m" />
          WhatsApp:{" "}
          <a href="https://wa.me/+51997915937" data-oid="t_kzesq">
            +51997915937
          </a>
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mx-auto mt-16 max-w-xl sm:mt-20"
        data-oid="-kkndrv"
      >
        <div
          className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2"
          data-oid="hfvgtxm"
        >
          <div data-oid="b2ajzm_">
            <label
              className="block text-sm font-semibold leading-6 text-gray-900"
              data-oid="fd556pq"
            >
              Nombre
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
              required
              data-oid="l83d2q-"
            />
          </div>
          <div data-oid="fqa:2hu">
            <label
              className="block text-sm font-semibold leading-6 text-gray-900"
              data-oid="a:kj:hv"
            >
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
              required
              data-oid="fkx:a._"
            />
          </div>
          <div className="sm:col-span-2" data-oid="_trk3m5">
            <label
              className="block text-sm font-semibold leading-6 text-gray-900"
              data-oid=":ucng5a"
            >
              Asunto
            </label>
            <input
              type="text"
              name="affair"
              value={formData.affair}
              onChange={handleChange}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
              required
              data-oid="4.f4rkw"
            />
          </div>
          <div className="sm:col-span-2" data-oid="qpbg4_a">
            <label
              className="block text-sm font-semibold leading-6 text-gray-900"
              data-oid="tjj2q6a"
            >
              Mensaje
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              rows={4}
              className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6 outline-none"
              required
              data-oid="72ts6o1"
            />
          </div>
        </div>
        <div className="mt-10" data-oid="qiswqi4">
          <div className={styles.btn_container} data-oid="7lal.9h">
            <Button
              type="submit"
              className={styles.btn_login}
              variant="contained"
              disabled={loading} // Deshabilitar el botón si está cargando
              data-oid="l:-nh1m"
            >
              {loading ? (
                <CircularProgress
                  size={24}
                  color="inherit"
                  data-oid="cusw453"
                />
              ) : (
                // Mostrar spinner si está cargando
                "Enviar"
              )}
            </Button>
          </div>
          {error && (
            <Alert
              severity="error"
              onClose={() => setError(null)} // Limpiar el error cuando se cierre el mensaje
              className="mt-4"
              data-oid="n_p_:n_"
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
              data-oid="8pwk481"
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
