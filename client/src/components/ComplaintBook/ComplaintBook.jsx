import React from "react";
import styles from "./ComplaintBook.module.css";
import { Link } from "react-router-dom";

const ComplaintBook = () => {
  return (
    <>
      <header className={styles.header}>
        <Link to="/" className={styles.backLink}>
          ← Libro de reclamaciones
        </Link>
      </header>
      <div className={styles.libroReclamaciones}>
        <h1>Libro de reclamaciones</h1>
        <p className={styles.description}>
          En{" "}
          <a href="/" className={styles.link}>
            Ayuda en línea
          </a>{" "}
          podrás encontrar soluciones para distintas situaciones que necesites
          resolver rápidamente, también puedes ingresar una queja o reclamo a
          través del Libro de reclamaciones.
        </p>

        <h2>¿Qué es una queja y qué es un reclamo?</h2>
        <div className={styles.cards}>
          <div className={styles.card}>
            <img
              src="https://live.pystatic.com/webassets/contact-center/complaint-book-ms/1.1.10/images/claim.svg"
              alt="Queja Icono"
              className={styles.icon}
            />

            <p>
              La queja es la manifestación de tu descontento respecto a la
              atención que recibiste.
            </p>
          </div>
          <div className={styles.card}>
            <img
              src="https://live.pystatic.com/webassets/contact-center/complaint-book-ms/1.1.10/images/complaint.svg"
              alt="Reclamo Icono"
              className={styles.icon}
            />

            <p>
              El reclamo es la expresión de tu disconformidad con los servicios
              que brindamos.
            </p>
          </div>
        </div>

        <h2>¿Qué pasa luego de que presento una queja o un reclamo?</h2>
        <p className={styles.description}>
          Enviaremos a tu correo electrónico una copia de tu solicitud y en un
          plazo máximo de 15 días hábiles recibirás una respuesta.
        </p>
        <Link to="/reclamación">
          <button className={styles.button}>Ingresar queja o reclamo</button>
        </Link>
      </div>
    </>
  );
};

export default ComplaintBook;
