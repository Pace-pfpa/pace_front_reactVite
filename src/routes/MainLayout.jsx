import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';
import { Appbar } from '../components/Appbar';
import { Sidebar } from '../components/Sidebar';
import { Outlet } from 'react-router-dom';

export const MainLayout = () => {
  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <Appbar />
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar sx={{ mb: 2 }} />
        <Outlet />
      </Box>
    </Box>
  );
};