import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Box, Typography, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import AdfScannerIcon from '@mui/icons-material/AdfScanner';
import { TabelaCadastroPautista } from '../components/TabelaCadastroPautista';
import { baseURL } from '../_config/index';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';

export const ConsultaPautista = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL + 'pautista/');
      const formattedData = response.data.map(item => ({
        ...item,
        dataInicial: formatarData(item.dataInicial),
        dataFinal: formatarData(item.dataFinal),
      }));
      setData(formattedData);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const formatarData = (data) => {
    if (data) {
      return data.split('-').reverse().join('-');
    }
    return '';
  };

  const handleRowClick = (row) => {
    const selectedIndex = selected.indexOf(row.nome);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.nome);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleBotaoEditar = () => {
    if (selected.length === 0) {
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
                title: "Nenhum item selecionado!"
            });
            const swalContainer = document.querySelector('.swal-container');
            if (swalContainer) {
              swalContainer.style.marginTop = '60px';
                swalContainer.style.marginTop = '60px';
            }
    } else {
      navigate('/editar-pautista');
    }
  };

  const handleBotaoDeletar = () => {
    if (selected.length === 0) {
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
                title: "Nenhum item selecionado!"
            });
            const swalContainer = document.querySelector('.swal-container');
            if (swalContainer) {
              swalContainer.style.marginTop = '60px';
                swalContainer.style.marginTop = '60px';
            }
    } else {
      if (selected.length > 0) {
        Swal.fire({
          title: "Tem certeza?",
          text: "Esta ação não pode ser desfeita",
          icon: "warning",
          showCancelButton: true,
          confirmButtonColor: "#3085d6",
          cancelButtonColor: "#d33",
          confirmButtonText: "Sim, deletar"
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: "Sucesso",
              text: "Pautistas deletados da tabela.",
              icon: "success"
            });
          }
        });
      }
    }
  };

  return (
    <>
      <div>
        <Typography variant="h5" component="div" sx={{ mb: 3 }}>
          Consultar Pautista
        </Typography>

        <Box
          sx={{
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 2,
            mt: 2
          }}>
          <Button variant="outlined" endIcon={<EditIcon />} onClick={handleBotaoEditar}>
            Editar
          </Button>

          <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleBotaoDeletar} sx={{ borderColor: '#D32F2F', color: '#D32F2F' }}>
            Deletar
          </Button>

          <Button variant="outlined" endIcon={<AdfScannerIcon />} sx={{ borderColor: '#757575', color: '#757575' }}>
            Imprimir
          </Button>
        </Box>
      </div>

      <TabelaCadastroPautista
        data={data}
        enableRowSelection={true}
        selected={selected}
        onRowClick={handleRowClick}
      />
    </>
  );
};
