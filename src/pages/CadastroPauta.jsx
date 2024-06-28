import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import { cadastrarPauta } from "../services/CadastroPauta";
import swal from "sweetalert";
import { filtrarCadastroPauta } from "../helps/filtrarCadastroPauta";
import SendIcon from '@mui/icons-material/Send';

export const CadastroPauta =  () => {
    const [data, setData] = useState('');
    const [hora, setHora] = useState('');
    const [turno, setTurno] = useState('')
    const [sala, setSala] = useState('')
    const [vara, setVara] = useState('')
    const [tipo, setTipo] = useState('');
    const [processo, setProcesso] = useState('')
    const [nomeParte, setNomeParte] = useState('')

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

    const handleDataChange = (e) => {
        setData(e.target.value);
    };

    const handleHoraChange = (e) => {
        setHora(e.target.value);
    };

    const handleTurnoChange = (e) => {
        setTurno(e.target.value);
    };

    const handleSalaChange = (e) => {
        setSala(e.target.value);
    };

    const handleVaraChange = (e) => {
        setVara(e.target.value);
    };

    const handleTipoChange = (e) => {
        setTipo(e.target.value);
    };
    
    const handleProcessoChange = (e) => {
        const lines = e.target.value.split('\n').map(line => {
            let value = line.replace(/\D/g, '');
            if (value.length > 7) {
                value = value.slice(0, 7) + '-' + value.slice(7)
            }
            if (value.length > 10) {
                value = value.slice(0, 10) + '.' + value.slice(10)
            }
            if (value.length > 15) {
                value = value.slice(0, 15) + '.' + value.slice(15)
            }
            if (value.length > 17) {
                value = value.slice(0, 17) + '.' + value.slice(17)
            }
            if (value.length > 20) {
                value = value.slice(0, 20) + '.' + value.slice(20)
            }
            if (value.length > 25) {
                value = value.slice(0, 25)
            }
            return value;
        });
        setProcesso(lines.join('\n'))
    };

    const handleNomeParteChange = (e) => {
        setNomeParte(e.target.value);
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

     const [formValues, setFormValues] = useState({
         data: '',
         hora: '',
         sala: '',
         processo: '',
         nomeParte: '',
         cpf: '',
         nomeAdvogado: '',
         objeto: '',
         vara: '',
         turno: '',  
     });

    const handleSubmit = async (e) => {
        e.preventDefault();

        data = formatar('data', data);
        hora = formatar('hora', hora);
        turno = formatar('turno', turno);
        sala = formatar('sala', sala);

        const processos = processo.split('\n').filter(line => line.trim() !== '');
        let processosRepetidos = [];
        processos.forEach((proc, i) => {
            if (processos.indexOf(proc) !== i) {
                processosRepetidos.push(proc);
            }
        });

        if (processosRepetidos.length > 0) {
            alert("O formulário contém números de processo repetidos, verifique os seguintes números:\n" + processosRepetidos.join(', '));
            return;
        }

        if (!(countLines(data) === countLines(hora) && countLines(turno) === countLines(sala) && countLines(processo) === countLines(nomeParte))) {
            alert("O número de linhas é diferente! Verifique os campos.");
            return;
        }

        if (!vara) {
            alert("Vara não selecionada. Verifique.")
            return
        }

        if (hora === "hora inválida") {
            alert("Campo hora está em formato incorreto. Por favor, verifique se todos os valores estão no formato HH:MM.");
            return;
        }

        if (turno === undefined) {
            alert("Algum valor no campo 'Turno' está incorreto. Apenas os valores 'MANHÃ' e 'TARDE' são permitidos.");
            return;
        }

        if (sala === undefined) {
            alert("O campo sala aceita apenas valores numéricos de um único dígito. Por favor, verifique");
            return;
        }

        if ([data, hora, turno, sala, processo, nomeParte].some(v => v === undefined)) {
            alert("Campo obrigatório vazio. Por favor, preencha todos.");
            return;
        }

        const listaDePautas = []
        const dataArr = data.split('\n')
        const horaArr = data.split('\n')
        const turnoArr = data.split('\n')
        const salaArr = data.split('\n')
        const processoArr = data.split('\n')
        const nomeParteArr = data.split('\n')
        const cpfArr = data.split('\n')
        const nomeAdvogadoArr = data.split('\n')
        const ObjetoArr = data.split('\n')

        const valoresFormatados = {
            data: formatar('data', formValues.data),
            hora: formatar('hora', formValues.hora),
            turno: formatar('turno', formValues.turno),
            sala: formatar('sala', formValues.sala),
            processo: formValues.processo,
            nomeParte: formValues.nomeParte,
            cpf: formValues.cpf,
            nomeAdvogado: formValues.nomeAdvogado,
            objeto: formValues.objeto,
            tipo: formValues.tipo.toUpperCase(),
            vara: formValues.vara
        }
        console.log('dados formatados:', valoresFormatados)




        const { arrayNovaData, arrayNovaHora } = await filtrarCadastroPauta(data.split('\n'), hora.split('\n'));
        const payloads = arrayNovaData.map((dataFormatada, index) => ({
            data: dataFormatada,
            hora: arrayNovaHora,
            sala,
            processo,
            nomeParte,
            cpf: '',
            nomeAdvogado: '',
            objeto: '',
            vara,
            turno,
            tipo: 'CONCILIAÇÃO',
        }));
         const dataHoraFormatada = await filtrarCadastroPauta(payload.data.split('\n'), payload.hora.split('\n'));
         console.log(dataHoraFormatada.arrayNovaHora)
         console.log("Dados formatados payload:", payloads)
          
         try {
            for (const payload of payloads) {
                await cadastrarPauta(payload);
            }
            swal('Sucesso', 'Pautas cadastradas com sucesso!', 'success');
            limparCampos();
        } catch (error) {
            console.error('Erro ao cadastrar pauta:', error);
            swal('Erro', 'Erro ao cadastrar pauta. Verifique os dados e tente novamente.', 'error');
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
                      sx={{
                        width: '100%',
                        '& textarea': {
                          height: '100px',
                          overflowY: 'auto',
                          resize: 'vertical',
                        },
                      }}
                      value={data}
                      onChange={handleDataChange}
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
                        sx={{
                            width: '100%',
                            '& textarea': {
                              height: '100px',
                              overflowY: 'auto',
                              resize: 'vertical',
                            },
                        }}
                        value={hora}
                        onChange={handleHoraChange}
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
                        onChange={handleTurnoChange}
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
                        onChange={handleSalaChange}
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
                        onChange={handleVaraChange}
                        required>

                        { varaOptions.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                            {option.label}
                        </MenuItem>
                        ))}
                    </TextField>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
                <TextField
                        id="processo"
                        name="processo"
                        placeholder="0000000-00.0000.0.00.0000"
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
                        onChange={handleProcessoChange}
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
                        onChange={handleNomeParteChange}
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