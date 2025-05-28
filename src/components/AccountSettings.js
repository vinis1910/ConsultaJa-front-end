import React, { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import styles from '../styles/AccountSettings.module.css';

const AccountSettings = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    password: '',
    phone: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Lógica de envio
    console.log('Dados enviados:', formData);
  };

  return (
    <div className={styles.container}>
      <SettingsSidebar />
      <div className={styles.content}>
        <h1>Configurações da Conta</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <label>Nome</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className={styles.formGroup}>
            <label>Sobrenome</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Senha</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Telefone</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className={styles.submitButton}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default AccountSettings;