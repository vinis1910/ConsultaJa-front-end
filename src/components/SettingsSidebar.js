import React from 'react';
import { Link } from 'react-router-dom';
import {useAuth} from '../utils/AuthContext';
import styles from '../styles/SettingsSidebar.module.css';

const SettingsSidebar = () => {
  const auth = useAuth();

  return (
    <div className={styles.sidebar}>
      <nav className={styles.nav}>
        <Link to="/conta" className={styles.navItem}>
          Configurações da Conta
        </Link>
        
        {auth.authData.role === 'Doctor' && (
          <Link to="/atendimento" className={styles.navItem}>
            Horários e Dias de Atendimento
          </Link>
        )}

        {auth.authData.role === 'Patient' && (
          <Link to="/#" className={styles.navItem}>
            Meus Agendamentos
          </Link>
        )}
      </nav>
    </div>
  );
};

export default SettingsSidebar;