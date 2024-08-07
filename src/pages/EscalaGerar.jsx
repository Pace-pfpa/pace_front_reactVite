import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, TextField, MenuItem, Button, Tabs, Tab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import AddIcon from '@mui/icons-material/Add';
import { api_axios_getMutirao } from "../API/api_axios_getMutirao";
import { gerarEscala } from "../services/GerarEscala";
import Swal from "sweetalert2";

const grupoOptions = [
    { value: 'TODOS', label: 'Todos' },
    { value: 'PREPOSTO', label: 'Preposto' },
    { value: 'PROCURADOR', label: 'Procurador' }
];

const correctPassword = "paceAdmins";

export const EscalaGerar = () => {
    const [varas, setVaras] = useState([]);
    const [vara, setVara] = useState("");
    const [mutiroesSemEscala, setMutiroesSemEscala] = useState([]);
    const [periodoMutiraoOptions, setPeriodoMutiraoOptions] = useState([]);
    const [selectedPeriodo, setSelectedPeriodo] = useState("");
    const [grupo, setGrupo] = useState("");
    const [tabValue, setTabValue] = useState(0);
    const [selectedFile, setSelectedFile] = useState(null);
    const [message, setMessage] = useState("")
    const [loading, setLoading] = useState(false)
    const [isPasswordCorrect, setIsPasswordCorrect] = useState(false);
    const maxFileNameLength = 50;

    const ipDev = import.meta.env.VITE_API_URL_DEV;
    console.log(ipdev)

    const handleTabChange = (event, newValue) => {
        if (newValue === 1 && !isPasswordCorrect) {
          Swal.fire({
            title: 'Digite a senha',
            input: 'password',
            inputPlaceholder: 'Digite a senha',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar',
          }).then((result) => {
            if (result.isConfirmed) {
              if (result.value === correctPassword) {
                setIsPasswordCorrect(true);
                setTabValue(newValue);
              } else {
                Swal.fire('Senha incorreta', '', 'error');
              }
            }
          });
        } else {
            if (newValue !== 1){
                setIsPasswordCorrect(false)
            }
          setTabValue(newValue);
        }
    };

    const onFileUpload = async () => {
        if (selectedFile) {
            const formData = new FormData()
            formData.append('file', file)

            setLoading(true);
            setMessage('');

            try {
                const response = await axios.post(`${ipdev}/upload`,
                    formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                    });
                    setMessage(`File uploaded successfully: ${JSON.stringify(response.data)}`);
                    setDownloadAvailable(true);
            } catch (error) {
                setMessage(`Failed to upload file: ${error.response ? error.response.data.error : error.message}`);
            } finally {
                setLoading(false);
            }
        } else {
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
                icon: "info",
                title: "Por favor, selecione um arquivo!"
            });

            const swalContainer = document.querySelector('.swal-container');
            if (swalContainer) {
                swalContainer.style.marginTop = '60px';
            }
        }
    }

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const truncateFileName = (name) => {
        if (name.length > maxFileNameLength) {
            return name.substring(0, maxFileNameLength) + '...';
        }
        return name;
    };

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
                    title: "Erro ao buscar as varas!"
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

    return (
        <>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: '-23px' }}>
            <Tabs 
              value={tabValue} 
              onChange={handleTabChange} 
              aria-label="abas de navegação"
            >
              <Tab label="Gerar" />
              <Tab label="Fazer Upload" />
            </Tabs>
        </Box>
        {tabValue === 0 && (
            <Box>
            <Typography variant="h5" component="div" sx={{ mb: 3 }}>
                Gerar Escala
            </Typography>

            <Box sx={{ maxWidth: '600px' }}>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <TextField
                            id="vara"
                            name="vara"
                            select
                            label="Vara"
                            value={vara}
                            onChange={(e) => setVara(e.target.value)}
                            sx={{ width: '100%', mb: 2 }}
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
                            onChange={(e) => setSelectedPeriodo(e.target.value)}
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
        </Box>
        )}
        {tabValue === 1 && isPasswordCorrect &&(
            <Box display="flex" justifyContent="center">
              <Card sx={{ width: 800, border: '1px solid #ccc', justifyContent: 'center', borderRadius: 3, mt: 4 }}>
                <CardContent>
                  <Box
                    display="flex"
                    flexDirection="column"
                    alignItems="center"
                    justifyContent="center"
                    sx={{ height: 150 }}
                  >
                    <Button
                      variant="contained"
                      component="label"
                      startIcon={<CloudUploadIcon />}
                      sx={{ mb: 2 }}
                    >
                      Selecionar Arquivo
                      <input
                        type="file"
                        hidden
                        onChange={handleFileChange}
                      />
                    </Button>
          
                    {selectedFile && (
                      <Typography variant="body1" noWrap>
                        {truncateFileName(selectedFile.name)}
                      </Typography>
                    )}
          
                    <Button
                      variant="contained"
                      sx={{ mt: 2 }}
                      disabled={loading}
                      onClick={onFileUpload}
                      startIcon={<AddIcon />}
                    >
                      {loading ? 'Carregando...' : 'Adicionar'}
                    </Button>
                    {loading && <p>Extraindo...</p>}
                    {message && <p>{message}</p>}
                  </Box>
                </CardContent>
              </Card>
            </Box>
        )}

        </>
    );
};
