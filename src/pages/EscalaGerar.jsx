import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, TextField, MenuItem, Button, Tabs, Tab } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import SearchIcon from '@mui/icons-material/Send';
import AddIcon from '@mui/icons-material/Add';
import CircularProgress from '@mui/material/CircularProgress';
import { api_axios_getMutirao } from "../API/api_axios_getMutirao";
import { VITE_API_URL_DEV } from "../_config";
import { gerarEscala } from "../services/GerarEscala";
import axios from "axios";
import Swal from "sweetalert2";

const turnoOptions = [
    { value: 'TODOS', label: 'Todos' },
    { value: 'MANHA', label: 'Manhã' },
    { value: 'TARDE', label: 'Tarde' },
];

const statusOptions = [
    { value:'Não Cadastrada', label:'Não cadastrada'},
    { value:'Cadastrada' , label: 'Cadastrada'},
    { value:'Todos' , label: 'Todos'}
]

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
    const maxFileNameLength = 78;

    const ipdev = VITE_API_URL_DEV;

    const handleTabChange = (event, newValue) => {
        if (newValue === 1 && !isPasswordCorrect) {
          Swal.fire({
            text: 'Digite a senha:',
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
            formData.append('file', selectedFile)

            setLoading(true);
            setMessage('');

            try {
                const response = await axios.post(`${ipdev}/upload`,
                    formData, {
                        headers: {
                          'Content-Type': 'multipart/form-data',
                        },
                    });
                    Swal.fire({
                        title: "Sucesso!",
                        text: "Audiência(s) adicionada(s)!",
                        icon: "success"
                    });
                    setDownloadAvailable(true);
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
                    title: "Erro ao adicionar arquivo"
                });
    
                const swalContainer = document.querySelector('.swal-container');
                if (swalContainer) {
                    swalContainer.style.marginTop = '60px';
                }
                setMessage(`${error.response ? error.response.data.error : error.message}`);
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
                <>
                  <Box sx={{ maxWidth: '60%', padding: 2 }}>
                    <form>
                      <div style={{ display: 'flex', gap: '16px', marginBottom: '16px' }}>
                        <TextField
                          id="data-inicial"
                          name="dataInicial"
                          label="Data Inicial"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          sx={{ flex: 1 }}
                        //   value={formValues.dataInicial}
                        //   onChange={(e) => setFormValues({ ...formValues, dataInicial: e.target.value })}
                          required
                        />
            
                        <TextField
                          id="data-final"
                          name="dataFinal"
                          label="Data Final"
                          type="date"
                          InputLabelProps={{ shrink: true }}
                          sx={{ flex: 1 }}
                        //   value={formValues.dataFinal}
                        //   onChange={(e) => setFormValues({ ...formValues, dataFinal: e.target.value })}
                          required
                        />
                      </div>
            
                      <TextField
                        id="turno"
                        name="turno"
                        select
                        label="Turno"
                        // value={formValues.turno}
                        // onChange={(e) => setFormValues({ ...formValues, turno: e.target.value })}
                        sx={{ width: '100%', mb: 2 }}
                        required
                      >
                        {turnoOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
            
                      <TextField
                        id="vara"
                        name="vara"
                        select
                        label="Vara"
                        // value={formValues.vara}
                        // onChange={(e) => setFormValues({ ...formValues, vara: e.target.value })}
                        sx={{ width: '100%', mb: 2 }}
                        required
                      >
                        {/* {varaOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))} */}
                      </TextField>
            
                      <TextField
                        id="sala"
                        name="sala"
                        label="Sala"
                        variant="outlined"
                        sx={{ width: '100%', mb: 2 }}
                        // value={formValues.sala}
                        // onChange={(e) => setFormValues({ ...formValues, sala: e.target.value })}
                      />
            
                      <TextField
                        id="statusTarefa"
                        name="statusTarefa"
                        select
                        label="Status Tarefa Sapiens"
                        // value={formValues.statusTarefa}
                        // onChange={(e) => setFormValues({ ...formValues, statusTarefa: e.target.value })}
                        sx={{ width: '100%', mb: 2 }}
                        required
                      >
                        {statusOptions.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextField>
            
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
                          className='sendButton' sx={{ ml: 1 }}>
                          Pesquisar
                        </Button>
                      </Box>
                    </form>
                  </Box>
            
                  <Box sx={{ marginTop: 3 }}>
                    {/* <TabelaDeAudiencias
                      data={data}
                      enableRowSelection={true}
                    /> */}
                  </Box>
                </>
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
                      startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AddIcon />}
                    >
                      {loading ? 'Adicionando...' : 'Adicionar'}
                    </Button>
                    {loading && <p>Aguarde um momento</p>}
                  </Box>
                </CardContent>
              </Card>
            </Box>
        )}

        </>
    );
};
