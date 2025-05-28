import React, { useCallback } from "react";
import { Calendar, dateFnsLocalizer, Views } from "react-big-calendar";
import { format, parse, startOfWeek, getDay, isBefore, startOfDay } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "../styles/agendar.css";

const locales = {
  "pt-BR": ptBR,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek: () => startOfWeek(new Date(), { weekStartsOn: 1 }),
  getDay,
  locales,
});

const messages = {
  week: "Semana",
  work_week: "Semana de Trabalho",
  day: "Dia",
  month: "Mês",
  previous: "Anterior",
  next: "Próxima",
  today: "Hoje",
  agenda: "Agenda",
  date: "Data",
  time: "Hora",
  event: "Evento",
  allDay: "Dia inteiro",
  noEventsInRange: "Não há horários disponíveis neste período.",
  showMore: total => `+ ${total} mais`,
};

export default function CalendarioConsulta({
  events,
  onSelectSlot,
  selectedDate,
}) {
  // Bloqueia seleção de datas passadas
  const isDateDisabled = useCallback((date) => {
    return isBefore(date, startOfDay(new Date()));
  }, []);

  const dayPropGetter = useCallback(date => {
    if (isDateDisabled(date)) {
      return {
        className: 'rbc-day-disabled',
        style: {
          cursor: 'not-allowed',
          backgroundColor: '#f0f0f0',
          opacity: 0.6
        }
      };
    }
    return {};
  }, [isDateDisabled]);
  
  const slotPropGetter = useCallback(date => {
    if (isDateDisabled(date)) {
      return {
        className: 'rbc-time-slot-disabled',
        style: {
          cursor: 'not-allowed',
          backgroundColor: '#f0f0f0',
          opacity: 0.6
        }
      };
    }
    return {};
  }, [isDateDisabled]);

  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor="start"
      endAccessor="end"
      selectable
      views={['week']}
      step={30}
      timeslots={1}
      defaultView={Views.WEEK}
      min={new Date(new Date().setHours(8,0,0,0))}
      max={new Date(new Date().setHours(18,0,0,0))}
      onSelectSlot={onSelectSlot}
      dayPropGetter={dayPropGetter}
      slotPropGetter={slotPropGetter}
      messages={messages}
      culture="pt-BR"
      formats={{
        dayFormat: date => format(date, 'EEEE dd/MM', { locale: ptBR }),
        timeGutterFormat: date => format(date, 'HH:mm', { locale: ptBR }),
      }}
      className="agendar-calendario"
    />
  );
}