import styles from "../styles/Navbar.module.css";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../utils/AuthContext";

const Navbar = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout = () => {
        auth.logout();
        navigate('/',{replace:true});
    }

    return (
        <header className={styles.header}>
            <div className={styles.logo}>
                <a href="/">
                    <img src="/images/consulta-ja.png" alt="logo" className={styles.logo_img} />
                </a>
            </div>
            
            <div className={styles.spacer}></div>
            
            <nav>
                <ul className={styles.nav_links}>
                    {auth.user == null ? (
                        <>
                            <li>
                                <Link to="/entrar">Entrar</Link>
                            </li>
                            <li>
                                <Link to="/criar-conta/medico">Cadastro Médico</Link>
                            </li>
                            <li>
                                <Link to="/criar-conta/paciente">Cadastro Paciente</Link>
                            </li>
                        </>
                    ) : (
                        <>
                            <li>
                                <Link to="/conta">Minha Conta</Link>
                            </li>
                            <li>
                                <button className={styles.logout_button} onClick={handleLogout}>Sair</button>
                            </li>
                        </>
                    )
                    
                    }
                    
                </ul>
            </nav>
        </header>
    );
}

export default Navbar;