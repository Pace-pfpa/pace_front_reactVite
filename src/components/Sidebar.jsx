import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, List, ListItem, ListItemButton, ListItemIcon, Collapse, Divider, Toolbar, ListItemText, Drawer } from '@mui/material';
import { ExpandLess, ExpandMore, Home as HomeIcon, Add as AddIcon, BackupTable as TableIcon, Group as GroupIcon, Search as SearchIcon } from '@mui/icons-material';

const iconMapping = {
  Home: <HomeIcon />,
  Cadastro: <AddIcon />,
  Escala: <TableIcon />,
  Mutirão: <GroupIcon />,
  Consulta: <SearchIcon />
};

const drawerWidth = 240;

export const Sidebar = ({ openItems, exibirSubItens, activeItem, setActiveItem }) => {
    const navigate = useNavigate();

    const handleNavigation = (path) => {
        setActiveItem(path)
        navigate(path)
    }

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
              <ListItemButton onClick={() => setActiveItem(text)}>
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
                <ListItemButton
                  sx={{
                    pl: 2,
                    bgcolor: activeItem === text ? '#f0f0f0' : 'inherit',
                    '&:hover': {
                      bgcolor: activeItem !== text ? '#f0f0f0' : 'inherit',
                    },
                  }}
                  selected={activeItem === text}
                  onClick={() => exibirSubItens(text)}
                >
                  <ListItemIcon>
                    {iconMapping[text]}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                  {openItems[text] ? <ExpandLess /> : <ExpandMore />}
                </ListItemButton>
              </ListItem>
              {text === 'Cadastro' && (
                <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }} onClick={() => handleNavigation('/cadastro-pautista')}>
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
                      <ListItemText primary="Gerar" />
                    </ListItemButton>
                  </List>
                </Collapse>
              )}
              {text === 'Mutirão' && (
                <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Excluir" />
                    </ListItemButton>
                  </List>
                </Collapse>
              )}
              {text === 'Consulta' && (
                <Collapse in={openItems[text]} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Pautista" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
                      <ListItemText primary="Advogado" />
                    </ListItemButton>
                    <ListItemButton sx={{ pl: 4 }}>
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