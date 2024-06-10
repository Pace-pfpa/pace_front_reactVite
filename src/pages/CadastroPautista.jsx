import React from 'react'
import { Box, Typography } from '@mui/material';
import { Appbar } from '../components/Appbar'
import { Sidebar } from '../components/Sidebar';

export const CadastroPautista = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <Appbar /> 
      <Sidebar /> 
      <Typography variant="h6" noWrap component="div">
        Página de Cadastro de Pautista
      </Typography>
    </Box>
  );
}