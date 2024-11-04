import React, { useState, useEffect } from "react";
import styles from "./ReclamoForm.module.css";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { ClaimSend } from "../../redux/action";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const ReclamoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [formData, setFormData] = useState({
    name_complete: "",
    dni: "",
    address: "",
    phone: "",
    email: "",
    identify_contract: "producto",
    description: "",
    monto_claim: "",
    application: "queja",
    description_problem: "",
    expected_solution: "",
    date: "",
    hour: "",
    is_minor: false, // Nuevo estado para el checkbox
    name_tutor: "",
    address_tutor: "",
    phone_tutor: "",
    email_tutor: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const valueToSet = type === "checkbox" ? checked : value;
    setFormData({ ...formData, [name]: valueToSet });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      try {
        dispatch(ClaimSend(formData));
        console.log("Formulario enviado:", formData);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        navigate("/reclamo-enviado");
      }
    }, 2000);
  };

  return (
    <div>
      <header className={styles.header}>
        <Link to="/libro-de-quejas" className={styles.backLink}>
          ← Libro de reclamaciones
        </Link>
      </header>
      <div className={styles.formContainer}>
        <h2 className={styles.title}>Hoja de reclamaciones</h2>
        <p className={styles.subtitle}>
          Ingresa los datos y cuéntanos qué pasó para que podamos analizar tu
          caso y enviarte una respuesta en un plazo máximo de 15 días hábiles.
          Recuerda que ingresando a <a href="#">Ayuda en línea</a> también
          podrás encontrar soluciones a distintas situaciones que necesites
          resolver y respuestas a diferentes consultas.
        </p>

        <label className={styles.label}>
          Número correlativo del reclamo/queja: PE-X-2024
        </label>

        <form onSubmit={handleSubmit}>
          <h3 className={styles.sectionTitle}>Ingresa tus datos</h3>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="name_complete"
              placeholder="Nombre completo"
              value={formData.name_complete}
              onChange={handleChange}
              className={styles.inputField}
              required

            />
            <input
              type="text"
              name="dni"
              placeholder="Documento de identidad"
              value={formData.dni}
              onChange={handleChange}
              className={styles.inputField}
              required

            />
          </div>

          <div className={styles.inputGroup}>
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
              className={styles.inputField}
              required

            />
            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className={styles.inputField}
              required

            />
          </div>

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={styles.inputFull}
            required

          />

          <div className={styles.checkboxContainer}>
            <input
              type="checkbox"
              name="is_minor"
              id="is_minor"
              checked={formData.is_minor}
              onChange={handleChange}
              required

            />
            <label htmlFor="esMenor">Soy menor de edad</label>
          </div>

          {formData.is_minor && (
            <>
              <p className={styles.warningText}>
                Si tienes menos de 18 años completa los siguientes datos de tu
                padre, madre o tutor
              </p>
              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="name_tutor"
                  placeholder="Nombre completo"
                  value={formData.name_tutor}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <input
                  type="text"
                  name="address_tutor"
                  placeholder="Dirección"
                  value={formData.address_tutor}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>

              <div className={styles.inputGroup}>
                <input
                  type="text"
                  name="phone_tutor"
                  placeholder="+51 Teléfono"
                  value={formData.phone_tutor}
                  onChange={handleChange}
                  className={styles.inputField}
                />
                <input
                  type="email"
                  name="email_tutor"
                  placeholder="Email"
                  value={formData.email_tutor}
                  onChange={handleChange}
                  className={styles.inputField}
                />
              </div>
            </>
          )}

          <h3 className={styles.sectionTitle}>
            Identificación del Bien Contratado
          </h3>

          <div className={styles.radioGroup}>
            <input
              type="radio"
              name="identify_contract"
              id="producto"
              value="producto"
              checked={formData.identify_contract === "producto"}
              onChange={handleChange}
              required

            />
            <label htmlFor="producto">Producto</label>

            <input
              type="radio"
              name="identify_contract"
              id="servicio"
              value="servicio"
              checked={formData.identify_contract === "servicio"}
              onChange={handleChange}
              required

            />
            <label htmlFor="servicio">Servicio</label>
          </div>

          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className={styles.inputFull}
            required

          />
          <input
            type="text"
            name="monto_claim"
            placeholder="S/. Monto reclamado"
            value={formData.monto_claim}
            onChange={handleChange}
            className={styles.inputFull}
            required

          />

          <h3 className={styles.sectionTitle}>Ingresa tu solicitud</h3>

          <div className={styles.radioGroup}>
            <input
              type="radio"
              name="application"
              id="queja"
              value="queja"
              checked={formData.application === "queja"}
              onChange={handleChange}
              required

            />
            <label htmlFor="queja">Queja</label>

            <input
              type="radio"
              name="application"
              id="reclamo"
              value="reclamo"
              checked={formData.application === "reclamo"}
              onChange={handleChange}
              required

            />
            <label htmlFor="reclamo">Reclamo</label>
          </div>

          <textarea
            name="description_problem"
            placeholder="Descripción del problema"
            value={formData.description_problem}
            onChange={handleChange}
            className={styles.textarea}
            required

          ></textarea>
          <textarea
            name="expected_solution"
            placeholder="Solución esperada"
            value={formData.expected_solution}
            onChange={handleChange}
            className={styles.textarea}
            required

          ></textarea>

          <h3 className={styles.sectionTitle}>
            Observaciones y acciones adoptadas por el proveedor
          </h3>
          <p className={styles.observaciones}>
            Estimado Cliente, muchas gracias por registrar su incidencia en el
            Libro de Reclamaciones...
          </p>

          <div className={styles.inputGroup}>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.inputField}
              required

            />
            <input
              type="time"
              name="hour"
              value={formData.hour}
              onChange={handleChange}
              className={styles.inputField}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            {loading ? (
              <CircularProgress
                size={25}
                thickness={5}
                sx={{ color: "#fff" }}
              />
            ) : (
              "Enviar"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ReclamoForm;
