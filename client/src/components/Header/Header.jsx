import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export default function HeaderMobile() {
  return (
    <div className={styles.HeaderMobile} data-oid="j1ezwf8">
      <Link to="/" data-oid="emau7-l">
        <img
          src={require("../../Images/Logo.png")}
          alt="Logo"
          className={styles.logo}
          data-oid="_oi-pq_"
        />
      </Link>
    </div>
  );
}
