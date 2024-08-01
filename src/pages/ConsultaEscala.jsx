import React, { useState } from "react";
import SearchIcon from '@mui/icons-material/Send';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { TabelaDeAudiencias } from "../components/TabelaDeAudiencias"; 

const turnoOptions = [
  { value: 'MANHA', label: 'Manhã' },
  { value: 'TARDE', label: 'Tarde' },
];

const varaOptions = [
  { value: 'JEF Altamira', label: 'JEF Altamira'},
  { value: 'JEF Castanhal', label: 'JEF Castanhal'},
  { value: 'JEF Itaituba', label: 'JEF Itaituba'},
  { value: 'JEF Paragominas', label: 'JEF Paragominas'},
  { value: 'JEF Redenção', label: 'JEF Redenção'},
  { value: 'JEF Tucuruí', label: 'JEF Tucuruí'},
  { value: 'JEF Belém 8ª TIT', label: 'JEF Belém 8ª TIT'},
  { value: 'JEF Belém 8ª SUB', label: 'JEF Belém 8ª SUB'},
  { value: 'JEF Belém 10ª TIT', label: 'JEF Belém 10ª TIT'},
  { value: 'JEF Belém 10ª SUB', label: 'JEF Belém 10ª SUB'},
  { value: 'JEF Belém 11ª TIT', label: 'JEF Belém 11ª TIT'},
  { value: 'JEF Belém 11ª SUB', label: 'JEF Belém 11ª SUB'},
  { value: 'JEF Belém 12ª TIT', label: 'JEF Belém 12ª TIT'},
  { value: 'JEF Belém 12ª SUB', label: 'JEF Belém 12ª SUB'},
  { value: 'JEF Marabá 1ª', label: 'JEF Marabá 1ª'},
  { value: 'JEF Marabá 2ª', label: 'JEF Marabá 2ª'},
  { value: 'JEF Santarém 1ª', label: 'JEF Santarém 1ª'},
  { value: 'JEF Santarém 2ª', label: 'JEF Santarém 2ª'},
  { value: 'CEJUC Belém', label: 'CEJUC Belém'},

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
]

const statusOptions = [
  { value:'Não Cadastrada', label:'Não cadastrada'},
  { value:'Cadastrada' , label: 'Cadastrada'},
  { value:'Todos' , label: 'Todos'}
]

export const ConsultaEscala = () => {
  const [formValues, setFormValues] = useState({
    dataInicial: '',
    dataFinal: '',
    turno: '',
    vara: '',
    sala: '',
    statusTarefa: '',
  });

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL + 'pautista/');
      console.log('response:', response)
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

  const [data, setData] = useState([]);

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

  const handleSubmit = (event) => {
    event.preventDefault();
    
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Consultar Escala
      </Typography>

      <Box sx={{ maxWidth: '60%', padding: 2 }}>
        <form onSubmit={handleSubmit}>
          <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
            <TextField
              id="data-inicial"
              name="dataInicial"
              label="Data Inicial"
              type="date"
              InputLabelProps={{ shrink: true }}
              sx={{ flex: 1 }}
              value={formValues.dataInicial}
              onChange={(e) => setFormValues({ ...formValues, dataInicial: e.target.value })}
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
              onChange={(e) => setFormValues({ ...formValues, dataFinal: e.target.value })}
              required
            />
          </div>

          <TextField
            id="turno"
            name="turno"
            select
            label="Turno"
            value={formValues.turno}
            onChange={(e) => setFormValues({ ...formValues, turno: e.target.value })}
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
            onChange={(e) => setFormValues({ ...formValues, vara: e.target.value })}
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
            onChange={(e) => setFormValues({ ...formValues, sala: e.target.value })}
          />

          <TextField
            id="statusTarefa"
            name="statusTarefa"
            select
            label="Status Tarefa Sapiens"
            value={formValues.statusTarefa}
            onChange={(e) => setFormValues({ ...formValues, statusTarefa: e.target.value })}
            sx={{ width: '100%', mb: 2 }}
            required
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

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
              endIcon={<SearchIcon />} 
              className='sendButton' sx={{ ml: 1 }}>
              Pesquisar
            </Button>
          </Box>
        </form>
      </Box>

      <Box sx={{ marginTop: 3 }}>
        <TabelaDeAudiencias
          data={data}
          enableRowSelection={true}
          // Passar outros props se necessário
        />
      </Box>
    </>
  );
}
