import React, { useState } from 'react';
import SettingsSidebar from './SettingsSidebar';
import styles from '../styles/ScheduleSettings.module.css';

const daysMapping = [
  { pt: 'Segunda-feira', en: 'monday' },
  { pt: 'Terça-feira', en: 'tuesday' },
  { pt: 'Quarta-feira', en: 'wednesday' },
  { pt: 'Quinta-feira', en: 'thursday' },
  { pt: 'Sexta-feira', en: 'friday' },
  { pt: 'Sábado', en: 'saturday' },
  { pt: 'Domingo', en: 'sunday' }
];

const ScheduleSettings = () => {
  const [schedule, setSchedule] = useState(
    daysMapping.map(day => ({
      displayDay: day.pt,  // Exibição em português
      serverDay: day.en,   // Envio em inglês
      startTime: '',
      endTime: '',
      interval: 30,
      active: false
    }))
  );

  const handleChange = (index, field, value) => {
    const newSchedule = [...schedule];
    newSchedule[index][field] = value;
    
    // Se está configurando horários, marca como ativo automaticamente
    if ((field === 'startTime' || field === 'endTime') && value) {
      newSchedule[index].active = true;
    }
    
    setSchedule(newSchedule);
  };

  const toggleDayActive = (index) => {
    const newSchedule = [...schedule];
    newSchedule[index].active = !newSchedule[index].active;
    
    // Limpa os horários se estiver desativando
    if (!newSchedule[index].active) {
      newSchedule[index].startTime = '';
      newSchedule[index].endTime = '';
    }
    
    setSchedule(newSchedule);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const activeSchedules = schedule.filter(daySchedule => 
      daySchedule.active && 
      daySchedule.startTime && 
      daySchedule.endTime
    );
    
    const dataToSend = activeSchedules.map(({ serverDay, startTime, endTime, interval }) => ({
      day: serverDay,  // Envia em inglês
      startTime,
      endTime,
      interval: parseInt(interval)
    }));
    
    console.log('Dados para enviar:', dataToSend);
    // axios.post(`${process.env.REACT_APP_API_URL}/schedule`, dataToSend)
  };

  return (
    <div className={styles.container}>
      <SettingsSidebar />
      <div className={styles.content}>
        <h1>Horários de Atendimento</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          {schedule.map((daySchedule, index) => (
            <div key={daySchedule.serverDay} className={styles.dayContainer}>
              <div className={styles.dayHeader}>
                <h3>
                  <input
                    type="checkbox"
                    checked={daySchedule.active}
                    onChange={() => toggleDayActive(index)}
                    className={styles.dayCheckbox}
                  />
                  {daySchedule.displayDay}
                </h3>
              </div>
              
              {daySchedule.active && (
                <div className={styles.timeInputs}>
                  <div className={styles.inputGroup}>
                    <label>Início</label>
                    <input
                      type="time"
                      value={daySchedule.startTime}
                      onChange={(e) => handleChange(index, 'startTime', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Fim</label>
                    <input
                      type="time"
                      value={daySchedule.endTime}
                      onChange={(e) => handleChange(index, 'endTime', e.target.value)}
                      required
                    />
                  </div>
                  
                  <div className={styles.inputGroup}>
                    <label>Intervalo (minutos)</label>
                    <select
                      value={daySchedule.interval}
                      onChange={(e) => handleChange(index, 'interval', e.target.value)}
                    >
                      <option value={30}>30</option>
                      <option value={60}>60</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          ))}
          <button type="submit" className={styles.submitButton}>
            Salvar
          </button>
        </form>
      </div>
    </div>
  );
};

export default ScheduleSettings;