import styles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useState, useRef, useEffect } from "react";

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [accountDropdown, setAccountDropdown] = useState(false);
    const [consultasDropdown, setConsultasDropdown] = useState(false);
    const accountRef = useRef(null);
    const consultasRef = useRef(null);

    // Fecha dropdowns ao clicar fora
    useEffect(() => {
        function handleClickOutside(event) {
            if (
                accountRef.current && !accountRef.current.contains(event.target) &&
                consultasRef.current && !consultasRef.current.contains(event.target)
            ) {
                setAccountDropdown(false);
                setConsultasDropdown(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleLogout = () => {
        auth.logout();
        setAccountDropdown(false);
        navigate("/");
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>
                {/* Botão de Login/Conta */}
                <div className={styles.dropdownWrapper} ref={accountRef}>
                    {!auth.user ? (
                        <button
                            className={styles.text_button}
                            onClick={() => navigate("/entrar")}
                            type="button"
                        >
                            Fazer login
                        </button>
                    ) : (
                        <>
                            <button
                                className={styles.text_button}
                                onClick={() => setAccountDropdown(v => !v)}
                                type="button"
                            >
                                Minha conta
                            </button>
                            {accountDropdown && (
                                <div className={styles.dropdownMenu}>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={() => {
                                            setAccountDropdown(false);
                                            navigate("/profile");
                                        }}
                                        type="button"
                                    >
                                        Acessar meu perfil
                                    </button>
                                    <button
                                        className={styles.dropdownItem}
                                        onClick={handleLogout}
                                        type="button"
                                    >
                                        Desconectar
                                    </button>
                                </div>
                            )}
                        </>
                    )}
                </div>
                {/* Botão Consultas */}
                <div className={styles.dropdownWrapper} ref={consultasRef}>
                    <button
                        className={styles.text_button}
                        onClick={() => setConsultasDropdown(v => !v)}
                        type="button"
                    >
                        Consultas
                    </button>
                    {consultasDropdown && (
                        <div className={styles.dropdownMenu}>
                            <button
                                className={styles.dropdownItem}
                                onClick={() => {
                                    setConsultasDropdown(false);
                                    navigate("/nova-consulta");
                                }}
                                type="button"
                            >
                                Nova consulta
                            </button>
                            <button
                                className={styles.dropdownItem}
                                onClick={() => {
                                    setConsultasDropdown(false);
                                    navigate("/historico");
                                }}
                                type="button"
                            >
                                Meu histórico
                            </button>
                        </div>
                    )}
                </div>
            </div>
            <div className={styles.center}>
                <a
                    href="/"
                    className={styles.logo_link}
                    onClick={e => {
                        e.preventDefault();
                        navigate("/");
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
};

export default Navbar;