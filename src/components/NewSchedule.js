import React, { useEffect, useState } from "react";
import styles from "../styles/NewSchedule.module.css";
import { fetchDoctors } from "../utils/Doctors";
import { format, startOfWeek, addDays, isBefore, isSameDay } from "date-fns";
import { ptBR } from "date-fns/locale";
import axios from "axios";

export default function NewSchedule() {
  const [doctors, setDoctors] = useState([]);
  const [specialties, setSpecialties] = useState([]);
  const [selectedSpecialty, setSelectedSpecialty] = useState("");
  const [filteredDoctors, setFilteredDoctors] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [slotsByDay, setSlotsByDay] = useState({});

  const today = new Date();
  const startOfCurrentWeek = startOfWeek(today, { weekStartsOn: 1 });
  const [currentWeekOffset, setCurrentWeekOffset] = useState(0);

  const weekStart = addDays(startOfCurrentWeek, currentWeekOffset * 7);
  const weekDays = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));
  const isFirstWeek = currentWeekOffset === 0;

  useEffect(() => {
    async function loadDoctors() {
      const docs = await fetchDoctors();
      setDoctors(docs);

      const uniqueSpecialties = Array.from(
        new Set(docs.map((doc) => doc.specialization))
      ).sort((a, b) => a.localeCompare(b));
      setSpecialties(uniqueSpecialties);
    }
    loadDoctors();
  }, []);

  useEffect(() => {
    if (selectedSpecialty) {
      setFilteredDoctors(
        doctors.filter((doc) => doc.specialization === selectedSpecialty)
      );
      setSelectedDoctor("");
    } else {
      setFilteredDoctors([]);
      setSelectedDoctor("");
    }
  }, [selectedSpecialty, doctors]);

  useEffect(() => {
    async function fetchSlots() {
      if (!selectedDoctor) {
        setSlotsByDay({});
        return;
      }
      const newSlots = {};
      for (const date of weekDays) {
        const dateStr = format(date, "yyyy-MM-dd");
        try {
          const res = await axios.get(
            `${process.env.REACT_APP_API_URL}/appointments`,
            {
              params: {
                doctorId: selectedDoctor,
                date: dateStr,
              },
              headers: {
                Authorization: `Bearer ${localStorage.getItem("user")}`,
              },
            }
          );
          newSlots[dateStr] = res.data.data.filter(
            (slot) => slot.status === "available"
          );
        } catch (e) {
          newSlots[dateStr] = [];
        }
      }
      setSlotsByDay(newSlots);
    }
    fetchSlots();
    // eslint-disable-next-line
  }, [selectedDoctor, weekStart]);

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

      <div className={styles.searchBarGroup}>
        <select
          className={styles.select}
          value={selectedSpecialty}
          onChange={(e) => setSelectedSpecialty(e.target.value)}
        >
          <option value="">Especialidades</option>
          {specialties.map((spec) => (
            <option key={spec} value={spec}>
              {spec}
            </option>
          ))}
        </select>
        <select
          className={styles.select}
          value={selectedDoctor}
          onChange={(e) => setSelectedDoctor(e.target.value)}
          disabled={!selectedSpecialty}
        >
          <option value="">Selecione o médico</option>
          {filteredDoctors.map((doc) => (
            <option key={doc.id} value={doc.id}>
              {doc.firstName} {doc.lastName}
            </option>
          ))}
        </select>
      </div>

      <div className={styles.scheduleTableWrapper}>
        <table className={styles.scheduleTable}>
          <thead>
            <tr className={styles.navRow}>
              <th colSpan="7">
                <button
                  className={`${styles.navButton} ${styles.left}`}
                  onClick={handlePrevWeek}
                  disabled={isFirstWeek}
                >
                  &larr;
                </button>
                <span className={styles.weekLabel}>
                  {formatRange(weekDays[0], weekDays[6])}
                </span>
                <button
                  className={`${styles.navButton} ${styles.right}`}
                  onClick={handleNextWeek}
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
                      {!isPast && selectedDoctor && slots[rowIdx]
                        ? slots[rowIdx].startTime
                        : ""}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
