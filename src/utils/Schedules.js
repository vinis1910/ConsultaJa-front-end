import axios from "axios";

/**
 * Busca os horários disponíveis e ocupados de um médico em um dia específico.
 * @param {number} doctorId - ID do médico
 * @param {string} date - Data no formato 'YYYY-MM-DD'
 * @returns {Promise<Array<{ startTime: string, endTime: string, status: string }>>}
 */
export async function fetchDoctorSchedules(doctorId, date) {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/appointments`, {
      params: { doctorId, date }
    });
    // O backend retorna um array de horários com status 'available' ou 'unavailable'
    return response.data.data || [];
  } catch (error) {
    console.error("Erro ao buscar horários do médico:", error);
    return [];
  }
}