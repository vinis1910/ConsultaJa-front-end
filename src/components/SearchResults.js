import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/SearchResults.module.css';
import { FormatPhone } from '../utils/FormatPhone';
import { useAuth } from '../utils/AuthContext';


const SearchResults = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const searchParams = new URLSearchParams(location.search);
  const especialidade = searchParams.get('especialidade');
  const cidade = searchParams.get('cidade');
  const auth = useAuth();


  useEffect(() => {
    
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctors`, {
          params: {
            city: cidade,
            specialization: especialidade
          }
        });

        if (response.data.statusCode === 200) {
          setDoctors(response.data.data);
        } else {
          throw new Error(response.data.message || 'Erro ao buscar médicos');
        }
      } catch (err) {
        setError(err.response?.data?.message || 'Erro ao carregar resultados');
        console.error('Erro na busca:', err);
      } finally {
        setLoading(false);
      }
    };

    if (especialidade && cidade) {
      fetchDoctors();
    } else {
      setError('Parâmetros de busca inválidos');
      setLoading(false);
    }
  }, [location.search,especialidade,cidade]);


  const handleScheduleAppointment = (doctor) => {
    if (!auth.user) {
      navigate("/entrar");
    } else {
      navigate("/nova-consulta", { state: { doctor } });
    }
  };

  if (loading) {
    return <div className={styles.loading}>Carregando médicos...</div>;
  }

  if (error) {
    return (
      <div className={styles.error}>
        {error}
        <br />
        <button
          className={styles.scheduleButton}
          style={{ marginTop: 16 }}
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>
      </div>
    );

  }

  if (doctors.length === 0) {
    return (
      <div className={styles.noResults}>
        Nenhum médico encontrado para os critérios de busca.
        <br />
        <button
          className={styles.scheduleButton}
          style={{ marginTop: 16 }}
          onClick={() => navigate(-1)}
        >
          Voltar
        </button>

      </div>
    );
  }

  return (
    <div className={styles.resultsContainer}>
      <h2 className={styles.resultsTitle}>
        Resultados de busca
      </h2>

      <div className={styles.doctorsList}>
        {doctors.map((doctor) => (
          <div key={doctor.id} className={styles.doctorCard}>
            <div className={styles.doctorInfo}>
              <h3 className={styles.doctorName}>
                {doctor.firstName} {doctor.lastName}
              </h3>
              <p className={styles.doctorSpecialization}>
                {especialidade}
              </p>
              <p className={styles.doctorAddress}>
                {doctor.address.street}, {doctor.address.neighborhood},
                 n° {doctor.address.number} , {doctor.address.city}/{doctor.address.state}
              </p>
              <p className={styles.doctorPhone}>
                {FormatPhone(doctor.phone)}
              </p>
            </div>
            <button
              onClick={() => handleScheduleAppointment(doctor)}

              className={styles.scheduleButton}
            >
              Agendar Consulta
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;