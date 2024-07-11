import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { api_axios_getMutirao } from "../API/api_axios_getMutirao";
import { gerarEscala } from "../services/GerarEscala";
import Swal from "sweetalert2";

const grupoOptions = [
    { value: 'TODOS', label: 'Todos' },
    { value: 'PREPOSTO', label: 'Preposto' },
    { value: 'PROCURADOR', label: 'Procurador' }
];

export const EscalaGerar = () => {
    const [varas, setVaras] = useState([]);
    const [vara, setVara] = useState("");
    const [mutiroesSemEscala, setMutiroesSemEscala] = useState([]);
    const [periodoMutiraoOptions, setPeriodoMutiraoOptions] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState("");
    const [grupo, setGrupo] = useState("");

    const listarVaras = (mutiraoDatabase) => {
        let varasSemEscala = [];
        let mutiroes = [];

        mutiraoDatabase.forEach(obj => {
            if (obj.status === "SEM_ESCALA") {
                mutiroes.push(obj);
                if (varasSemEscala.indexOf(obj.vara) === -1) {
                    varasSemEscala.push(obj.vara);
                }
            }
        });

        setMutiroesSemEscala(mutiroes);
        setVaras(varasSemEscala);
    };

    const getPeriodoMutiraoOptions = (selectedVara) => {
        let options = [];

        mutiroesSemEscala.forEach(obj => {
            if (obj.vara === selectedVara) {
                options.push({
                    id: obj.id,
                    periodo: `${formatarData(obj.dataInicial, "/")} a ${formatarData(obj.dataFinal, "/")}`
                });
            }
        });

        setPeriodoMutiraoOptions(options);
        // console.log("periodoMutiraoOptions", periodoMutiraoOptions);
    };

    const formatarData = (LocalDate, char) => {
        if (LocalDate !== null) {
            if (LocalDate.indexOf("-") === 4 && LocalDate.length === 10) {
                LocalDate = LocalDate.substring(8, 10) + char + LocalDate.substring(5, 7) + char + LocalDate.substring(0, 4);
            } else if (LocalDate.indexOf("-") === 2 && LocalDate.length === 10) {
                LocalDate = LocalDate.substring(6, 10) + char + LocalDate.substring(3, 5) + char + LocalDate.substring(0, 2);
            }
        }
        return LocalDate;
    };

    useEffect(() => {
        const fetchMutiroes = async () => {
            try {
                const response = await api_axios_getMutirao();
                listarVaras(response);
            } catch (error) {
                const Toast = Swal.mixin({
                    toast: true,
                    position: "top-end",
                    showConfirmButton: false,
                    timer: 2000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.onmouseenter = Swal.stopTimer;
                        toast.onmouseleave = Swal.resumeTimer;
                    },
                    customClass: {
                        container: 'swal-container'
                    }
                });
                Toast.fire({
                    icon: "error",
                    title: "Error ao buscar as varas!"
                });

                const swalContainer = document.querySelector('.swal-container');
                if (swalContainer) {
                    swalContainer.style.marginTop = '60px';
                }
            }
        };

        fetchMutiroes();
    }, []);

    useEffect(() => {
        if (vara.length > 0) {
            getPeriodoMutiraoOptions(vara);
            setSelectedPeriodo("");
        }
    }, [vara, mutiroesSemEscala]);

    const limparCampos = () => {
        setVara("");
        setSelectedPeriodo("");
        setGrupo("");
    };

        //Verifica caso o usuário não tenha selecionado nenhuma vara e exibe um alerta
        const handlePeriodoMutiraoClick = () => {
          if (varas.length === 0) {
            const Toast = Swal.mixin({
                toast: true,
                position: "top-end",
                showConfirmButton: false,
                timer: 2000,
                timerProgressBar: true,
                didOpen: (toast) => {
                    toast.onmouseenter = Swal.stopTimer;
                    toast.onmouseleave = Swal.resumeTimer;
                },
                customClass: {
                    container: 'swal-container'
                }
            });
            Toast.fire({
                icon: "warning",
                title: "Por favor, selecione uma vara"
            });

            const swalContainer = document.querySelector('.swal-container');
            if (swalContainer) {
                swalContainer.style.marginTop = '60px';
            }
          }
        };

        const handleVaraClick = () => {
          if (varas.length === 0) {
              const Toast = Swal.mixin({
                  toast: true,
                  position: "top-end",
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                      toast.onmouseenter = Swal.stopTimer;
                      toast.onmouseleave = Swal.resumeTimer;
                  },
                  customClass: {
                      container: 'swal-container'
                  }
              });
              Toast.fire({
                  icon: "warning",
                  title: "Não há pautas cadastradas"
              });
  
              const swalContainer = document.querySelector('.swal-container');
              if (swalContainer) {
                  swalContainer.style.marginTop = '60px';
              }
          }
      };

    const handleSubmit = async (e) => {
      e.preventDefault();
      const mutiraoId = periodoMutiraoOptions.find(option => option.periodo === selectedPeriodo)?.id
      if (!mutiraoId) {
        Swal.fire({
          icon: 'error',
          title: 'Erro',
          text: 'Mutirão não encontrado!'
        });
        return;
      }
      const dataToSend = {mutiraoId, grupo};
      console.log("dataToSend da page",dataToSend)
      try {
          await gerarEscala(dataToSend);
        
          limparCampos();
          Swal.fire({
              icon: 'success',
              title: 'Sucesso!',
              text: 'Escala cadastrada com sucesso',
          });

      } catch (error) {
          Swal.fire({
              icon: 'error',
              title: 'Erro ao enviar dados!',
              text: error.message
          });
      }
    }

    return (
        <>
            <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                Gerar Escala
            </Typography>

            <Box sx={{ maxWidth: '600px' }}>
                <form onSubmit={handleSubmit}>
                    <div>
                        <TextField
                            id="vara"
                            name="vara"
                            select
                            label="Vara"
                            value={vara}
                            onClick={handleVaraClick}
                            sx={{ width: '100%', mb: 2 }}
                            onChange={(e) => setVara(e.target.value)}
                            required
                        >
                            {varas.map((vara, index) => (
                                <MenuItem key={index} value={vara}>
                                    {vara}
                                </MenuItem>
                            ))}
                        </TextField>
                    </div>

                    <div>
                        <TextField
                            id="periodoMutirao"
                            name="periodoMutirao"
                            select
                            label="Período do Mutirão"
                            value={selectedPeriodo}
                            onClick={handlePeriodoMutiraoClick}
                            onChange={(e) => {
                                if (vara.length > 0) {
                                    setSelectedPeriodo(e.target.value);
                                }
                            }}
                            sx={{ width: '100%', mb: 2 }}
                            required
                        >
                            {periodoMutiraoOptions.map(option => (
                                <MenuItem key={option.id} value={option.periodo}>
                                    {option.periodo}
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
                            value={grupo}
                            sx={{ width: '100%', mb: 2 }}
                            onChange={(e) => setGrupo(e.target.value)}
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
                            className='sendButton' sx={{ ml: 1 }}>
                            Cadastrar
                        </Button>
                    </Box>
                </form>
            </Box>
        </>
    );
};
