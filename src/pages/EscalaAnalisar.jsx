import React, { useState, ChangeEvent } from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Send';
import axios from 'axios';
import TabelaEscalaAvaliar from '../components/TabelaEscalaAvaliar';

const turnoOptions = [
  { value: 'TODOS', label: 'Todos' },
  { value: 'MANHA', label: 'Manhã' },
  { value: 'TARDE', label: 'Tarde' },
];

const statusOptions = [
  { value: 'Não Cadastrada', label: 'Não cadastrada' },
  { value: 'Cadastrada', label: 'Cadastrada' },
  { value: 'Todos', label: 'Todos' }
];

const ipdev = import.meta.env.VITE_API_URL_DEV;

export const EscalaAnalisar = () => {
  const [formValues, setFormValues] = useState({
    dataInicial: '',
    dataFinal: '',
    turno: '',
    vara: '',
    sala: '',
    statusTarefa: '',
  });

  const [data, setData] = useState([]);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${ipdev}/audiencias-filter`, {
        params: formValues,
      });
      console.log('resposa da apiii:', response); 
      if (response.data && Array.isArray(response.data)) {
        setData(response.data);
      } else {
        console.error('API response is not an array:', response.data);
        setData([]);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const limparCampos = () => {
    setFormValues({
      dataInicial: '',
      dataFinal: '',
      turno: '',
      vara: '',
      sala: '',
      statusTarefa: '',
    });
    setData([]);
  };

  return (
    <>
      <Box sx={{ maxWidth: '60%', padding: 2 }}>
        <form>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <TextField
              id="data-inicial"
              name="dataInicial"
              label="Data Inicial"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1 }}
              value={formValues.dataInicial}
              onChange={handleChange}
              required
            />

            <TextField
              id="data-final"
              name="dataFinal"
              label="Data Final"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1 }}
              value={formValues.dataFinal}
              onChange={handleChange}
              required
            />
          </div>

          <TextField
            id="turno"
            name="turno"
            select
            label="Turno"
            value={formValues.turno}
            onChange={handleChange}
            sx={{ width: '100%', mb: 2 }}
            
          >
            {turnoOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="vara"
            name="vara"
            select
            label="Vara"
            value={formValues.vara}
            onChange={handleChange}
            sx={{ width: '100%', mb: 2 }}
            
          >
          </TextField>

          <TextField
            id="sala"
            name="sala"
            label="Sala"
            variant="outlined"
            sx={{ width: '100%', mb: 2 }}
            value={formValues.sala}
            onChange={handleChange}
          />

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button type="button" variant="outlined" onClick={limparCampos} className="clearButton">
              Limpar
            </Button>

            <Button type="button" variant="contained" endIcon={<SearchIcon />} onClick={handleSearch} className="sendButton" sx={{ ml: 1 }}>
              Pesquisar
            </Button>
          </Box>
        </form>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        <TabelaEscalaAvaliar data={data} />
      </Box>
    </>
  );
};
