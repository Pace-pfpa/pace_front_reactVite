import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';

const grupoOptions = [
    { value: 'TODOS', label: 'Todos' },
    { value: 'PREPOSTO', label: 'Preposto' },
    { value: 'PROCURADOR', label: 'Procurador' }
];

export const EscalaGerar =  () => {
    const [formValues, setFormValues] = useState({
    });

    const limparCampos = () => {
        setFormValues({
          nome: '',
          grupo: 'preposto',
          status: 'ATIVO',
          dataInicial: '',
          dataFinal: '',
        });
    };
    return (
        <>
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            Gerar Escala
          </Typography>

          <Box sx={{ maxWidth: '600px' }}>
            <form>
              <div>
                <TextField
                  id="vara"
                  name="vara"
                  select
                  label="Vara"
                  value={formValues.vara}
                  sx={{ width: '100%', mb: 2 }}
                  onChange={(e) => setFormValues({ ...formValues, vara: e.target.value })}
                  required
                >
                  {/* {grupoOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))} */}
                </TextField>
              </div>
              <div>
                <TextField
                  id="periodoMutirao"
                  name="periodoMutirao"
                  select
                  label="Período do Mutirão"
                //   value={formValues.grupo}
                  sx={{ width: '100%', mb: 2 }}
                //   onChange={(e) => setFormValues({ ...formValues, grupo: e.target.value })}
                  required
                ></TextField>
              </div>

              <div>
                <TextField
                    id="grupo"
                    name="grupo"
                    select
                    label="Grupo"
                    // value={formValues.status}
                    sx={{ width: '100%', mb: 2 }}
                    // onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                    required
                >
                  {grupoOptions.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
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
                  endIcon={<SendIcon />} 
                  className='sendButton' sx={{ ml: 1  }}>
                  Cadastrar
                </Button>
              </Box>
            </form>
            </Box>
        </>
    )
}