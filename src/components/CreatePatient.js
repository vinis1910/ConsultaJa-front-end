import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/CreateAccount.module.css";

const CreatePatient = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    birthDate: "",
    phone: "",
  });

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/patient`, formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status !== 201) {
        throw new Error();
      }

      showNotification("Cadastro realizado com sucesso!", "success");

      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        birthDate: "",
        phone: "",
      });
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Erro ao cadastrar paciente. Por favor, tente novamente.";
      showNotification(errorMessage, "error");
    }
  };

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

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Criar Conta</h1>

        {notification.show && <div className={`${styles.notification} ${styles[notification.type]}`}>{notification.message}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.formGroup}>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} placeholder="Digite seu e-mail" required />
          </div>

          <div className={styles.formGroup}>
            <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} placeholder="Senha" required />
          </div>

          <div className={styles.formGroup}>
            <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="Digite seu nome" required />
          </div>

          <div className={styles.formGroup}>
            <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Digite seu sobrenome" required />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="birthDate">Data de Nascimento</label>
            <input type="date" id="birthDate" name="birthDate" value={formData.birthDate} onChange={handleChange} required />
          </div>

          <div className={styles.formGroup}>
            <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} placeholder="Número de telefone" required />
          </div>

          <button type="submit" className={styles.submitButton}>
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePatient;
