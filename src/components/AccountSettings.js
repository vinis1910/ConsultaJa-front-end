import React, { useEffect, useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import styles from '../styles/AccountSettings.module.css';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const AccountSettings = () => {
  const decodedToken = jwtDecode(localStorage.getItem("user"));
  const endpoint = decodedToken.role === 'Patient' ? "/patient" : "/doctors";
  const [notification, setNotification] = useState({
      show: false,
      message: "",
      type: "",
  });

  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type,
    });

    setTimeout(() => {
      setNotification((prev) => ({ ...prev, show: false }));
    }, 5000);
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    /**
     * IMPLEMENTAR LÓGICA DE ENVIO E EXIBIR NOTIFICAÇÃO
     */
    console.log('Dados enviados:', formData);
  };

  useEffect(() => {
    const fetchUserData = async () => {
      
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}` + endpoint + `/${decodedToken.sub}`);
        setFormData({
          firstName: response.data.data.firstName,
          lastName: response.data.data.lastName,
          phone: response.data.data.phone,
          password:''
        })

        if(response.status !== 200){throw new Error();}

      } catch (error) {
        const errorMessage = error.response?.data?.message || "Erro ao buscar dados";
        showNotification(errorMessage, "error");
      }

    };

    fetchUserData();
  }, [endpoint, decodedToken.sub]);

  return (
    <div className={styles.container}>
      <SettingsSidebar />
      <div className={styles.content}>
        <h1>Configurações da Conta</h1>

        {notification.show && <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>}

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