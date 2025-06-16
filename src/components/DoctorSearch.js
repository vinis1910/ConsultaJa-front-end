import React, { useState } from 'react';
import styles from  '../styles/DoctorSearch.module.css';
import { useNavigate } from 'react-router-dom';

const DoctorSearch = () => {
  const [searchData, setSearchData] = useState({
    specialization: '',
    city: ''
  });

  const navigate = useNavigate();

  const specializations = [
    "Anestesiologista",
    "Angiologista",
    "Cardiologista",
    "Cirurgião Cardiovascular",
    "Cirurgião da Mão",
    "Cirurgião de Cabeça e Pescoço",
    "Cirurgião do Aparelho Digestivo",
    "Cirurgião Geral",
    "Cirurgião Pediátrico",
    "Cirurgião Plástico",
    "Cirurgião Torácico",
    "Cirurgião Vascular",
    "Clínico Geral",
    "Dermatologista",
    "Endocrinologista",
    "Endoscopista",
    "Gastroenterologista",
    "Geneticista",
    "Geriatra",
    "Ginecologista",
    "Hematologista",
    "Homeopata",
    "Infectologista",
    "Mastologista",
    "Médico do Trabalho",
    "Médico de Família e Comunidade",
    "Nefrologista",
    "Neurocirurgião",
    "Neurologista",
    "Nutrólogo",
    "Nutricionista",
    "Obstetra",
    "Oftalmologista",
    "Oncologista Clínico",
    "Ortopedista",
    "Otorrinolaringologista",
    "Pediatra",
    "Pneumologista",
    "Proctologista",
    "Psiquiatra",
    "Psicólogo(a)",
    "Reumatologista",
    "Sexólogo",
    "Urologista",
    "Fisiatra",
    "Fisioterapeuta",
    "Terapia Ocupacional",
    "Fonodiólogo(a)",
    "Médico Intensivista",
    "Médico Esportivo",
    "Médico Paliativista",
    "Outros",
    "Alergista/Imunologista"
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const queryParams = new URLSearchParams({
      especialidade: searchData.specialization,
      cidade: searchData.city
    }).toString();

    navigate(`/pesquisa?${queryParams}`);
  };

  return (
    <div className={styles.searchContainer}>
      <h2 className={styles.searchTitle}>Agende sua consulta</h2>
      <form onSubmit={handleSubmit} className={styles.searchForm}>
        <div className={styles.formGrid}>
          <div className={styles.formGroup}>
            <label htmlFor="specialization">Especialidade</label>
            <select
              id="specialization"
              name="specialization"
              value={searchData.specialization}
              onChange={handleChange}
              className={styles.searchInput}
            >
              <option value="">Selecione</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="city">Cidade</label>
            <input
              type="text"
              id="city"
              name="city"
              value={searchData.city}
              onChange={handleChange}
              placeholder="Digite a cidade"
              className={styles.searchInput}
            />
          </div>

          <div className={styles.buttonWrapper}>
            <button type="submit" className={styles.searchButton}>
              Buscar
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DoctorSearch;