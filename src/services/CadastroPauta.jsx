import axios from 'axios';
import { baseURL } from '../_config/index';

export const cadastrarPauta = async (listaDePautas) => {
  try {
    const response = await axios.post(baseURL + 'pauta', listaDePautas, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data

  } catch (err) {
    console.log('Erro ao cadastrar pauta:', error);
    throw error
  }
};
