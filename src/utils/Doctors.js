import axios from "axios";

/**
 * Busca todos os médicos e suas especializações
 * @returns {Promise<Array<{ id: number, firstName: string, lastName: string, specialization: string }>>}
 */

export async function fetchDoctors() {
  try {
    const response = await axios.get(`${process.env.REACT_APP_API_URL}/doctors`);
    return response.data.data || [];
  } catch (error) {
    console.error("Erro ao buscar médicos:", error);
    return [];
  }
}