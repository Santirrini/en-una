import styles from './Header.module.css'; 



export default function HeaderMobile() {
    return (
        <div className={styles.HeaderMobile}>
            <img src={require("../../Images/Logo.png")} alt="Logo" className={styles.logo} />

        </div>
    )
}