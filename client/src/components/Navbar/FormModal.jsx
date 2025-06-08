import React, { useState, useEffect } from "react";
import styles from "./Navbar.module.css";
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
    <div className={styles.form_container} data-oid="p_irx05">
      <h2 className={styles.form_title} data-oid="nbayz_h">
        Formulario de Registro
      </h2>
      <form
        onSubmit={handleSubmit}
        className={styles.responsive_form}
        data-oid="38ot6rm"
      >
        <div className={styles.form_group} data-oid="0oul.rn">
          <label className={styles.form_label} data-oid="guo8cxi">
            N° de RUC:
            <input
              type="text"
              name="ruc"
              className={styles.form_input}
              value={formData.ruc}
              onChange={handleChange}
              required
              data-oid="7qr-u34"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid=":p8vm_n">
          <label className={styles.form_label} data-oid="vn_ol00">
            Razón social:
            <input
              type="text"
              name="reason_social"
              className={styles.form_input}
              value={formData.reason_social}
              onChange={handleChange}
              required
              data-oid="r5pr5vb"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="kubmr_g">
          <label className={styles.form_label} data-oid="jsq8hd:">
            Nombre del comercio:
            <input
              type="text"
              name="busines_name"
              className={styles.form_input}
              value={formData.busines_name}
              onChange={handleChange}
              required
              data-oid="hrrxhly"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="1dypt7x">
          <label className={styles.form_label} data-oid="njxld-u">
            Nombre de representante legal:
            <input
              type="text"
              name="legal_representative"
              className={styles.form_input}
              value={formData.legal_representative}
              onChange={handleChange}
              required
              data-oid="v6ab7:t"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="oci04za">
          <label className={styles.form_label} data-oid="5eo:h.b">
            Número de DNI Representante Legal:
            <input
              type="text"
              name="legal_representative_dni"
              className={styles.form_input}
              value={formData.legal_representative_dni}
              onChange={handleChange}
              required
              data-oid="c35fq_j"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="ebu2z_s">
          <label className={styles.form_label} data-oid="ihel_vm">
            Gerente(a) del local:
            <input
              type="text"
              name="legal_manager"
              className={styles.form_input}
              value={formData.legal_manager}
              onChange={handleChange}
              required
              data-oid="ftz6yk5"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="wxyl_sd">
          <label className={styles.form_label} data-oid="14vlhuy">
            Dirección del local:
            <input
              type="text"
              name="local_address"
              className={styles.form_input}
              value={formData.local_address}
              onChange={handleChange}
              required
              data-oid="03-x2br"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="sxlg_f6">
          <label className={styles.form_label} data-oid="uvnenhd">
            Celular contacto:
            <input
              type="text"
              name="phone_contact"
              className={styles.form_input}
              value={formData.phone_contact}
              onChange={handleChange}
              required
              data-oid="hhbf2b_"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="9h8o06d">
          <label className={styles.form_label} data-oid="i4uz3zv">
            Teléfono local:
            <input
              type="text"
              name="local_phone"
              className={styles.form_input}
              value={formData.local_phone}
              onChange={handleChange}
              required
              data-oid="sumvxz4"
            />
          </label>
        </div>
        <div className={styles.form_group} data-oid="m1tqlwq">
          <label className={styles.form_label} data-oid="m3iekf0">
            Correo para enviar el contrato (Gmail):
            <input
              type="email"
              name="email_contract"
              className={styles.form_input}
              value={formData.email_contract}
              onChange={handleChange}
              required
              data-oid="-.1g417"
            />
          </label>
        </div>
        <button
          type="submit"
          className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.form_button}`}
          data-oid="kxs8l.5"
        >
          {loading ? (
            <CircularProgress
              size={25}
              thickness={5}
              sx={{ color: "#fff" }}
              data-oid="pbjfnoy"
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
