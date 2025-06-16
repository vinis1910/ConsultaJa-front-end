import axios from "axios";

/**
 * Busca a configuração de disponibilidade do médico
 * @param {number} doctorId
 * @param {string} [token] 
 * @param {date} [date]
 * @returns {Promise<Array>} 
 */
export async function fetchDoctorConfigAvailability(doctorId, token, date) {
  const res = await axios.get(
    `${process.env.REACT_APP_API_URL}/appointments`,
    {
      params: { doctorId, date },
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    }
  );
  return res.data.data;
}