import React from 'react';
import { Box, Typography, CssBaseline, Toolbar } from '@mui/material';
import { Appbar } from '../components/Appbar';
import { Sidebar } from '../components/Sidebar';

export const CadastroPautista = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Appbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar sx={{ mb: 2 }} />
        <Typography variant="h4" component="div" sx={{ mb: 3 }}>
          Cadastro de Pautista
        </Typography>
        oooi
        <Box sx={{ maxWidth: '600px' }}>
          <form>
            <div>
              <label htmlFor="nome">Nome:</label>
              <input type="text" id="nome" name="nome" required />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" name="email" required />
            </div>
            <div>
              <label htmlFor="telefone">Telefone:</label>
              <input type="tel" id="telefone" name="telefone" required />
            </div>
            <div>
              <label htmlFor="endereco">Endereço:</label>
              <input type="text" id="endereco" name="endereco" required />
            </div>
            <button type="submit">Cadastrar</button>
          </form>
        </Box>
      </Box>
    </Box>
  );
};
