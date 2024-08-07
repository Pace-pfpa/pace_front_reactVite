import React from 'react';
import logo from '../assets/logodopace.png'
import logoPace from '../assets/pace.png'
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

export const Appbar = () => {
  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#517085' }}>
      <Toolbar>
        <img src={logo} alt="Logo do Pace" style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
        <img src={logoPace} alt="Logo" style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          - Programa de Agendamento e Controle de Escalas
        </Typography>
        {/* <Button color="inherit">Login</Button> */}
      </Toolbar>
    </AppBar>
  );
};


