import React, { useEffect, useState } from "react";
import { Box, Typography, Button } from '@mui/material';
import { TabelaCadastroAdvogado } from "../components/TabelaAdvogado";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from "sweetalert2";
import axios from "axios";
import { baseURL } from "../_config";
import { useNavigate } from 'react-router-dom';

export const ConsultaAdvogado = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [selected, setSelected] = useState([]);

  const fetchData = async () => {
    try {
      const response = await axios.get(baseURL + 'advogado/');
      setData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  const handleRowClick = (row) => {
    const selectedIndex = selected.indexOf(row.nomeAdvogado);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, row.nomeAdvogado);
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
      }
    } else {
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
            text: "Advogados deletados da tabela.",
            icon: "success"
          });
        }
      });
    }
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
      }
    } else {
      navigate('/editar-advogado');
    }
  };

  return (
    <>
      <Typography variant="h5" component="div" sx={{ mb: 3 }}>
        Consultar Advogado
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'flex-end',
          gap: 2,
          mt: 2
        }}
      >
        <Button variant="outlined" endIcon={<EditIcon />} onClick={handleBotaoEditar}>
          Editar
        </Button>

        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleBotaoDeletar} sx={{ borderColor: '#D32F2F', color: '#D32F2F' }}>
          Deletar
        </Button>
      </Box>

      <TabelaCadastroAdvogado
        data={data}
        selected={selected}
        onRowClick={handleRowClick}
      />
    </>
  );
};
