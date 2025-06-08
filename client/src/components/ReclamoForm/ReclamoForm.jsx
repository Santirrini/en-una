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
    <div data-oid="7.unlpw">
      <header className={styles.header} data-oid="cx_-03x">
        <Link
          to="/libro-de-quejas"
          className={styles.backLink}
          data-oid="idq.u32"
        >
          ← Libro de reclamaciones
        </Link>
      </header>
      <div className={styles.formContainer} data-oid="5-9yrrc">
        <h2 className={styles.title} data-oid="t.lb6_9">
          Hoja de reclamaciones
        </h2>
        <p className={styles.subtitle} data-oid="j9mrygq">
          Ingresa los datos y cuéntanos qué pasó para que podamos analizar tu
          caso y enviarte una respuesta en un plazo máximo de 15 días hábiles.
          Recuerda que ingresando a{" "}
          <a href="#" data-oid="hulrj:u">
            Ayuda en línea
          </a>{" "}
          también podrás encontrar soluciones a distintas situaciones que
          necesites resolver y respuestas a diferentes consultas.
        </p>

        <label className={styles.label} data-oid="na:655u">
          Número correlativo del reclamo/queja: PE-X-2024
        </label>

        <form onSubmit={handleSubmit} data-oid="d98esqp">
          <h3 className={styles.sectionTitle} data-oid="5ussdl:">
            Ingresa tus datos
          </h3>

          <div className={styles.inputGroup} data-oid="x_dczl8">
            <input
              type="text"
              name="name_complete"
              placeholder="Nombre completo"
              value={formData.name_complete}
              onChange={handleChange}
              className={styles.inputField}
              required
              data-oid="9m4efrg"
            />

            <input
              type="text"
              name="dni"
              placeholder="Documento de identidad"
              value={formData.dni}
              onChange={handleChange}
              className={styles.inputField}
              required
              data-oid="2sspymz"
            />
          </div>

          <div className={styles.inputGroup} data-oid="p5wnzs8">
            <input
              type="text"
              name="address"
              placeholder="Dirección"
              value={formData.address}
              onChange={handleChange}
              className={styles.inputField}
              required
              data-oid="nb__h:l"
            />

            <input
              type="text"
              name="phone"
              placeholder="Teléfono"
              value={formData.phone}
              onChange={handleChange}
              className={styles.inputField}
              required
              data-oid="ceo86j1"
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
            data-oid="1r9p5u4"
          />

          <div className={styles.checkboxContainer} data-oid=":f-z8_f">
            <input
              type="checkbox"
              name="is_minor"
              id="is_minor"
              checked={formData.is_minor}
              onChange={handleChange}
              required
              data-oid="buem7xx"
            />

            <label htmlFor="esMenor" data-oid="hytz8e-">
              Soy menor de edad
            </label>
          </div>

          {formData.is_minor && (
            <>
              <p className={styles.warningText} data-oid="2jjpv0h">
                Si tienes menos de 18 años completa los siguientes datos de tu
                padre, madre o tutor
              </p>
              <div className={styles.inputGroup} data-oid="6w:ywgo">
                <input
                  type="text"
                  name="name_tutor"
                  placeholder="Nombre completo"
                  value={formData.name_tutor}
                  onChange={handleChange}
                  className={styles.inputField}
                  data-oid="dbeoox0"
                />

                <input
                  type="text"
                  name="address_tutor"
                  placeholder="Dirección"
                  value={formData.address_tutor}
                  onChange={handleChange}
                  className={styles.inputField}
                  data-oid="3pfken2"
                />
              </div>

              <div className={styles.inputGroup} data-oid="ne45vi6">
                <input
                  type="text"
                  name="phone_tutor"
                  placeholder="+51 Teléfono"
                  value={formData.phone_tutor}
                  onChange={handleChange}
                  className={styles.inputField}
                  data-oid="ehpt_xj"
                />

                <input
                  type="email"
                  name="email_tutor"
                  placeholder="Email"
                  value={formData.email_tutor}
                  onChange={handleChange}
                  className={styles.inputField}
                  data-oid="whhk4hp"
                />
              </div>
            </>
          )}

          <h3 className={styles.sectionTitle} data-oid=":pvjo3z">
            Identificación del Bien Contratado
          </h3>

          <div className={styles.radioGroup} data-oid="4s0mogb">
            <input
              type="radio"
              name="identify_contract"
              id="producto"
              value="producto"
              checked={formData.identify_contract === "producto"}
              onChange={handleChange}
              required
              data-oid="lz3vsz8"
            />

            <label htmlFor="producto" data-oid="_u.em3t">
              Producto
            </label>

            <input
              type="radio"
              name="identify_contract"
              id="servicio"
              value="servicio"
              checked={formData.identify_contract === "servicio"}
              onChange={handleChange}
              required
              data-oid="ryo8y5:"
            />

            <label htmlFor="servicio" data-oid="skoa0oy">
              Servicio
            </label>
          </div>

          <input
            type="text"
            name="description"
            placeholder="Descripción"
            value={formData.description}
            onChange={handleChange}
            className={styles.inputFull}
            required
            data-oid="67pgx5i"
          />

          <input
            type="text"
            name="monto_claim"
            placeholder="S/. Monto reclamado"
            value={formData.monto_claim}
            onChange={handleChange}
            className={styles.inputFull}
            required
            data-oid="q-jjun7"
          />

          <h3 className={styles.sectionTitle} data-oid=":831pih">
            Ingresa tu solicitud
          </h3>

          <div className={styles.radioGroup} data-oid="2uxfh5-">
            <input
              type="radio"
              name="application"
              id="queja"
              value="queja"
              checked={formData.application === "queja"}
              onChange={handleChange}
              required
              data-oid="6006xxq"
            />

            <label htmlFor="queja" data-oid="_y7vm1f">
              Queja
            </label>

            <input
              type="radio"
              name="application"
              id="reclamo"
              value="reclamo"
              checked={formData.application === "reclamo"}
              onChange={handleChange}
              required
              data-oid="nla_6pl"
            />

            <label htmlFor="reclamo" data-oid="xui9aku">
              Reclamo
            </label>
          </div>

          <textarea
            name="description_problem"
            placeholder="Descripción del problema"
            value={formData.description_problem}
            onChange={handleChange}
            className={styles.textarea}
            required
            data-oid="2vzqnmw"
          ></textarea>
          <textarea
            name="expected_solution"
            placeholder="Solución esperada"
            value={formData.expected_solution}
            onChange={handleChange}
            className={styles.textarea}
            required
            data-oid="5kmlaah"
          ></textarea>

          <h3 className={styles.sectionTitle} data-oid="69fskrb">
            Observaciones y acciones adoptadas por el proveedor
          </h3>
          <p className={styles.observaciones} data-oid="p8fxss:">
            Estimado Cliente, muchas gracias por registrar su incidencia en el
            Libro de Reclamaciones...
          </p>

          <div className={styles.inputGroup} data-oid="knxuzoa">
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className={styles.inputField}
              required
              data-oid="usqstvz"
            />

            <input
              type="time"
              name="hour"
              value={formData.hour}
              onChange={handleChange}
              className={styles.inputField}
              required
              data-oid="g:rp.50"
            />
          </div>

          <button
            type="submit"
            className={styles.submitButton}
            data-oid=":w1qekp"
          >
            {loading ? (
              <CircularProgress
                size={25}
                thickness={5}
                sx={{ color: "#fff" }}
                data-oid="0vfb1zt"
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
