import axios from 'axios';
import { baseURL } from '../_config/index';

export const gerarEscala = async (dataToSend) => {
    console.log("dataToSend da service", dataToSend)
    const { mutiraoId, grupo } = dataToSend;
    try {
        const response = await axios.post(
           `${baseURL}mutirao/${mutiraoId}/${grupo}`,
            {},
            {
                headers: {
                    'Content-Type': 'application/json'
                }
            }
    );
        console.log("response",response)
        return response.data;
    } catch (error) {
        console.error('Erro ao gerar escala:', error);
        throw error;
    }
};
