import * as React from 'react';
import style from '../Style/HomeStyle.module.css'
import { useState, useEffect } from 'react';
import { Box, Typography, Grid } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import AppBar from '@mui/material/AppBar';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import logo from '../assets/pace.png';
import logodopace from '../assets/logodopace.png';
import Button from '@mui/material/Button';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { TabelaPautistaContainer } from '../services/TabelaPautistaContainer';
import { CustomCard } from '../components/CustomCard';
import { getMutiraoCount } from '../services/CustomCard';
import { getPautistaCount } from '../services/CustomCard';


const drawerWidth = 240;

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
      <Box sx={{ display: 'flex' }}>
        <CssBaseline />
        <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#517085' }}>
          <Toolbar>
            <img src={logodopace} alt="Logo do Pace" style={{ width: '50px', height: 'auto', marginRight: '10px' }}></img>
            <img src={logo} alt="Logo do Pace" style={{ width: '50px', height: 'auto', marginRight: '10px' }}></img>
            <Typography variant="h6" noWrap component="div">
              - Programa de Agendamento e Controle de Escalas
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', backgroundColor: '#'},
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {['Home'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
            <Divider />
            <List>
              {['Cadastro', 'Escala', 'Multirão','Consulta'].map((text, index) => (
                <ListItem key={text} disablePadding>
                  <ListItemButton>
                    <ListItemIcon>
                      {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <Toolbar sx={{ mb: 2 }}/>
  
          <Typography paragraph variant='h6' component="div" sx={{ fontSize: '1.6rem', mb: 3 }}>
            Relatório
            <Button sx={{ mb: 3, marginLeft: '20px' }} variant="contained" onClick={download} startIcon={<CloudDownloadIcon />}> Download Relatório </Button>
            
            <Grid container spacing={3} sx={{ mb: 3 }}>
              <CustomCard title="Varas" value="35" color="primary" />
              <CustomCard title="Mutirões" value={mutiraoCount} color="success" />
              <CustomCard title="Pautista" value={pautistaCount} color="info" />
            </Grid>
              <br/>
            <TabelaPautistaContainer />
            
          </Typography>
          
        </Box>
      </Box>
    );
  }
  

