import axios from 'axios';
import { baseURL } from '../config';

export const getMutiraoCount = async () => {
    try {
        const response = await axios.get(baseURL + 'mutirao/')
        return response.data.length;
    }catch (error) {
        console.error('Erro ao buscar dados dos mutirões:', error);
        throw error;
    }
}

export const getPautistaCount = async () => {
    try {
        const response = await axios.get(baseURL + 'pautista/')
        return response.data.length;
    } catch (error) {
        console.error('Erro ao buscar dados dos pautistas:',error);
        throw error;
    }
}