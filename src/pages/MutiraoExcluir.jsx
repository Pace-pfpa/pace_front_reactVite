import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';

export const MutiraoExcluir =  () => {
    const [vara, setVara] = useState('');
    const [periodoMutirao, setPeridoMutirao] = useState('');

    const varaOptions = [
        { value: 'JEF Altamira', label: 'JEF Altamira'},
        { value: 'JEF Castanhal', label: 'JEF Castanhal'},
        { value: 'JEF Itaituba', label: 'JEF Itaituba'},
        { value: 'JEF Paragominas', label: 'JEF Paragominas'},
        { value: 'JEF Redenção', label: 'JEF Redenção'},
        { value: 'JEF Tucuruí', label: 'JEF Tucuruí'},
        { value: 'JEF Belém 8ª TIT', label: 'JEF Belém 8ª TIT'},
        { value: 'JEF Belém 8ª SUB', label: 'JEF Belém 8ª SUB'},
        { value: 'JEF Belém 10ª TIT', label: 'JEF Belém 10ª TIT'},
        { value: 'JEF Belém 10ª SUB', label: 'JEF Belém 10ª SUB'},
        { value: 'JEF Belém 11ª TIT', label: 'JEF Belém 11ª TIT'},
        { value: 'JEF Belém 11ª SUB', label: 'JEF Belém 11ª SUB'},
        { value: 'JEF Belém 12ª TIT', label: 'JEF Belém 12ª TIT'},
        { value: 'JEF Belém 12ª SUB', label: 'JEF Belém 12ª SUB'},
        { value: 'JEF Marabá 1ª', label: 'JEF Marabá 1ª'},
        { value: 'JEF Marabá 2ª', label: 'JEF Marabá 2ª'},
        { value: 'JEF Santarém 1ª', label: 'JEF Santarém 1ª'},
        { value: 'JEF Santarém 2ª', label: 'JEF Santarém 2ª'},
        { value: 'CEJUC Belém', label: 'CEJUC Belém'},
    
        { value: '1ª Vara Federal Belém', label: '1ª Vara Federal Belém' },
        { value: '2ª Vara Federal Belém', label: '2ª Vara Federal Belém' },
        { value: '5ª Vara Federal Belém', label: '5ª Vara Federal Belém' },
        { value: '1ª Vara Federal Marabá', label: '1ª Vara Federal Marabá' },
        { value: '2ª Vara Federal Marabá', label: '2ª Vara Federal Marabá' },
        { value: '1ª Vara Federal Santarém', label: '1ª Vara Federal Santarém' },
        { value: '2ª Vara Federal Santarém', label: '2ª Vara Federal Santarém' },
        { value: 'Vara Federal Altamira', label: 'Vara Federal Altamira' },
        { value: 'Vara Federal Castanhal', label: 'Vara Federal Castanhal' },
        { value: 'Vara Federal Itaituba', label: 'Vara Federal Itaituba' },
        { value: 'Vara Federal Paragominas', label: 'Vara Federal Paragominas' },
        { value: 'Vara Federal Redenção', label: 'Vara Federal Redenção' },
        { value: 'Vara Federal Tucuruí', label: 'Vara Federal Tucuruí' },
    
        { value: '4ª Vara cível de Belém', label: '4ª Vara cível de Belém' },
        { value: '3ª Vara cível de Parauapebas', label: '3ª Vara cível de Parauapebas' }
    ]

    const handleVaraChange = (e) => {
        setVara(e.target.value);
    };

    const handlePeridoMutirao = (e) => {
        setVara(e.target.value);
    };

    const limparCampos = () => {
        setPeridoMutirao('')
        setVara('');
    };
    
    return (
        <>
        
      <Box sx={{ maxWidth: '600px' }}>
        <form >
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            Excluir Mutirão
          </Typography>

          <TextField
            id="vara"
            name="vara"
            select
            label="Vara"
            value={vara}
            sx={{
                mb: 2,
                width: '100%',
                '& textarea': {
                    height: '100px',
                    overflowY: 'auto',
                    resize: 'vertical',
                },
            }}
            onChange={handleVaraChange}
            required>

            { varaOptions.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                    {option.label}
                </MenuItem>
            ))}
          </TextField>

          <div>
            <TextField
              id="periodoMutirao"
              name="periodoMutirao"
              label="Período do Mutirão"
              variant="outlined"
              sx={{ width: '100%', mb: 2 }}
            //   value={formValues.numeroOAB}
            //   onChange={(e) => setFormValues({ ...formValues, numeroOAB: e.target.value })}
              required
            />
          </div>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button 
              type="button" 
              variant="outlined" 
            //   onClick={limparCampos} 
              className='clearButton'>
              Limpar
            </Button>

            <Button 
              type="submit" 
              variant="contained" 
            //   endIcon={<SendIcon />} 
              className='sendButton' sx={{ ml: 1  }}>
              Excluir
            </Button>
          </Box>
          </form>
        </Box>
      </>
    )
}