import React, { useState } from "react";
import CalendarioConsulta from "./calendario";
import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import "../styles/agendar.css";

const especialidades = [
  "Cardiologia", "Dermatologia", "Ortopedia", "Pediatria", 
  "Oftalmologia", "Psiquiatria", "Neurologia", "Clínica Geral"
];

function AgendarConsulta() {
  const [form, setForm] = useState({
    especialidade: "",
    medico: "",
    dataHora: null,
    observacoes: "",
  });
  const [notificacao, setNotificacao] = useState({ show: false, message: "", type: "" });
  const [events, setEvents] = useState([]); 

  const handleSlotSelect = (slotInfo) => {
    const slotStart = new Date(slotInfo.start);
    // Não permite selecionar horários já ocupados
    const isOcupado = events.some(evento => 
      (slotStart >= new Date(evento.start) && slotStart < new Date(evento.end))
    );
    if (isOcupado) {
      setNotificacao({
        show: true,
        message: "Este horário já está ocupado!",
        type: "error"
      });
      setTimeout(() => setNotificacao({ show: false, message: "", type: "" }), 3000);
      return;
    }
    setForm((prev) => ({ ...prev, dataHora: slotStart }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (name === "especialidade") setForm((prev) => ({ ...prev, medico: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.dataHora) {
      setNotificacao({ show: true, message: "Selecione data e horário!", type: "error" });
      return;
    }
    if (!form.especialidade || !form.medico) {
      setNotificacao({ show: true, message: "Preencha todos os campos obrigatórios!", type: "error" });
      return;
    }
    const novoAgendamento = {
      title: `Consulta - ${form.medico}`,
      start: new Date(form.dataHora),
      end: new Date(new Date(form.dataHora).getTime() + 30 * 60000),
    };
    setEvents([...events, novoAgendamento]);
    setNotificacao({ show: true, message: "Consulta agendada com sucesso!", type: "success" });
    setForm({
      especialidade: "",
      medico: "",
      dataHora: null,
      observacoes: "",
    });
    setTimeout(() => setNotificacao({ show: false, message: "", type: "" }), 4000);
  };


  const medicosFiltrados = [];

  return (
    <div className="agendar-bg">
      <div className="agendar-card">
        <h1 className="agendar-title">Agendar Consulta</h1>
        <p className="agendar-subtitle">
          Escolha a especialidade, o médico e selecione o horário disponível no calendário.
        </p>
        {notificacao.show && (
          <div className={`agendar-notification ${notificacao.type}`}>
            {notificacao.message}
          </div>
        )}
        <form className="agendar-form" onSubmit={handleSubmit}>
          <div className="agendar-row">
            <div className="agendar-group">
              <label htmlFor="especialidade">Especialidade</label>
              <select
                id="especialidade"
                name="especialidade"
                value={form.especialidade}
                onChange={handleChange}
                required
              >
                <option value="">Selecione</option>
                {especialidades.map((esp) => (
                  <option key={esp} value={esp}>{esp}</option>
                ))}
              </select>
            </div>
            <div className="agendar-group">
              <label htmlFor="medico">Médico</label>
              <select
                id="medico"
                name="medico"
                value={form.medico}
                onChange={handleChange}
                required
                disabled={!form.especialidade}
              >
                <option value="">Selecione</option>
                {medicosFiltrados.map((m) => (
                  <option key={m.nome} value={m.nome}>{m.nome}</option>
                ))}
              </select>
            </div>
          </div>
          <div className="agendar-group calendario-container">
            <label className="calendario-label">
              <span>Escolha o dia e horário</span>
              {form.dataHora && (
                <span className="data-selecionada">
                  Selecionado: {format(form.dataHora, "dd 'de' MMMM', às' HH:mm", { locale: ptBR })}
                </span>
              )}
            </label>
            <CalendarioConsulta
              events={events}
              onSelectSlot={handleSlotSelect}
              selectedDate={form.dataHora}
            />
          </div>
          <div className="agendar-group">
            <label htmlFor="observacoes">Observações</label>
            <textarea
              id="observacoes"
              name="observacoes"
              value={form.observacoes}
              onChange={handleChange}
              rows={3}
              placeholder="Se necessário, adicione observações para o médico"
            />
          </div>
          <button type="submit" className="agendar-btn">
            Agendar Consulta
          </button>
        </form>
      </div>
    </div>
  );
}

export default AgendarConsulta;