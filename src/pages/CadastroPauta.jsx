import React, { useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { cadastrarPauta } from "../services/CadastroPauta";
import Swal from 'sweetalert2';
import SendIcon from '@mui/icons-material/Send';

export const CadastroPauta = () => {
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [turno, setTurno] = useState('');
    const [sala, setSala] = useState('');
    const [vara, setVara] = useState('');
    const [processo, setProcesso] = useState('');
    const [nomeParte, setNomeParte] = useState('');

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

    const handleInputChange = (setter) => (e) => {
        setter(e.target.value);
    };

    const countLines = (text) => {
        return text.split('\n').filter(line => line.trim() !== '').length;
    };

    const limparCampos = () => {
        setData('');
        setHora('');
        setTurno('');
        setSala('');
        setProcesso('');
        setNomeParte('');
        setVara('');
    };

    const formatarData = (dataString) => {
        const [dia, mes, ano] = dataString.split('/')
        return `${ano}-${mes}-${dia}`
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const dataArray = data.split('\n').map(line => line.trim());
        const horaArray = hora.split('\n').map(line => line.trim());
        const turnoArray = turno.split('\n').map(line => line.trim());
        const salaArray = sala.split('\n').map(line => line.trim());
        const processoArray = processo.split('\n').map(line => line.trim());
        const nomeParteArray = nomeParte.split('\n').map(line => line.trim());

        if ([dataArray, horaArray, turnoArray, salaArray, processoArray, nomeParteArray].some(arr => arr.includes(''))) {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Campo obrigatório vazio ou inválido. Por favor, preencha todos.",
            }); 
        }

        const processosUnicos = new Set(processoArray);
        if (processosUnicos.size !== processoArray.length) {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "O formulário contém números de processo repetidos, verifique os números!",
            }); 
        }

        if (!(dataArray.length === horaArray.length && turnoArray.length === salaArray.length && processoArray.length === nomeParteArray.length)) {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "O número de linhas é diferente! Verifique os campos.",
            });
        }

        if (!vara) {
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Vara não selecionada. Verifique.",
            });
        }

        const listaDePautas = dataArray.map((d, i) => ({
            data: formatarData(d),
            hora: horaArray[i],
            turno: turnoArray[i],
            sala: salaArray[i],
            processo: processoArray[i],
            nomeParte: nomeParteArray[i],
            vara,
            tipo: 'CONCILIAÇÃO',
        }));

        try {
            await cadastrarPauta(listaDePautas);
            Swal.fire({
                title: "Sucesso!",
                text: "Pautas cadastradas com sucesso!",
                icon: "success"
            })
            limparCampos();
        } catch (error) {
            console.error('Erro ao cadastrar pauta:', error);
            Swal.fire({
                icon: "error",
                title: "Ops...",
                text: "Erro ao cadastrar pauta. Verifique os dados e tente novamente.",
            });
        }
    };

    return (
        <>
            <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                Cadastrar Pautas de Audiências
            </Typography>

            <Box sx={{ maxWidth: '1000px' }}>
                <form onSubmit={handleSubmit}>
                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <TextField
                            id="data"
                            name="data"
                            placeholder="dd/mm/aa"
                            label="Data"
                            variant="outlined"
                            sx={{ width: '100%', '& textarea': { height: '100px', overflowY: 'auto', resize: 'vertical' } }}
                            value={data}
                            onChange={handleInputChange(setData)}
                            multiline
                            rows={2}
                            required
                        />
                        <Typography variant="body2" sx={{ m: 2 }}>
                            {countLines(data)} {countLines(data) === 1}
                        </Typography>

                        <TextField
                            id="hora"
                            name="hora"
                            placeholder="00:00"
                            label="Hora"
                            variant="outlined"
                            sx={{ width: '100%', '& textarea': { height: '100px', overflowY: 'auto', resize: 'vertical' } }}
                            value={hora}
                            onChange={handleInputChange(setHora)}
                            multiline
                            rows={2}
                            required
                        />
                        <Typography variant="body2" sx={{ m: 2 }}>
                            {countLines(hora)} {countLines(hora) === 1}
                        </Typography>

                        <TextField
                            id="turno"
                            name="turno"
                            placeholder="Tarde"
                            label="Turno"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                '& textarea': {
                                    height: '100px',
                                    overflowY: 'auto',
                                    resize: 'vertical',
                                },
                            }}
                            value={turno}
                            onChange={handleInputChange(setTurno)}
                            multiline
                            rows={2}
                            required
                        />
                        <Typography variant="body2" sx={{ m: 2 }}>
                            {countLines(turno)} {countLines(turno) === 1}
                        </Typography>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                        <TextField
                            id="sala"
                            name="sala"
                            label="Sala"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                '& textarea': {
                                    height: '100px',
                                    overflowY: 'auto',
                                    resize: 'vertical',
                                },
                            }}
                            value={sala}
                            onChange={handleInputChange(setSala)}
                            multiline
                            rows={2}
                            required
                        />
                        <Typography variant="body2" sx={{ m: 2 }}>
                            {countLines(sala)} {countLines(sala) === 1}
                        </Typography>

                        <TextField
                            id="vara"
                            name="vara"
                            select
                            label="Vara"
                            value={vara}
                            sx={{
                                m: '10px',
                                width: '100%',
                                '& textarea': {
                                    height: '100px',
                                    overflowY: 'auto',
                                    resize: 'vertical',
                                },
                            }}
                            onChange={handleInputChange(setVara)}
                            required
                        >
                            {varaOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '16px' }}>
                        <TextField
                            id="processo"
                            name="processo"
                            label="Processo"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                '& textarea': {
                                    height: '100px',
                                    overflowY: 'auto',
                                    resize: 'vertical',
                                },
                            }}
                            value={processo}
                            onChange={handleInputChange(setProcesso)}
                            multiline
                            rows={2}
                            required
                        />
                        <Typography variant="body2" sx={{ m: 2 }}>
                            {countLines(processo)} {countLines(processo) === 1}
                        </Typography>

                        <TextField
                            id="nomeParte"
                            name="nomeParte"
                            label="Nome da Parte"
                            variant="outlined"
                            sx={{
                                width: '100%',
                                '& textarea': {
                                    height: '100px',
                                    overflowY: 'auto',
                                    resize: 'vertical',
                                },
                            }}
                            value={nomeParte}
                            onChange={handleInputChange(setNomeParte)}
                            multiline
                            rows={2}
                            required
                        />
                        <Typography variant="body2" sx={{ m: 2 }}>
                            {countLines(nomeParte)} {countLines(nomeParte) === 1}
                        </Typography>
                    </div>

                    <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                        <Button
                            type="button"
                            variant="outlined"
                            onClick={limparCampos}
                            className='clearButton'
                        >
                            Limpar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            endIcon={<SendIcon />}
                            sx={{ ml: 1 }}
                        >
                            Enviar
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};
