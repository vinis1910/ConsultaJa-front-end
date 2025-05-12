import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/CreatePatient.module.css';


const CreatePatient = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    lastName: '',
    birthDate: '',
    phone: ''
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: '' // 'success' ou 'error'
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/patient', formData, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      if (response.status !== 201) {
        throw new Error();
      }

      showNotification('Cadastro realizado com sucesso!', 'success');
      
      // Reseta o formulário
      setFormData({
        email: '',
        password: '',
        name: '',
        lastName: '',
        birthDate: '',
        phone: ''
      });

    } catch (error) {
      // Mostra mensagem de erro
      const errorMessage = error.response?.data?.message || 
                          'Erro ao cadastrar paciente. Por favor, tente novamente.';
      showNotification(errorMessage, 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });

    // Esconde a notificação após 5 segundos
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 5000);
  };

  return (
    <div className="loginuser">
      <main>
        <div className={styles.card}>
          <h1 className={styles.title}>Criar Conta</h1>
          
          {notification.show && (
            <div className={`${styles.notification} ${styles[notification.type]}`}>
              {notification.message}
            </div>
          )}

          <form onSubmit={handleSubmit} className={styles.form}>
            <div className={styles.formGroup}>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={styles.input}
                placeholder='Digite seu e-mail'
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className={styles.input}
                placeholder='Senha'
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={styles.input}
                placeholder='Digite seu nome'
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={styles.input}
                placeholder='Digite seu sobrenome'
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label htmlFor='birthDate'>Data de nascimento</label>
              <input
                type="date"
                id="birthDate"
                name="birthDate"
                value={formData.birthDate}
                onChange={handleChange}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={styles.input}
                placeholder='Número de telefone'
                required
              />
            </div>

            <button type="submit" className={styles.submitButton}>Enviar</button>
          </form>
        </div>
      </main>
    </div>
  );
};

export default CreatePatient;