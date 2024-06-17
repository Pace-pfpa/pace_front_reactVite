import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { cadastrarAdvogado } from '../services/CadastroAdvogado';
import { TabelaCadastroAdvogado } from "../components/TabelaCadastroAdvogado";
import SendIcon from '@mui/icons-material/Send';
import SearchBar from '../components/SearchBar';

export const CadastroAdvogado =  () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [formValues, setFormValues] = useState({
    nomeAdvogado: '',
    numeroOAB: ''
  });
  
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const advogados = await cadastrarAdvogado();
        console.log("Response da fetchAdvogado", advogados)
        setData(advogados || []);
      } catch (error) {
        console.error('Erro ao buscar os dados da fetchAdvogado:', error);
        setData([]);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    const filteredResults = data.filter((item) =>
      item.nomeAdvogado.toLowerCase().includes(searchTerm.toLowerCase()) &&
      item.numeroOAB.toLowerCase().includes(formValues.numeroOAB.toLowerCase())
    );
    setFilteredData(filteredResults);
  }, [searchTerm, formValues, data]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const novoAdvogado = await cadastrarAdvogado(formValues);
      alert('Advogado cadastrado com sucesso!');
      setData([...data, novoAdvogado]);
      limparCampos();
    } catch (error) {
      console.error('Erro ao cadastrar advogado:', error);
      alert('Erro ao cadastrar advogado. Verifique os dados e tente novamente.');
    }
  };

  const limparCampos = () => {
    setFormValues({
      nomeAdvogado: '',
      numeroOAB: ''
    });
  };

    return (
        <>
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            Cadastrar Advogado
          </Typography>

          <Box sx={{ maxWidth: '600px' }}>
            <form onSubmit={handleSubmit}>
              <div>
                <TextField
                  id="nome-advogado"
                  name="nomeAdvogado"
                  label="Nome Advogado"
                  variant="outlined"
                  sx={{ width: '100%', mb: 2 }}
                  value={formValues.nomeAdvogado}
                  onChange={(e) => setFormValues({ ...formValues, nomeAdvogado: e.target.value })}
                  required
                />
              </div>

              <div>
                <TextField
                  id="numeroOAB"
                  name="numero"
                  label="Número OAB"
                  variant="outlined"
                  sx={{ width: '100%', mb: 2 }}
                  value={formValues.numeroOAB}
                  onChange={(e) => setFormValues({ ...formValues, numeroOAB: e.target.value })}
                  required
                />
              </div>

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

          {filteredData.length > 0 ? <TabelaCadastroAdvogado data={filteredData} /> : <Typography variant="body1">Nenhum resultado encontrado.</Typography>}
          
        </>
    );
}