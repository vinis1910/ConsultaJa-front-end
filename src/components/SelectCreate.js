import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "../styles/SelectCreate.module.css";

const SelectCreate = ({ onClose }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeIcon}
          onClick={onClose}
          aria-label="Fechar"
          type="button"
        >
          &times;
        </button>
        <h2>Criar nova conta como:</h2>
        <div className={styles.buttonGroup}>
          <button
            className={styles.button}
            onClick={() => navigate("/criar-conta/paciente")}
          >
            Paciente
          </button>
          <button
            className={styles.button}
            onClick={() => navigate("/criar-conta/medico")}
          >
            Médico
          </button>
        </div>
      </div>
    </div>
  );
};

export default SelectCreate;