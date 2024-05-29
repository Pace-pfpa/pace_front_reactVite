import * as React from 'react';
import { useState } from 'react';
import { Box, Typography, Grid, Card, CardContent, CardHeader } from '@mui/material';
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


const drawerWidth = 240;

const CustomCard = ({ title, value, color }) => {
  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ height: '100%', borderLeft: `5px solid pink`, borderRadius: 'none' }} elevation={3}>
        <CardHeader
          title={<Typography variant="h6" sx={{ color: color }}>{title}</Typography>}
        />
        <CardContent>
          <Typography variant="h5" sx={{ color: color }}>{value}</Typography>
        </CardContent>
      </Card>
    </Grid>
  )
}

const download = () => {
  const link = document.createElement('a');
  link.href = '';
  link.download = 'RelatorioPace.pdf';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

const TabelaPautista = () => {
  const [procuradores, setProcuradores] = useState([]);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(baseURL + 'pauta/total');
        const data = await response.json();
        setProcuradores(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);


export const Home = () => {
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
        <Toolbar />



        <Typography paragraph>
          <Button variant="contained" onClick={download} startIcon={<CloudDownloadIcon />}> Download Relatório </Button>
          <br/>
          Relatório
          
          <Grid container spacing={3}>
            <CustomCard title="Varas" value="35" color="primary" />
            <CustomCard title="Mutirões" value="0" color="success" />
            <CustomCard title="Pautista" value="0" color="info" />
          </Grid>

            <div>
              <Table bordered>
                <thead className="table-success">
                  <tr>
                    <th style={{ paddingRight: '20px' }}>PAUTISTAS</th>
                    <th>QUANTIDADE DE AUDIÊNCIAS</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>TODOS</td>
                    <td>{procuradores.length > 0 && procuradores[0].saldo}</td>
                  </tr>
                  {procuradores.map((procurador, index) => (
                    <tr key={index}>
                      <td>{procurador.nome}</td>
                      <td>{procurador.saldo}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>

        </Typography>

        
      </Box>
    </Box>
  );
}

