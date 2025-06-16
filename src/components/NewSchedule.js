import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import styles from "../styles/NewSchedule.module.css";
import { format, startOfWeek, addDays, isBefore, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import { fetchDoctorConfigAvailability } from "../utils/DoctorSchedule";

export default function NewSchedule() {
  const location = useLocation();
  const doctor = location.state?.doctor;

  const [slotsByDay, setSlotsByDay] = useState({});
  const [loading, setLoading] = useState(false);

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const weekStart = addDays(startOfCurrentWeek, currentWeekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const isFirstWeek = currentWeekOffset === 0;

  useEffect(() => {
    if (!doctor) return;
    setLoading(true);

    const weekDates = weekDays.map((date) => format(date, "yyyy-MM-dd"));

    const token = localStorage.getItem("user");

    Promise.all(
      weekDates.map((dateStr) =>
        fetchDoctorConfigAvailability(
          doctor.id,
          token,
          dateStr
        )
          .then((slots) => ({ dateStr, slots }))
          .catch(() => ({ dateStr, slots: [] }))
      )
    ).then((results) => {

      const newSlots = {};
      results.forEach(({ dateStr, slots }) => {
        newSlots[dateStr] = slots;
      });
      setSlotsByDay(newSlots);
      setLoading(false);
    });
  }, [doctor, currentWeekOffset]);

  const handleNextWeek = () => setCurrentWeekOffset((prev) => prev + 1);

  const handlePrevWeek = () => {
    if (!isFirstWeek) setCurrentWeekOffset((prev) => prev - 1);
  };

  const formatRange = (start, end) => {
    const startFmt = format(start, "d", { locale: ptBR });
    const endFmt = format(end, "d 'de' MMMM", { locale: ptBR });
    return `${startFmt} a ${endFmt}`;
  };

  const maxRows = Math.max(
    1,
    ...Object.values(slotsByDay).map((slots) => slots.length)
  );


  return (
    <div className={styles.container}>
      <h2>Agendar Consulta</h2>

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
                  const isPast = isBefore(date, today) && !isSameDay(date, today);
                  const slots = slotsByDay[dateStr] || [];
                  return (
                    <td
                      key={colIdx}
                      className={isPast ? styles.pastDay : styles.activeDay}
                    >
                      {!isPast && doctor && slots[rowIdx]
                        ? slots[rowIdx].startTime
                        : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        {loading && <div style={{ marginTop: 16 }}>Carregando horários...</div>}
      </div>
    </div>
  );
}