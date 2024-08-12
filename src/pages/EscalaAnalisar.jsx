import React, { useState, useEffect } from 'react';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TabelaEscalaAvaliar from '../components/TabelaEscalaAvaliar';

export const EscalaAnalisar = () => {
  const [formValues, setFormValues] = useState({
    dataInicial: '',
    dataFinal: '',
    turno: '',
    vara: '',
    sala: ''
  });

  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3000/audiencias-filter';
        const response = await fetch(url, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar dados');
        }

        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value
    }));
  };

  const limparCampos = () => {
    setFormValues({
      dataInicial: '',
      dataFinal: '',
      turno: '',
      vara: '',
      sala: ''
    });
  };

  const handleSearch = async () => {
    try {
      const url = 'http://localhost:3000/audiencias-filter';
      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar dados');
      }

      const result = await response.json();
      setData(result);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const turnoOptions = [
    { value: '', label: 'Todos' },
    { value: 'MANHÃ', label: 'Manhã' },
    { value: 'TARDE', label: 'Tarde' }
  ];

  const varaOptions = [
    { value: '', label: 'Todas' },
    { value: 'Juizado Especial Cível e Criminal', label: 'Juizado Especial Cível e Criminal' },
    { value: 'Vara2', label: 'Vara 2' }
  ];

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
            required
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
            required
          >
            {varaOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
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
