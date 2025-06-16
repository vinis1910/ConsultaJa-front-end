import React from "react";
import styles from "../styles/Navbar.module.css";
import Dropmenu from "./Dropmenu";

function Navbar() {
    return (
        <header className={styles.header}>
            <Dropmenu />
            <div className={styles.center}>
                <a
                    href="/"
                    className={styles.logo_link}
                    onClick={e => {
                        e.preventDefault();
                        window.location.href = "/";
                    }}
                >
                    <img
                        src="/images/consulta-ja.png"
                        alt="ConsultaJá"
                        className={styles.logo_img}
                    />
                </a>
            </div>
        </header>
    );
}

export default Navbar;