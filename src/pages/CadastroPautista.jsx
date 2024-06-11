import React from 'react';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import '../Style/CadastroPautistaStyle.module.css'

const currencies = [
  {
    value: 'preposto',
    label: 'Preposto',
  },
  {
    value: 'procurador',
    label: 'Procurador',
  },
];

export const CadastroPautista = () => {
  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Cadastrar Pautista
      </Typography>
      <Box sx={{ maxWidth: '600px' }}>
        <form>
          <div>
            <TextField 
            id="outlined-basic" 
            label="Nome" 
            variant="outlined" 
            sx={{ width: '100%', mb: 2 }}/>
          </div>
          <div>
          <TextField 
          id="outlined-select-currency" 
          select 
          label="Grupo" 
          defaultValue="preposto" 
          helperText="por favor, selecione o grupo" 
          sx={{ width: '100%', mb: 2 }}>
          {currencies.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
          </div>

          <Button variant="outlined" className='clearButton'>
            Limpar
          </Button>
          <Button variant="contained" endIcon={<SendIcon />} className='sendButton' sx={{ ml: 1 }}>
            Enviar
          </Button>
          
        </form>
      </Box>
    </>
  );
};
