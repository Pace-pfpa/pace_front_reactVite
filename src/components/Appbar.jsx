import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logodopace from '../assets/logodopace.png';
import logo from '../assets/pace.png';

export const Appbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#517085' }}>
      <Toolbar>
        <img src={logodopace} alt="Logo do Pace" style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
        <img src={logo} alt="Logo do Pace" style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
        <Typography variant="h6" noWrap component="div">
         Header - Programa de Agendamento e Controle de Escalas
        </Typography>
      </Toolbar>
    </AppBar>
  );
};