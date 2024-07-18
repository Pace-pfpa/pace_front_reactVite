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

const varasImpeditivos = [
  { value: 'JEF Altamira', label: 'JEF Altamira' },
  { value: 'JEF Castanhal', label: 'JEF Castanhal' },
  { value: 'JEF Itaituba', label: 'JEF Itaituba' },
  { value: 'JEF Paragominas', label: 'JEF Paragominas' },
  { value: 'JEF Redenção', label: 'JEF Redenção' },
  { value: 'JEF Tucuruí', label: 'JEF Tucuruí' },
  { value: 'JEF Belém 8ª TIT', label: 'JEF Belém 8ª TIT' },
  { value: 'JEF Belém 8ª SUB', label: 'JEF Belém 8ª SUB' },
  { value: 'JEF Belém 10ª TIT', label: 'JEF Belém 10ª TIT' },
  { value: 'JEF Belém 10ª SUB', label: 'JEF Belém 10ª SUB' },
  { value: 'JEF Belém 11ª TIT', label: 'JEF Belém 11ª TIT' },
  { value: 'JEF Belém 11ª SUB', label: 'JEF Belém 11ª SUB' },
  { value: 'JEF Belém 12ª TIT', label: 'JEF Belém 12ª TIT' },
  { value: 'JEF Belém 12ª SUB', label: 'JEF Belém 12ª SUB' },
  { value: 'JEF Marabá 1ª', label: 'JEF Marabá 1ª' },
  { value: 'JEF Marabá 2ª', label: 'JEF Marabá 2ª' },
  { value: 'JEF Santarém 1ª', label: 'JEF Santarém 1ª' },
  { value: 'JEF Santarém 2ª', label: 'JEF Santarém 2ª' },
  { value: 'CEJUC Belém', label: 'CEJUC Belém' },
  { value: '1ª Vara Federal Belém', label: '1ª Vara Federal Belém' },
  { value: '2ª Vara Federal Belém', label: '2ª Vara Federal Belém' },
  { value: '5ª Vara Federal Belém', label: '5ª Vara Federal Belém' },
  { value: '1ª Vara Federal Marabá', label: '1ª Vara Federal Marabá' },
  { value: '2ª Vara Federal Marabá', label: '2ª Vara Federal Marabá' },
  { value: '1ª Vara Federal Santarém', label: '1ª Vara Federal Santarém' },
  { value: '2ª Vara Federal Santarém', label: '2ª Vara Federal Santarém' },
  { value: 'Vara Federal Altamira', label: 'Vara Federal Altamira' },
  { value: 'Vara Federal Castanhal', label: 'Vara Federal Castanhal' },
  { value: 'Vara Federal Itaituba', label: 'Vara Federal Itaituba' },
  { value: 'Vara Federal Paragominas', label: 'Vara Federal Paragominas' },
  { value: 'Vara Federal Redenção', label: 'Vara Federal Redenção' },
  { value: 'Vara Federal Tucuruí', label: 'Vara Federal Tucuruí' },
  { value: '4ª Vara cível de Belém', label: '4ª Vara cível de Belém' },
  { value: '3ª Vara cível de Parauapebas', label: '3ª Vara cível de Parauapebas' }
];

const statusOptions = [
  { value: 'MANHA', label: 'Manhã' },
  { value: 'TARDE', label: 'Tarde' },
];

export const CadastroPautista = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formValues, setFormValues] = useState({
    nome: '',
    grupo: 'PREPOSTO',
    status: '',
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
      status: 'MANHA',
      varasImpeditivos: ''
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
              value={formValues.status}
              sx={{ width: '100%', mb: 2 }}
              onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
              required
            >
              {statusOptions.map((option) => (
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
        <TabelaCadastroPautista data={filteredData} />
      ) : (
        <Typography variant="body1">Nenhum resultado encontrado.</Typography>
      )}
    </>
  );
};
