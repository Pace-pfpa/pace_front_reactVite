import React, { useState, useEffect } from 'react';
import style from '../Style/HomeStyle.module.css'
import { Box, List, ListItem, ListItemButton, ListItemIcon, Collapse, Divider, Toolbar, ListItemText, Typography, Grid, Button, CssBaseline, AppBar, Drawer } from '@mui/material';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import logo from '../assets/pace.png';
import logodopace from '../assets/logodopace.png';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { TabelaPautistaContainer } from '../services/TabelaPautistaContainer';
import { CustomCard } from '../components/CustomCard';
import { getMutiraoCount, getPautistaCount } from '../services/CustomCard';
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import TableIcon from '@mui/icons-material/BackupTable';
import GroupIcon from '@mui/icons-material/Group';
import SearchIcon from '@mui/icons-material/Search';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'

const iconMapping = {
  Home: <HomeIcon />,
  Cadastro: <AddIcon />,
  Escala: <TableIcon />,
  Mutirão: <GroupIcon />,
  Consulta: <SearchIcon />
}

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
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#517085' }}>
        <Toolbar>
          <img src={logodopace} alt="Logo do Pace" style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
          <img src={logo} alt="Logo do Pace" style={{ width: '50px', height: 'auto', marginRight: '10px' }} />
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
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <Box sx={{ overflow: 'auto' }}>
          <List>
            {['Home'].map((text) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {iconMapping[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Divider />
          <List>
            {['Cadastro', 'Escala', 'Mutirão', 'Consulta'].map((text) => (
              <React.Fragment key={text}>
                <ListItem disablePadding>
                  <ListItemButton sx={{ 
                    pl: 2, 
                    bgcolor: activeItem === text ? '#e0e0e0' : 'inherit',
                    '&:hover': {
                      bgcolor: activeItem !== text ? '#f0f0f0' : 'inherit',
                    },
                  }}
                  selected={activeItem === text}
                  onClick={() => exibirSubItens(text)}>
                    <ListItemIcon>
                      {iconMapping[text]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {openItems[text] ? <ExpandLessIcon /> : <ExpandMoreIcon />}
                  </ListItemButton>
                </ListItem>
                {text === 'Cadastro' && (
                  <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Pautista" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Advogado" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Pauta" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
                {text === 'Escala' && (
                  <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Gerar"/>
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
                {text === 'Mutirão' && (
                  <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4}}>
                        <ListItemText primary="Excluir" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
                {text === 'Consulta' && (
                  <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Pautista"/>
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Advogado"/>
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }}>
                        <ListItemText primary="Escala"/>
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
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
  

