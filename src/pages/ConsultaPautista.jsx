import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import { EditarPautista } from './EditarPautista';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import { TabelaCadastroPautista } from '../components/TabelaCadastroPautista';
import { baseURL } from '../_config/index';
import { useNavigate } from 'react-router-dom';

export const ConsultaPautista = () => {
  const navigate = useNavigate()
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL + 'pautista/');
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

  const formatarData = (data) => {
    if (data) {
      return data.split('-').reverse().join('-');
    }
    return '';
  };

  const handleRowClick = (row) => {
    const selectedIndex = selected.indexOf(row.nome);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.nome);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleBotaoEditar = () => {
    navigate('/editar-pautista')
  }

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
          }}>
            
          <Button variant="outlined" endIcon={<EditIcon />} onClick={handleBotaoEditar}>
            Editar
          </Button>

          <Button variant="outlined" startIcon={<DeleteIcon />} sx={{ borderColor: '#D32F2F', color: '#D32F2F' }}>
            Deletar
          </Button>
          
          <Button variant="outlined" endIcon={<AdfScannerIcon />} sx={{ borderColor: '#757575', color: '#757575' }}>
            Imprimir
          </Button>
        </Box>
      </div>

      <TabelaCadastroPautista
        data={data}
        enableRowSelection={true}
        selected={selected}
        onRowClick={handleRowClick}
      />
    </>
  );
};
