import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { TabelaCadastroPautista } from '../components/TabelaCadastroPautista';
import { cadastrarPautista, fetchPautistaData } from '../services/CadastroPautista';

const grupoOptions = [
  { value: 'preposto', label: 'Preposto' },
  { value: 'procurador', label: 'Procurador' },
];

const statusOptions = [
  { value: 'ATIVO', label: 'Ativo' },
  { value: 'INATIVO', label: 'Inativo' },
];

export const CadastroPautista = () => {
  const [data, setData] = useState([]);
  const [formValues, setFormValues] = useState({
    nome: '',
    grupo: 'preposto',
    status: 'ATIVO',
    dataInicial: '',
    dataFinal: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const pautistas = await fetchPautistaData();
        console.log("response da fetchPautista:", pautistas)
        setData(pautistas || []);
      } catch (error) {
        console.error('Erro ao buscar os dados:', error);
        setData([]);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formValues.nome || !formValues.grupo || !formValues.dataInicial || !formValues.dataFinal) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      await cadastrarPautista(formValues);
      alert('Pautista cadastrado com sucesso!');
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
      status: 'ATIVO',
      dataInicial: '',
      dataFinal: '',
    });
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Cadastrar Pautista
      </Typography>

      <Box sx={{ maxWidth: '600px' }}>
        <form onSubmit={handleSubmit}>
          <div>
            <TextField
              id="nome-pautista"
              name="nome"
              label="Nome"
              variant="outlined"
              sx={{ width: '100%', mb: 2 }}
              value={formValues.nome}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
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
              id="status"
              name="status"
              select
              label="Status"
              value={formValues.status}
              sx={{ width: '100%', mb: 2 }}
              onChange={handleInputChange}
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
              id="data-inicial"
              name="dataInicial"
              label="Data Inicial"
              type="date"
              variant="outlined"
              sx={{ width: '49.5%', mb: 2 }}
              value={formValues.dataInicial}
              onChange={handleInputChange}
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
              onChange={handleInputChange}
              InputLabelProps={{
                shrink: true,
              }}
              required
            />
          </div>

          <div sx={{ marginLeft: '8px' }}>
            <Button type="button" variant="outlined" onClick={limparCampos} className='clearButton'>
              Limpar
            </Button>
            <Button type="submit" variant="contained" endIcon={<SendIcon />} className='sendButton' sx={{ ml: 1 }}>
              Cadastrar
            </Button>
          </div>
        </form>
      </Box>

      {data.length > 0 && <TabelaCadastroPautista data={data} />}
    </>
  );
};
