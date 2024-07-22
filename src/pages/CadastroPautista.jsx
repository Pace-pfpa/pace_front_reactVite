import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import Autocomplete from '@mui/material/Autocomplete';
import { TabelaCadastroPautista } from '../components/TabelaCadastroPautista';
import { cadastrarPautista, fetchPautistaData } from '../services/CadastroPautista';
import SearchBar from '../components/SearchBar';

const grupoOptions = [
  { value: 'PREPOSTO', label: 'Preposto' },
  { value: 'PROCURADOR', label: 'Procurador' },
];

const varasImpeditivos = [];

const turnoOptions = [
  { value: 'MANHA', label: 'Manhã' },
  { value: 'TARDE', label: 'Tarde' },
];

export const CadastroPautista = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formValues, setFormValues] = useState({
    nome: '',
    grupo: 'PREPOSTO',
    turno: 'MANHA',
    varasImpeditivos: []
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pautistas = await fetchPautistaData();
        console.log("response da fetchPautista:", pautistas);
        setData(pautistas || []);
        setFilteredData(pautistas || []);
      } catch (error) {
        console.error('Erro ao buscar os dados da fetchPautista:', error);
        setData([]);
        setFilteredData([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchTerm, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formValues,
      varasImpeditivos: formValues.varasImpeditivos.map((vara) => vara.value),
      peso: 0,
    };

    try {
      await cadastrarPautista(payload);
      alert('Pautista cadastrado com sucesso!');
      setData([...data, payload]);
      setFilteredData([...filteredData, payload]);
      limparCampos();
    } catch (error) {
      console.error('Erro ao cadastrar pautista:', error);
      alert('Erro ao cadastrar pautista. Verifique os dados e tente novamente.');
    }
  };

  const limparCampos = () => {
    setFormValues({
      nome: '',
      grupo: 'PREPOSTO',
      turno: 'MANHA',
      varasImpeditivos: []
    });
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Cadastrar Pautista
      </Typography>

      <Box sx={{ maxWidth: '50%' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="nome-pautista"
              name="nome"
              label="Nome Pautista"
              variant="outlined"
              sx={{ width: '100%', mb: 2 }}
              value={formValues.nome}
              onChange={(e) => setFormValues({ ...formValues, nome: e.target.value })}
              required
            />
          </div>

          <div>
            <TextField
              id="grupo"
              name="grupo"
              select
              label="Grupo"
              value={formValues.grupo}
              sx={{ width: '100%', mb: 2 }}
              onChange={(e) => setFormValues({ ...formValues, grupo: e.target.value })}
              required
            >
              {grupoOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <TextField
              id="turno"
              name="turno"
              select
              label="Turno"
              value={formValues.turno}
              sx={{ width: '100%', mb: 2 }}
              onChange={(e) => setFormValues({ ...formValues, turno: e.target.value })}
              required
            >
              {turnoOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
          </div>

          <div>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={varasImpeditivos}
              getOptionLabel={(option) => option.label}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Varas com Impeditivos"
                  placeholder="Selecione uma ou mais varas"
                  required
                />
              )}
              onChange={(event, newValue) => setFormValues({ ...formValues, varasImpeditivos: newValue })}
            />
          </div>

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
              endIcon={<SendIcon />}
              className="sendButton"
              sx={{ ml: 1 }}
            >
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <SearchBar onSearch={setSearchTerm} />
      </Box>

      {filteredData.length > 0 ? (
        <TabelaCadastroPautista data={filteredData} enableRowSelection={false} /> // Desabilitar seleção
      ) : (
        <Typography variant="body1">Nenhum resultado encontrado.</Typography>
      )}
    </>
  );
};
