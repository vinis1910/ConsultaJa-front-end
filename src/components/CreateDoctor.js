import React, { useState } from 'react';
import axios from 'axios';
import styles from '../styles/CreateDoctor.module.css';

const CreateDoctor = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    gender: 'Masculino',
    cpf: '',
    birthDate: '',
    phone: '',
    crm: '',
    crmUf: 'AC'
  });

  const [notification, setNotification] = useState({
    show: false,
    message: '',
    type: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await axios.post('http://localhost:3000/doctors', formData);
      
      if (response.status !== 201){
        throw new Error();
      }

      showNotification('Médico cadastrado com sucesso!', 'success');
      setFormData({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
        gender: 'Masculino',
        cpf: '',
        birthDate: '',
        phone: '',
        crm: '',
        crmUf: ''
      });
      
    } catch (error) {
      const errorMessage = error.response?.data?.message || 
                         'Erro ao cadastrar médico. Tente novamente.';
      showNotification(errorMessage, 'error');
    }
  };

  const showNotification = (message, type) => {
    setNotification({
      show: true,
      message,
      type
    });
    setTimeout(() => setNotification(prev => ({ ...prev, show: false })), 5000);
  };

  const states = [
    'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 
    'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 
    'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO'
  ];

  return (
    <div className={styles.container}>
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
              placeholder='Senha'
              required
            />
          </div>

          <div className={styles.formGroup}>
            <input
              type="text"
              id="firstName"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
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
              placeholder='Digite seu sobrenome'
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label>Sexo</label>
            <div className={styles.radioGroup}>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="Masculino"
                  checked={formData.gender === 'Masculino'}
                  onChange={handleChange}
                />
                Masculino
              </label>
              <label className={styles.radioLabel}>
                <input
                  type="radio"
                  name="gender"
                  value="Feminino"
                  checked={formData.gender === 'Feminino'}
                  onChange={handleChange}
                />
                Feminino
              </label>
            </div>
          </div>

          <div className={styles.formGroup}>
            
            <input
              type="text"
              id="cpf"
              name="cpf"
              value={formData.cpf}
              onChange={handleChange}
              placeholder='CPF'
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="birthDate">Data de Nascimento</label>
            <input
              type="date"
              id="birthDate"
              name="birthDate"
              value={formData.birthDate}
              onChange={handleChange}
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
              placeholder='Número de telefone'
              required
            />
          </div>

          <div className={styles.formGroup}>
            
            <input
              type="text"
              id="crm"
              name="crm"
              value={formData.crm}
              onChange={handleChange}
              placeholder='CRM'
              required
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="crmUf">UF do CRM</label>
            <select
              id="crmUf"
              name="crmUf"
              value={formData.crmUf}
              onChange={handleChange}
              required
            >
              
              {states.map(state => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
          </div>

          <button type="submit" className={styles.submitButton}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default CreateDoctor;