import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { VITE_API_URL_DEV } from '../_config';
import { Box, TextField, MenuItem, Button } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TabelaEscalaAvaliar from '../components/TabelaConsultaEscala';
import PopupLoginSapiens from '../components/PopupLoginSapiens';

export const ConsultaEscala = () => {
  const ipdev = VITE_API_URL_DEV;
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);
  const [formValues, setFormValues] = useState({
    dataInicial: '',
    dataFinal: '',
    turno: '',
    vara: '',
    sala: ''
  });
  const [showLoginPopup, setShowLoginPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url = 'http://localhost:3000/newpace/audiencias-filter';
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

  const handleSearchType = () => {
    setShowLoginPopup(true);
  };

  const handleSendProcesses = async (cpf, senha) => {
    try {
      const processos = selected;
      const data = { cpf, senha, processos };

      const response = await axios.post(`${ipdev}/newpace/filtroAudienciasPace`, data);

      console.log('Resposta da requisição de processos:', response.data);
      handleSearch();
    } catch (error) {
      console.error('Erro ao enviar processos:', error);
    }
  };

  const handleSearch = async () => {
    console.log("entrou no handleSubmit")
    try {
      const { dataInicial, dataFinal, turno, vara, sala } = formValues;
      console.log("formValuesssssssss",formValues)
      const queryParams = new URLSearchParams({
        startDate: dataInicial,
        endDate: dataFinal,
        turno,
        orgao_julgador: vara,
        sala
      });

      const url = `http://localhost:3000/newpace/audiencias-filter?${queryParams.toString()}`;

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
            <Button
              type="button"
              variant="outlined"
              onClick={limparCampos}
              className="clearButton"
            >
              Limpar
            </Button>
            <Button
              type="submit"
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={handleSearch}
              className="sendButton"
              sx={{ ml: 1 }}
            >
              Pesquisar
            </Button>
          </Box>


          <Button variant="contained" color="primary" onClick={handleSearchType} sx={{ ml: 2 }}>
            Buscar Processos
          </Button>
        </form>
      </Box>

      
      <TabelaEscalaAvaliar data={data} selected={selected} setSelected={setSelected} />

      <PopupLoginSapiens
        open={showLoginPopup}
        onClose={() => setShowLoginPopup(false)}
        onConfirm={handleSendProcesses}
        selected={selected}
      />
    </>
  );
};

export default ConsultaEscala;
