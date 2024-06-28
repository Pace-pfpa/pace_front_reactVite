import axios from 'axios';
import { baseURL } from '../_config/index';

export const cadastrarPauta = async (payload) => {
  try {
    const response = await axios.post(baseURL + 'pauta', payload);
      console.log('Respostaaaaaa do servidor: ', response.data)
      return response.data;
    } catch (error) {
      console.error('erro ao cadastrar pauta:', error)
      throw error
    }
}