import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
export const EditarAdvogado =  () => {
    const [selecionarData, setSelecionarData] = useState('');
    const grupoOptions = [
        { value: 'PREPOSTO', label: 'Preposto' },
        { value: 'PROCURADOR', label: 'Procurador' },
    ];

    const statusOptions = [
        { value: 'ATIVO', label: 'Ativo' },
        { value: 'LICENCA', label: 'Licença' },
        { value: 'FERIAS', label: 'Férias' },
        { value: 'INATIVO', label: 'Inativo' }
    ];

    const handleDateChange = (event) => {
        setSelecionarData(event.target.value);
    };

    return (
        <>
            <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                Editar Advogado
            </Typography>

            <Box sx={{ maxWidth: '50%' }}>
                <form>
                    <div>
                        <TextField
                            id="nomeAdvogado"
                            name="nome"
                            label="Nome Advogado"
                            variant="outlined"
                            sx={{ width: '100%', mb: 2 }}
                            // value={formValues.nome}
                            // onChange={(e) => setFormValues({ ...formValues, nome: e.target.value })}
                            required
                        />
                    </div>

                    <TextField
                        id="numeroOAB"
                        name="numeroOAB"
                        label="Número OAB"
                        variant="outlined"
                        sx={{ width: '100%', mb: 2 }}
                        // value={formValues.numeroOAB}
                        // onChange={(e) => setFormValues({ ...formValues, numeroOAB: e.target.value })}
                        required
                    />

                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                        }}>
                    <Button
                        type="submit"
                        variant="contained"
                        sx={{ ml: 1 }}
                    >
                    Atualizar
                    </Button>
                    </Box>

                    
                </form>
            </Box>
        </>
    )
}