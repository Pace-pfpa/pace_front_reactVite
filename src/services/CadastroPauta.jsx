import axios from 'axios';
import { baseURL } from '../config/index';

export const cadastrarPauta = async () => {
  try {
    const response = await axios.post(baseURL + 'pautista/');
      console.log('Resposta do servidor: ', response.data)
      return response.data;
    } catch (error) {
      console.error('erro ao cadastrar pautista:', error)
      throw error
    }
}