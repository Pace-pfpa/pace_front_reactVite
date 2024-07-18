import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { TabelaCadastroPautista } from '../components/TabelaCadastroPautista';
import { baseURL } from '../_config/index';

export const ConsultaPautista = () => {
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({
    nome: '',
    grupo: '',
    status: '',
  });

  const limparCampos = () => {
    setFormValues({
      nome: '',
      grupo: '',
      status: '',
    });
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}pautista/`);
      const formattedData = response.data.map(item => ({
        ...item,
        dataInicial: formatarData(item.dataInicial),
        dataFinal: formatarData(item.dataFinal),
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  const pesquisar = async () => {
    try {
      const response = await axios.get(`${baseURL}pautista/`, { params: formValues });
      const formattedData = response.data.map(item => ({
        ...item,
        dataInicial: formatarData(item.dataInicial),
        dataFinal: formatarData(item.dataFinal),
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const formatarData = (data) => {
    if (data) {
      return data.split('-').reverse().join('-');
    }
    return '';
  };

  return (
    <>
     <div>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Consultar Pautista
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2, 
          mt: 2  
        }}
      >
        <Button
          variant="outlined"
          startIcon={<DeleteIcon />}
          sx={{ borderColor: '#D32F2F', color: '#D32F2F' }}
        >
          Deletar
        </Button>
        <Button
          variant="outlined"
          endIcon={<EditIcon />}
        >
          Editar
        </Button>
        <Button
          variant="outlined"
          endIcon={<AdfScannerIcon />}
          sx={{ borderColor: '#757575', color: '#757575' }}
        >
          Imprimir
        </Button>
      </Box>
    </div>

      <TabelaCadastroPautista data={data} />
    </>
  );
};
