import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, Collapse, Divider, Toolbar, ListItemText, Drawer } from '@mui/material';
import { ExpandLess, ExpandMore, Home as HomeIcon, Add as AddIcon, BackupTable as TableIcon, Group as GroupIcon, Search as SearchIcon } from '@mui/icons-material';

const iconMapping = {
  Home: <HomeIcon />,
  Cadastrar: <AddIcon />,
  Escala: <TableIcon />,
  Mutirão: <GroupIcon />,
  Consultar: <SearchIcon />
};

const drawerWidth = 240;

export const Sidebar = () => {
    const navigate = useNavigate();

    const [openItems, setOpenItems] = useState({
      Cadastrar: false,
      Escala: false,
      Mutirão: false,
      Consultar: false
    });

    const [activeSidebarItem, setActiveSidebarItem] = useState('Home');

    const toggleSubItems = (item) => {
      setOpenItems((prevOpenItems) => ({
        ...prevOpenItems,
        [item]: !prevOpenItems[item]
      }));
    };

    const handleNavigation = (path) => {
        // console.log(path);
        setActiveSidebarItem(path);
        navigate(path);
    };

    return (
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
                <ListItemButton onClick={() => handleNavigation(`/`)}>
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
            {['Cadastrar', 'Consultar', 'Escala', 'Mutirão'].map((text) => (
              <React.Fragment key={text}>
                <ListItem disablePadding>
                  <ListItemButton
                    sx={{
                      pl: 2,
                      bgcolor: activeSidebarItem === text ? '#f0f0f0' : 'inherit',
                      '&:hover': {
                        bgcolor: activeSidebarItem !== text ? '#f0f0f0' : 'inherit',
                      },
                    }}
                    selected={activeSidebarItem === text}
                    onClick={() => toggleSubItems(text)}
                  >
                    <ListItemIcon>
                      {iconMapping[text]}
                    </ListItemIcon>
                    <ListItemText primary={text} />
                    {openItems[text] ? <ExpandLess /> : <ExpandMore />}
                  </ListItemButton>
                </ListItem>
                {text === 'Cadastrar' && (
                  <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/cadastro-pautista')}>
                        <ListItemText primary="Pautista" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/cadastro-advogado')}>
                        <ListItemText primary="Advogado" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/cadastro-pauta')}>
                        <ListItemText primary="Pauta"/>
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
                {text === 'Escala' && (
                  <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/escala-gerar')}>
                        <ListItemText primary="Gerar" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
                {text === 'Mutirão' && (
                  <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/mutirao-excluir')}>
                        <ListItemText primary="Excluir" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
                {text === 'Consultar' && (
                  <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/consulta-pautista')}>
                        <ListItemText primary="Pautista" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/consulta-advogado')}>
                        <ListItemText primary="Advogado" />
                      </ListItemButton>
                      <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/consulta-escala')}>
                        <ListItemText primary="Escala" />
                      </ListItemButton>
                    </List>
                  </Collapse>
                )}
              </React.Fragment>
            ))}
          </List>
        </Box>
      </Drawer>
    );
};
