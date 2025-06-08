import { BsWhatsapp } from "react-icons/bs";
import styles from "./ButtonWhatsaapp.module.css";

export default function ButtonWhatsapp() {
  return (
    <div data-oid="ginhzg9">
      <a
        href="https://wa.me/+51997915937"
        className={styles.whatsapp}
        target="__blank"
        data-oid=":7e_zoo"
      >
        {" "}
        <i className={styles.icon_whatsapp} data-oid="9juxmof">
          <BsWhatsapp data-oid="_57f1vy" />
        </i>
      </a>
    </div>
  );
}
