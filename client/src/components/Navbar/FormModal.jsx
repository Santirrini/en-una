import React, { useState, useEffect } from 'react';
import styles  from './Navbar.module.css'
import { petitionForm } from '../../redux/action';
import { useDispatch } from 'react-redux';
import CircularProgress from "@mui/material/CircularProgress";

const Form = ({setOpenForm, setOpenAlert}) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    ruc: '',
    reason_social: '',
    busines_name: '',
    legal_representative: '',
    legal_representative_dni: '',
    legal_manager: '',
    local_address: '',
    phone_contact: '',
    local_phone: '',
    email_contract: '',
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



  const handleSubmit =async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
     await dispatch(petitionForm(formData))
    } catch (error) {
      console.log(error)
    } finally {
      setOpenForm(false)
      setLoading(false);
      setOpenAlert(true);

    }
  };

  return (
    <div className={styles.form_container}>
      <h2 className={styles.form_title}>Formulario de Registro</h2>
      <form onSubmit={handleSubmit} className="responsive-form">
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            N° de RUC:
            <input type="text" name="ruc" className={styles.form_input} value={formData.ruc} onChange={handleChange} required />
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Razón social:
            <input type="text" name="reason_social" className={styles.form_input} value={formData.reason_social} onChange={handleChange} required />
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Nombre del comercio:
            <input type="text" name="busines_name" className={styles.form_input} value={formData.busines_name} onChange={handleChange} required />
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Nombre de representante legal:
            <input type="text" name="legal_representative" className={styles.form_input} value={formData.legal_representative} onChange={handleChange} required />
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Número de DNI Representante Legal:
            <input type="text" name="legal_representative_dni" className={styles.form_input} value={formData.legal_representative_dni} onChange={handleChange} required />
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Gerente(a) del local:
            <input type="text" name="legal_manager" className={styles.form_input} value={formData.legal_manager} onChange={handleChange} required />
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Dirección del local:
            <input type="text" name="local_address" className={styles.form_input} value={formData.local_address} onChange={handleChange} required />
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Celular contacto:
            <input type="text" name="phone_contact" className={styles.form_input} value={formData.phone_contact} onChange={handleChange} required />
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Teléfono local:
            <input type="text" name="local_phone" className={styles.form_input} value={formData.local_phone} onChange={handleChange} required/>
          </label>
        </div>
        <div className={styles.form_group}>
          <label className={styles.form_label}>
            Correo para enviar el contrato (Gmail):
            <input type="email" name="email_contract" className={styles.form_input} value={formData.email_contract} onChange={handleChange} required />
          </label>
        </div>
        <button
                type="submit"
                className={`flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 ${styles.form_button}`}
              >

{loading ? (
                  <CircularProgress size={25} thickness={5} sx={{ color: "#fff" }} />
                ) : (
                  "Enviar información"
                )}
        </button>
      </form>
     
    </div>
  );
};

export default Form;
