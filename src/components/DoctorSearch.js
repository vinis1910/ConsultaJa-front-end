import React, { useState } from 'react';
import styles from  '../styles/DoctorSearch.module.css';
import { useNavigate } from 'react-router-dom';
import specializations from '../utils/specializations.js'; 

const DoctorSearch = () => {
  const [searchData, setSearchData] = useState({
    specialization: '',
    city: ''
  });

  const [locating, setLocating] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSearchData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleDetectLocation = async () => {
    if (!navigator.geolocation) {
      alert("Geolocalização não suportada pelo navegador.");
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        const data = await res.json();
        const city = data.address.city || data.address.town || data.address.village || '';
        setSearchData(prev => ({
          ...prev,
          city
        }));
      } catch {
        alert("Não foi possível detectar a cidade.");
      }
      setLocating(false);
    }, () => {
      alert("Permissão de localização negada.");
      setLocating(false);
    });
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
      <h2 className={styles.searchTitle}>Encontre profissionais perto de você</h2>
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
            <div style={{ display: "flex", gap: 8 }}>
              <input
                type="text"
                id="city"
                name="city"
                value={searchData.city}
                onChange={handleChange}
                placeholder="Digite a cidade"
                className={styles.searchInput}
              />
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={locating}
                style={{ minWidth: 40 }}
                title="Detectar localização"
              >
                {locating ? "..." : "📍"}
              </button>
            </div>
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