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
                Editar Pautista
            </Typography>

            <Box sx={{ maxWidth: '50%' }}>
                <form>
                    <div>
                        <TextField
                            id="nome-pautista"
                            name="nome"
                            label="Nome Pautista"
                            variant="outlined"
                            sx={{ width: '100%', mb: 2 }}
                            // value={formValues.nome}
                            // onChange={(e) => setFormValues({ ...formValues, nome: e.target.value })}
                            required
                        />
                    </div>

                    <div>
                        <TextField
                            id="status"
                            name="status"
                            select
                            label="Status"
                            // value={formValues.status}
                            sx={{ width: '100%', mb: 2 }}
                            // onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
                            required
                        >
                         {statusOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem> 
                             ))}
                        </TextField>
                    </div>

                    <div>
                        <TextField
                            id="grupo"
                            name="grupo"
                            select
                            label="Grupo"
                            // value={formValues.grupo}
                            sx={{ width: '100%', mb: 2 }}
                            // onChange={(e) => setFormValues({ ...formValues, grupo: e.target.value })}
                            required
                        >
                         {grupoOptions.map((option) => (
                            <MenuItem key={option.value} value={option.value}>
                                {option.label}
                            </MenuItem> 
                             ))}
                        </TextField>
                    </div>

                    <div>
                    <TextField
                        id="date"
                        name="date"
                        label="Data Inicial"
                        type="date"
                        value={selecionarData}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '100%', mb: 2 }}
                        required
                    />

                    <TextField
                        id="date"
                        name="date"
                        label="Data Final"
                        type="date"
                        value={selecionarData}
                        onChange={handleDateChange}
                        InputLabelProps={{
                            shrink: true,
                        }}
                        sx={{ width: '100%', mb: 2 }}
                        required
                    />
                    </div>

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