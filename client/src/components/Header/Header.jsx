import { Link } from 'react-router-dom';
import styles from './Header.module.css'; 



export default function HeaderMobile() {
    return (
        <div className={styles.HeaderMobile}>
            <Link to="/">
            <img src={require("../../Images/Logo.png")} alt="Logo" className={styles.logo} />
            </Link>

        </div>
    )
}