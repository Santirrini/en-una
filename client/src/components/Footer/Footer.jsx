import React from "react";
import styles from "./Footer.module.css"; // Estilos para el footer
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <hr />
      <br />
      <div className={styles.footer_container}>
        <div className={styles.footer_social}>
          <a
            href="https://www.facebook.com/profile.php?id=61554385080807"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaSquareFacebook className={styles.footer_icon} />
          </a>
          <a
            href="https://www.instagram.com/enunaapp/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaInstagram className={styles.footer_icon} />
          </a>
        </div>
        <div className={styles.footer_text}>
          <p>
            © {new Date().getFullYear()} Tu Mesa en Una. Todos los derechos
            reservados.
          </p>
        </div>
        <div className={styles.footer_links}>
          {/* <Link to="/faq" className={styles.footer_link}>Preguntas Frecuentes</Link> */}
          <Link to="/términos-y-condiciones" className={styles.footer_link}>Términos y Condiciones</Link>
          <Link to="/politica-de-privacidad" className={styles.footer_link}>Política de Privacidad</Link>
          <Link to="/politica-de-privacidad-restaurante" className={styles.footer_link}>Política de Privacidad del restaurante</Link>

          <Link to="/contactanos" className={styles.footer_link_mobile}>Contacto</Link>
          <Link to="/sobre-nosotros" className={styles.footer_link_mobile}>Acerca de Nosotros</Link>
          <Link to="/preguntas-frecuentes" className={styles.footer_link_mobile}>Preguntas frecuentes</Link>
          <Link to="/sobre-nosotros" className={styles.footer_link_mobile}>¿Quienes somos?</Link>

          
        </div>
      </div>
    </footer>
  );
};

export default Footer;
