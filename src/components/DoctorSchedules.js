import React, { useEffect, useState } from "react";
import styles from "../styles/NewSchedule.module.css";
import { format, startOfWeek, addDays, isBefore, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

function addMinutesToTime(time, minutes) {
  const [h, m] = time.split(":").map(Number);
  const date = new Date(2000, 0, 1, h, m);
  date.setMinutes(date.getMinutes() + minutes);
  return date.toTimeString().slice(0, 5);
}

export default function DoctorSchedules() {
  const [weekOffset, setWeekOffset] = useState(0);
  const [slotsByDay, setSlotsByDay] = useState({});
  const [scheduleConfig, setScheduleConfig] = useState([]); 
  const [loading, setLoading] = useState(false);
  const [slotDuration, setSlotDuration] = useState(30);

  const token = jwtDecode(localStorage.getItem("user"));
  const doctorId = token.sub;

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
  const weekStart = addDays(startOfCurrentWeek, weekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const isFirstWeek = weekOffset === 0;

  useEffect(() => {
    async function fetchConfig() {
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/doctors/config-availability`,
          {
            params: { doctorId },
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
          }
        );
        setScheduleConfig(res.data.data);
        const firstActive = res.data.data.find(d => d.active);
        if (firstActive) setSlotDuration(firstActive.interval);
      } catch {
        setScheduleConfig([]);
      }
    }
    fetchConfig();
  }, [doctorId]);

  useEffect(() => {
    async function fetchAvailability() {
      setLoading(true);
      try {
        const res = await axios.get(
          `${process.env.REACT_APP_API_URL}/doctors/availability`,
          {
            params: { doctorId, weekStart: format(weekStart, "yyyy-MM-dd") },
            headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
          }
        );
        setSlotsByDay(res.data.data); 
      } catch {
        setSlotsByDay({});
      }
      setLoading(false);
    }
    fetchAvailability();
  }, [doctorId, weekStart, scheduleConfig]);

  function getTimeSlotsForDay(dayIdx) {
    const config = scheduleConfig[dayIdx];
    if (!config || !config.active || !config.startTime || !config.endTime) return [];
    const slots = [];
    let time = config.startTime;
    while (time < config.endTime) {
      slots.push(time);
      time = addMinutesToTime(time, config.interval);
      if (time > config.endTime) break;
    }
    return slots;
  }

  const maxRows = Math.max(
    1,
    ...weekDays.map((_, idx) => getTimeSlotsForDay(idx).length)
  );

  const toggleSlot = (dateStr, time) => {
    setSlotsByDay((prev) => {
      const daySlots = prev[dateStr] || [];
      if (daySlots.includes(time)) {
        return { ...prev, [dateStr]: daySlots.filter((t) => t !== time) };
      } else {
        return { ...prev, [dateStr]: [...daySlots, time].sort() };
      }
    });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/doctors/availability`,
        { doctorId, slotsByDay },
        { headers: { Authorization: `Bearer ${localStorage.getItem("user")}` } }
      );
      alert("Disponibilidade salva com sucesso!");
    } catch {
      alert("Erro ao salvar disponibilidade.");
    }
    setLoading(false);
  };

  const handleNextWeek = () => setWeekOffset((prev) => prev + 1);
  const handlePrevWeek = () => { if (!isFirstWeek) setWeekOffset((prev) => prev - 1); };

  const formatRange = (start, end) => {
    const startFmt = format(start, "d", { locale: ptBR });
    const endFmt = format(end, "d 'de' MMMM", { locale: ptBR });
    return `${startFmt} a ${endFmt}`;
  };

  return (
    <div className={styles.container}>
      <h2>Configurar Disponibilidade</h2>
      <div style={{ marginBottom: 16 }}>
        <label>Duração da consulta:&nbsp;</label>
        <select
          value={slotDuration}
          onChange={e => setSlotDuration(Number(e.target.value))}
          disabled
        >
          <option value={30}>30 minutos</option>
          <option value={45}>45 minutos</option>
          <option value={60}>60 minutos</option>
        </select>
        <span style={{marginLeft:8, color:"#888"}}>Altere o intervalo em "Horários e Dias de Atendimento"</span>
      </div>
      <div className={styles.scheduleTableWrapper}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr className={styles.navRow}>
              <th colSpan="7">
                <button
                  className={`${styles.navButton} ${styles.left}`}
                  onClick={handlePrevWeek}
                  disabled={isFirstWeek || loading}
                >
                  &larr;
                </button>
                <span className={styles.weekLabel}>
                  {formatRange(weekDays[0], weekDays[6])}
                </span>
                <button
                  className={`${styles.navButton} ${styles.right}`}
                  onClick={handleNextWeek}
                  disabled={loading}
                >
                  &rarr;
                </button>
              </th>
            </tr>
            <tr className={styles.dayHeader}>
              {weekDays.map((date, idx) => (
                <th key={idx}>
                  <div className={styles.dayName}>
                    {format(date, "EEEE", { locale: ptBR }).replace("-feira", "")}
                  </div>
                  <div className={styles.dayDate}>
                    {format(date, "dd/MM")}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: maxRows }).map((_, rowIdx) => (
              <tr key={rowIdx}>
                {weekDays.map((date, colIdx) => {
                  const dateStr = format(date, "yyyy-MM-dd");
                  const slots = getTimeSlotsForDay(colIdx);
                  const time = slots[rowIdx];
                  const isPast = isBefore(date, today) && !isSameDay(date, today);
                  const isAvailable = time && (slotsByDay[dateStr] || []).includes(time);

                  return (
                    <td
                      key={colIdx}
                      className={isPast ? styles.pastDay : styles.activeDay}
                      style={{
                        cursor: isPast || !time ? "not-allowed" : "pointer",
                        background: isAvailable ? "#c8e6c9" : undefined,
                        color: !time ? "#bbb" : undefined
                      }}
                      onClick={() => !isPast && time && toggleSlot(dateStr, time)}
                    >
                      {time || ""}
                      {isAvailable && time && <span style={{ color: "#388e3c", fontWeight: "bold" }}> ✔</span>}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <button onClick={handleSave} disabled={loading} style={{ marginTop: 24 }}>
        Salvar Disponibilidade
      </button>
    </div>
  );
}