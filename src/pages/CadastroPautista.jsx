import React from 'react'
import { Box, Typography } from '@mui/material';
import { Appbar } from '../components/Appbar'
import { Sidebar } from '../components/Sidebar';
import { useEffect } from 'react';
import { useState } from 'react';

export const CadastroPautista = () => {

  const [openItems, setOpenItems] = useState({
    Cadastro: false,
    Escala: false,
    Mutirão: false,
    Consulta: false
  });
  const [activeItem, setActiveItem] = useState('Home');

  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const mutiraoCount = await getMutiraoCount();
        const pautistaCount = await getPautistaCount();
        setMutiraoCount(mutiraoCount);
        setPautistaCount(pautistaCount)

      } catch (err) {
        console.error('Erro ao renderizar dados:', err);
      }
    };

    fetchCounts();
  }, []);

  const exibirSubItens = (item) => {
  setOpenItems((prevOpenItems) => ({
    ...prevOpenItems,
    [item]: !prevOpenItems[item],
  }));
};




  return (
    <Box sx={{ display: 'flex' }}>
      <Appbar /> 
      <Sidebar  openItems={openItems} exibirSubItens={exibirSubItens} activeItem={activeItem} setActiveItem={setActiveItem} /> 
      <Typography variant="h6" noWrap component="div">
        Página de Cadastro de Pautista
      </Typography>
    </Box>
  );
}