import axios from 'axios';
import { baseURL } from '../config/index';

export const fetchPautistaData = async () => {
  try {
    const response = await axios.get(`${baseURL}/pautista/`);
    console.log("Dados da API:", response.data);
    return response.data;
  } catch (error) {
    console.error('Erro ao buscar os dados:', error);
    throw error;
  }
};
