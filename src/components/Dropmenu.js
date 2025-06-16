import React, { useState, useRef, useEffect } from "react";
import styles from "../styles/Dropmenu.module.css";
import { useAuth } from "../utils/AuthContext";

function Dropmenu() {
    const [menuOpen, setMenuOpen] = useState(false);
    const menuRef = useRef();
    const auth = useAuth();

    useEffect(() => {
        function handleClickOutside(event) {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setMenuOpen(false);
            }
        }
        if (menuOpen) {
            document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [menuOpen]);

    const handleLogout = () => {
        auth.logout();
        setMenuOpen(false);
        window.location.href = "/entrar";
    };

    return (
        <div className={styles.dropdownWrapper} ref={menuRef}>
            <button
                className={styles.dropdownButton}
                onClick={() => setMenuOpen(open => !open)}
                aria-label="Abrir menu"
            >
                <span style={{ fontSize: "2rem", lineHeight: 1 }}>&#9776;</span>
            </button>
            {menuOpen && (
                <div className={styles.dropdownMenu}>
                    {!auth.user ? (
                        <a href="/entrar" className={styles.dropdownItem}>Login</a>
                    ) : (
                        <a href="/conta" className={styles.dropdownItem}>Meu perfil</a>
                    )}
                    <a href="/nova-consulta" className={styles.dropdownItem}>Agendar consulta</a>
                    {auth.user && (
                        <button className={styles.dropdownItem} onClick={handleLogout}>
                            Desconectar
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}

export default Dropmenu;