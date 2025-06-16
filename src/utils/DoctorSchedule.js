import axios from "axios";

/**
 * Busca horários disponíveis de um médico para uma lista de datas.
 * @param {number} doctorId - ID do médico
 * @param {string[]} dates - Array de datas no formato 'yyyy-MM-dd'
 * @returns {Promise<Object>} - Um objeto { [date]: [horários disponíveis] }
 */
export async function fetchDoctorAvailableSlots(doctorId, dates) {
  const result = {};
  for (const date of dates) {
    try {
      // Faz a requisição individual para cada dia, no formato aceito pelo backend
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/appointments`,
        {
          params: { doctorId, date },
          headers: { Authorization: `Bearer ${localStorage.getItem("user")}` },
        }
      );
      // Filtra apenas horários disponíveis
      result[date] = (response.data.data || []).filter(
        (slot) => slot.status === "available"
      );
    } catch (e) {
      // Se não houver agenda para o dia, retorna array vazio
      result[date] = [];
    }
  }
  return result;
}