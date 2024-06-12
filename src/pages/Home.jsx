import React, { useState, useEffect } from 'react';
import { Box, Typography, Grid, Button, CssBaseline, Toolbar } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { TabelaPautistaContainer } from '../services/TabelaPautistaContainer';
import { CustomCard } from '../components/CustomCard';
import { getMutiraoCount, getPautistaCount } from '../services/CustomCard';

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

    return (
      <>
        <Typography paragraph variant='h6' component="div" sx={{ fontSize: '1.6rem', mb: 3 }}>
          Relatório
          <Button sx={{ mb: 3, marginLeft: '20px', backgroundColor: '#517085' }} variant="contained" onClick={download} startIcon={<CloudDownloadIcon />}>
          Download Relatório
        </Button>
        </Typography>
        <Grid container spacing={3} sx={{ mb: 3 }}>
          <CustomCard title="Varas" value="35" color="primary" />
          <CustomCard title="Mutirões" value={mutiraoCount} color="success" />
          <CustomCard title="Pautista" value={pautistaCount} color="info" />
        </Grid>
        <TabelaPautistaContainer />
      </>
    );
};
  

