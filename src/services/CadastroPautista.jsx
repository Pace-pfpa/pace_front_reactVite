import axios from 'axios';
import { baseURL } from '../config/index';

export const fetchPautistaData = async () => {
  try {
    const response = await axios.get(baseURL + 'pautista/');
    console.log("Dados da APII:", response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    throw error;
  }
};

export const cadastrarPautista = async (pautistaJson) => {
  try {
    const response = await axios.post(baseURL + 'pautista/', pautistaJson);
    return response.data;
  } catch (error) {
    console.error('erro ao cadastrar pautista:', error)
    throw error
  }
}
