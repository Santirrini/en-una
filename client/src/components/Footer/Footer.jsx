import React from "react";
import styles from "./Footer.module.css"; // Estilos para el footer
import { FaSquareFacebook } from "react-icons/fa6";
import { FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer} data-oid="ho9fo:1">
      <hr data-oid="2jp59yd" />
      <br data-oid="v70j-90" />
      <div className={styles.footer_container} data-oid="5g0q-gh">
        <div className={styles.footer_social} data-oid="ib4vv3:">
          <a
            href="https://www.facebook.com/profile.php?id=61554385080807"
            target="_blank"
            rel="noopener noreferrer"
            data-oid="5ezqdlx"
          >
            <FaSquareFacebook
              className={styles.footer_icon}
              data-oid="657k26."
            />
          </a>
          <a
            href="https://www.instagram.com/enunaapp/?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw%3D%3D"
            target="_blank"
            rel="noopener noreferrer"
            data-oid="lpc4t_u"
          >
            <FaInstagram className={styles.footer_icon} data-oid="jk-dry:" />
          </a>
        </div>
        <div className={styles.footer_text} data-oid="_vopl-6">
          <p data-oid="mw-v3o8">
            © {new Date().getFullYear()} Tu Mesa en Una. Todos los derechos
            reservados.
          </p>
        </div>
        <div className={styles.footer_links} data-oid="08k-9tb">
          {/* <Link to="/faq" className={styles.footer_link}>Preguntas Frecuentes</Link> */}
          <Link
            to="/términos-y-condiciones"
            className={styles.footer_link}
            data-oid="whjsq5r"
          >
            Términos y Condiciones
          </Link>
          <Link
            to="/politica-de-privacidad"
            className={styles.footer_link}
            data-oid="1rx1ti9"
          >
            Política de Privacidad
          </Link>
          <Link
            to="/politica-de-privacidad-restaurante"
            className={styles.footer_link}
            data-oid="5_m6hb3"
          >
            Política de Privacidad del restaurante
          </Link>

          <Link
            to="/contactanos"
            className={styles.footer_link_mobile}
            data-oid="-t_uwn-"
          >
            Contacto
          </Link>
          <Link
            to="/preguntas-frecuentes"
            className={styles.footer_link_mobile}
            data-oid="08oy1dr"
          >
            Preguntas frecuentes
          </Link>
          <Link
            to="/sobre-nosotros"
            className={styles.footer_link_mobile}
            data-oid="ad9f9ey"
          >
            ¿Quienes somos?
          </Link>
        </div>
        <div className={styles.book_reclam} data-oid=".o4x_jd">
          <Link to="/libro-de-quejas" data-oid="9:viy5m">
            <img
              src="https://images.deliveryhero.io/image/pedidosya/care/complaint_book_1.png?width=99&dpi=2"
              alt="Libro de reclamaciones"
              data-oid="zrr_pch"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
