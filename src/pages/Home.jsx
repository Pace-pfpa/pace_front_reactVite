import React, { useState, useEffect } from 'react';
import style from '../Style/HomeStyle.module.css'
import { Box, Typography, Grid, Button, CssBaseline, Toolbar } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { TabelaPautistaContainer } from '../services/TabelaPautistaContainer';
import { CustomCard } from '../components/CustomCard';
import { getMutiraoCount, getPautistaCount } from '../services/CustomCard';
import { Sidebar } from '../components/Sidebar';
import { Appbar } from '../components/Appbar';

const download = () => {
  const link = document.createElement('a');
  link.href = '';
  link.download = 'RelatorioPace.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

  export const Home = () => {
    const [mutiraoCount, setMutiraoCount] = useState(0)
    const [pautistaCount, setPautistaCount] = useState(0)
    const [openItems, setOpenItems] = useState({
      Cadastro: false,
      Escala: false,
      Mutirão: false,
      Consulta: false
    });
    const [activeItem, setActiveItem] = useState('Home')

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
      <CssBaseline />
      <Appbar />
      <Sidebar openItems={openItems} exibirSubItens={exibirSubItens} activeItem={activeItem} setActiveItem={setActiveItem} />
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar sx={{ mb: 2 }} />
        <Typography paragraph variant='h6' component="div" sx={{ fontSize: '1.6rem', mb: 3 }}>
          Relatório
          <Button sx={{ mb: 3, marginLeft: '20px' }} variant="contained" onClick={download} startIcon={<CloudDownloadIcon />}>Download Relatório</Button>
          <Grid container spacing={3} sx={{ mb: 3 }}>
            <CustomCard title="Varas" value="35" color="primary" />
            <CustomCard title="Mutirões" value={mutiraoCount} color="success" />
            <CustomCard title="Pautista" value={pautistaCount} color="info" />
          </Grid>
          <TabelaPautistaContainer />
        </Typography>
      </Box>
    </Box>
  );
};
  

