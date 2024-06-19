import axios from 'axios';
import { baseURL } from '../config/index';

export const fetchAdvogados = async () => {
    try {
      const response = await axios.get(baseURL + 'advogado/');
      return response.data;
    } catch (error) {
      console.error('Erro ao buscar advogados:', error);
      throw error;
    }
  };

export const cadastrarAdvogado = async (advogadoJson) => {
    console.log("Payload a ser enviado:", advogadoJson);
    try {
      const response = await axios.post(baseURL + 'advogado/', advogadoJson);
      console.log('Resposta do servidor: ', response.data)
      return response.data;
    } catch (error) {
      console.error('erro ao cadastrar advogado:', error)
      throw error
    }
  }