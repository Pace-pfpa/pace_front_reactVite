import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import TabelaPautista from '../components/TabelaPautista';
import { fetchPautistaData } from '../services/CadastroPautista';

const currencies = [
  {
    value: 'preposto',
    label: 'Preposto',
  },
  {
    value: 'procurador',
    label: 'Procurador',
  },
];

export const CadastroPautista = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pautistas = await fetchPautistaData();
        setData(pautistas || []);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setData([]); // Pode ser útil inicializar com array vazio em caso de erro
      }
    };

    fetchData();
  }, []); // O segundo argumento do useEffect é um array vazio para garantir que seja executado apenas uma vez

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Cadastrar Pautista
      </Typography>
      <Box sx={{ maxWidth: '600px' }}>
        <form>
          <div>
            <TextField
              id="outlined-basic"
              label="Nome"
              variant="outlined"
              sx={{ width: '100%', mb: 2 }}
            />
          </div>
          <div>
            <TextField
              id="outlined-select-currency"
              select
              label="Grupo"
              defaultValue="preposto"
              helperText="Por favor, selecione o grupo"
              sx={{ width: '100%', mb: 2 }}
            >
              {currencies.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <Button variant="outlined" className='clearButton'>
            Limpar
          </Button>
          <Button variant="contained" endIcon={<SendIcon />} className='sendButton' sx={{ ml: 1 }}>
            Enviar
          </Button>
        </form>
      </Box>
      {/* Renderiza a tabela somente se data estiver definido e não vazio */}
      {data.length > 0 && <TabelaPautista data={data} />}
    </>
  );
};
