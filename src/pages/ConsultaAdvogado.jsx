import React, { useEffect, useState } from "react";
import SearchIcon from '@mui/icons-material/Send';
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { TabelaPautistaContainer } from "../services/TabelaPautistaContainer";

export const ConsultaAdvogado = () => {

    const limparCampos = () => {
        setFormValues({
          nome: '',
          numeroOAB: ''
        });
      };

    return (
        <>
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            Consultar Advogado
          </Typography>
    
          <Box sx={{ maxWidth: '600px' }}>
            <form>
              <div>
                <TextField
                  id="nome"
                  name="nome"
                  label="Nome Pautista"
                  variant="outlined"
                  sx={{ width: '100%', mb: 2 }}
                //   value={formValues.nome}
                //   onChange={(e) => setFormValues({ ...formValues, nomeAdvogado: e.target.value })}
                  required
                />
              </div>
    
              <div>
                <TextField
                  id="numeroOAB"
                  name="numeroOAB"
                  label="Número OAB"
                  variant="outlined"
                  sx={{ width: '100%', mb: 2 }}
                //   value={formValues.nomeAdvogado}
                //   onChange={(e) => setFormValues({ ...formValues, numeroOAB: e.target.value })}
                  required
                />
              </div>
    
              <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                <Button 
                  type="button" 
                  variant="outlined" 
                  onClick={limparCampos} 
                  className='clearButton'>
                  Limpar
                </Button>
    
                <Button 
                  type="submit" 
                  variant="contained" 
                  endIcon={<SearchIcon />} 
                  className='sendButton' sx={{ ml: 1  }}>
                  Pesquisar
                </Button>
              </Box>
            </form>
          </Box>

          
    
          {/* <Box sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', mb: 2 }}>
            <SearchBar onSearch={setSearchTerm} />
          </Box> */}
    
          {/* {filteredData.length > 0 ? <TabelaCadastroAdvogado data={filteredData} /> : <Typography variant="body1">Nenhum resultado encontrado.</Typography>} */}
          
        </>
      );
}