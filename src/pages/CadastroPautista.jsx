import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { TabelaCadastroPautista } from '../components/TabelaCadastroPautista';
import { cadastrarPautista, fetchPautistaData } from '../services/CadastroPautista';
import SearchBar from '../components/SearchBar';

const grupoOptions = [
  { value: 'PREPOSTO', label: 'Preposto' },
  { value: 'PROCURADOR', label: 'Procurador' },
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
    status: 'ATIVO',
    dataInicial: '',
    dataFinal: '',
    grupo: 'PREPOSTO',
  });

  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pautistas = await fetchPautistaData();
        console.log("response da fetchPautista:", pautistas)
        setData(pautistas || []);
      } catch (error) {
        console.error('Erro ao buscar os dados da fetchPautista:', error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.nome.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.grupoPautista.toLowerCase().includes(formValues.grupo.toLowerCase()) &&
      item.statusPautista.toLowerCase().includes(formValues.status.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchTerm, formValues, data]);

  const handleSubmit = async (e) => {
    const payload = {
      ...formValues,
      peso: 0
    }

    try {
      await cadastrarPautista(payload);
      alert('Pautista cadastrado com sucesso!');
      setData([...data, payload]);
      limparCampos();
    } catch (error) {
      console.error('Erro ao cadastrar pautista:', error);
      alert('Erro ao cadastrar pautista. Verifique os dados e tente novamente.');
    }
  };

  const limparCampos = () => {
    setFormValues({
      nome: '',
      grupo: 'preposto',
      turno: 'MANHÃ',
      dataInicial: '',
      dataFinal: '',
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
            <TextField
              id="varasComImpeditivo"
              name="varasComImpeditivo"
              select
              label="Varas Com Impeditivo"
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

          {/* <div>
            <TextField
              id="data-inicial"
              name="dataInicial"
              label="Data Inicial"
              type="date"
              variant="outlined"
              sx={{ width: '49.5%', mb: 2 }}
              value={formValues.dataInicial}
              onChange={(e) => setFormValues({ ...formValues, dataInicial: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />

            <TextField
              id="data-final"
              name="dataFinal"
              label="Data Final"
              type="date"
              variant="outlined"
              sx={{ width: '49%', mb: 2, marginLeft: '8px' }}
              value={formValues.dataFinal}
              onChange={(e) => setFormValues({ ...formValues, dataFinal: e.target.value })}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </div> */}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button 
              type="button" 
              variant="outlined" 
              onClick={limparCampos} 
              className='clearButton'>
              Limpar
            </Button>
            <Button 
              type="submit" 
              variant="contained" 
              endIcon={<SendIcon />} 
              className='sendButton' sx={{ ml: 1  }}>
              Cadastrar
            </Button>
          </Box>
        </form>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
        <SearchBar onSearch={setSearchTerm} />
      </Box>

      {filteredData.length > 0 ? <TabelaCadastroPautista data={filteredData} /> : <Typography variant="body1">Nenhum resultado encontrado.</Typography>}
    </>
  );
};

