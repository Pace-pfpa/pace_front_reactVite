import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import React from "react";

export const CadastroAdvogado = () => {
    return (
        <>
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            Cadastrar Pautista
          </Typography>

        <Box sx={{ maxWidth: '600px' }}>
          <form>
            <div>
              <TextField id="nome" label="Nome" variant="outlined" />
            </div>
        </form>
        </Box>
        </>
    );
}