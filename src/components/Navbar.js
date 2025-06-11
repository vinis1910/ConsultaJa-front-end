import styles from "../styles/Navbar.module.css";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";
import { useState, useRef, useEffect } from "react";
import { jwtDecode } from "jwt-decode";

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();
    const [accountDropdown, setAccountDropdown] = useState(false);
    const [consultasDropdown, setConsultasDropdown] = useState(false);
    const accountRef = useRef(null);
    const consultasRef = useRef(null);

    // Descobre se é médico
    let isDoctor = false;
    if (auth.user) {
        try {
            const decoded = jwtDecode(auth.user);
            isDoctor = decoded.role === "Doctor";
        } catch {}
    }

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
        setConsultasDropdown(false);
        navigate("/");
    };

    // Funções para garantir só um dropdown aberto
    const handleAccountDropdown = () => {
        setAccountDropdown(v => !v);
        setConsultasDropdown(false);
    };
    const handleConsultasDropdown = () => {
        setConsultasDropdown(v => !v);
        setAccountDropdown(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.left}>

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
                                onClick={handleAccountDropdown}
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

                <div className={styles.dropdownWrapper} ref={consultasRef}>
                    <button
                        className={styles.text_button}
                        onClick={handleConsultasDropdown}
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
                                    if (!auth.user) {
                                        navigate("/entrar");
                                    } else if (isDoctor) {
                                        navigate("/meus-horarios");
                                    } else {
                                        navigate("/nova-consulta");
                                    }
                                }}
                                type="button"
                            >
                                {isDoctor ? "Meus horários" : "Nova consulta"}
                            </button>
                            {auth.user && !isDoctor && (
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
                            )}
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