import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TabelaPautista from '../components/TabelaPautista';
import { baseURL } from '../_config/index';

const columns = [
  { id: 'nome', label: 'Pautistas', minWidth: 170 },
  { id: 'saldo', label: 'Quantidade de Audiências', minWidth: 170, align: 'center' }
];

export const TabelaPautistaContainer = () => {
  const [procuradores, setProcuradores] = useState([]);
  const [maxElements, setMaxElements] = useState(0);

  useEffect(() => {
    const pegarProcuradores = async () => {
      try {
        const responsePauta = await axios.get(baseURL + 'pauta/total');
        const responsePautista = await axios.get(baseURL + 'pautista/');
        const maxElements = responsePauta.headers['maxelements'];

        setMaxElements(maxElements);

        const lista = responsePautista.data;
        lista.forEach(procurador => {
          procurador.saldo = parseInt(procurador.saldo, 10);
        });

        setProcuradores(lista);
      } catch (error) {
        console.error('Erro ao pegar procuradores:', error);
      }
    };

    pegarProcuradores();
  }, []);

  return (
    <TabelaPautista columns={columns} rows={procuradores} total={maxElements} />
  );
};

