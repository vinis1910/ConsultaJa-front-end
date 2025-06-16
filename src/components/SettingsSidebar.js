import React from 'react';
import { Link } from 'react-router-dom';
import styles from '../styles/SettingsSidebar.module.css';
import { jwtDecode } from 'jwt-decode';

const SettingsSidebar = () => {
  const decodedToken = jwtDecode(localStorage.getItem("user"));

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link to="/conta" className={styles.navItem}>
          Configurações da Conta
        </Link>
        
        {decodedToken.role === 'Doctor' && (
          <Link to="/atendimento" className={styles.navItem}>
            Horários e Dias de Atendimento
          </Link>
        )}

        {decodedToken.role === 'Patient' && (
          <Link to="/consultas" className={styles.navItem}>
            Histórico de Consultas
          </Link>
        )}
      </nav>
    </div>
  );
};

export default SettingsSidebar;