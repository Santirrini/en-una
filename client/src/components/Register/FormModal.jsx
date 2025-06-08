import React, { useState, useEffect } from "react";
import styles from "./Register.module.css";
import { petitionForm } from "../../redux/action";
import { useDispatch } from "react-redux";
import CircularProgress from "@mui/material/CircularProgress";

const Form = ({ setOpenForm, setOpenAlert }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ruc: "",
    reason_social: "",
    busines_name: "",
    legal_representative: "",
    legal_representative_dni: "",
    legal_manager: "",
    local_address: "",
    phone_contact: "",
    local_phone: "",
    email_contract: "",
  });

  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, []);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      await dispatch(petitionForm(formData));
    } catch (error) {
      console.log(error);
    } finally {
      setOpenForm(false);
      setLoading(false);
      setOpenAlert(true);
    }
  };

  return (
    <div className={styles.form_container} data-oid="n.8ivbj">
      <h2 className={styles.form_title} data-oid="gtla0jc">
        Formulario de Registro
      </h2>
      <form
        onSubmit={handleSubmit}
        className="responsive-form"
        data-oid="ou6vls2"
      >
        <div className={styles.form_group} data-oid="-:1wfse">
          <label className={styles.form_label} data-oid="elhxpuk">
            N° de RUC:
            <input
              type="text"
              name="ruc"
              className={styles.form_input}
              value={formData.ruc}
              onChange={handleChange}
              required
              data-oid=":8l7jzq"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="u-boold">
          <label className={styles.form_label} data-oid="_q-nwc4">
            Razón social:
            <input
              type="text"
              name="reason_social"
              className={styles.form_input}
              value={formData.reason_social}
              onChange={handleChange}
              required
              data-oid="v8u9coh"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="w3e5-ml">
          <label className={styles.form_label} data-oid="e88lqb1">
            Nombre del comercio:
            <input
              type="text"
              name="busines_name"
              className={styles.form_input}
              value={formData.busines_name}
              onChange={handleChange}
              required
              data-oid="nit0un8"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="4phcv_k">
          <label className={styles.form_label} data-oid="27ioe5-">
            Nombre de representante legal:
            <input
              type="text"
              name="legal_representative"
              className={styles.form_input}
              value={formData.legal_representative}
              onChange={handleChange}
              required
              data-oid="0rwpi8."
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="9efk_v2">
          <label className={styles.form_label} data-oid="j0p0k9k">
            Número de DNI Representante Legal:
            <input
              type="text"
              name="legal_representative_dni"
              className={styles.form_input}
              value={formData.legal_representative_dni}
              onChange={handleChange}
              required
              data-oid="nxmxtk."
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="8dcg0g2">
          <label className={styles.form_label} data-oid="uc2420n">
            Gerente(a) del local:
            <input
              type="text"
              name="legal_manager"
              className={styles.form_input}
              value={formData.legal_manager}
              onChange={handleChange}
              required
              data-oid="s.fd8ni"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="o-zhg93">
          <label className={styles.form_label} data-oid=":u5pp8m">
            Dirección del local:
            <input
              type="text"
              name="local_address"
              className={styles.form_input}
              value={formData.local_address}
              onChange={handleChange}
              required
              data-oid="sge22xb"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="cw2gmrt">
          <label className={styles.form_label} data-oid="wiwi.un">
            Celular contacto:
            <input
              type="text"
              name="phone_contact"
              className={styles.form_input}
              value={formData.phone_contact}
              onChange={handleChange}
              required
              data-oid="89okpy0"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="uovbzhp">
          <label className={styles.form_label} data-oid="dct7t.z">
            Teléfono local:
            <input
              type="text"
              name="local_phone"
              className={styles.form_input}
              value={formData.local_phone}
              onChange={handleChange}
              required
              data-oid="fjm.:9o"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="dsvswtq">
          <label className={styles.form_label} data-oid="rm97y6f">
            Correo para enviar el contrato (Gmail):
            <input
              type="email"
              name="email_contract"
              className={styles.form_input}
              value={formData.email_contract}
              onChange={handleChange}
              required
              data-oid="c7vptut"
            />
          </label>
        </div>
        <button
          type="submit"
          className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.form_button}`}
          data-oid="g.1h6wb"
        >
          {loading ? (
            <CircularProgress
              size={25}
              thickness={5}
              sx={{ color: "#fff" }}
              data-oid="x6mgauv"
            />
          ) : (
            "Enviar información"
          )}
        </button>
      </form>
    </div>
  );
};

export default Form;
