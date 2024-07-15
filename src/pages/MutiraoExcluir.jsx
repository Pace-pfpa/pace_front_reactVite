import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import axios from 'axios';
import Swal from "sweetalert2";
import { baseURL } from '../_config/index';

export const MutiraoExcluir = () => {
  const [varas, setVaras] = useState([]);
  const [vara, setVara] = useState("");
  const [mutiroes, setMutiroes] = useState([]);
  const [periodoMutiraoOptions, setPeriodoMutiraoOptions] = useState([]);
  const [selectedPeriodo, setSelectedPeriodo] = useState("");
  const [grupo, setGrupo] = useState("");

  useEffect(() => {
    listarVaras();
  }, []);

  const listarVaras = async () => {
    try {
      const response = await axios.get(baseURL + 'mutirao/');
      const mutirao = response.data;
      setMutiroes(mutirao);
      getVara(mutirao);
    } catch (error) {
      console.error(error);
      Swal.fire({
        icon: 'error',
        title: 'Error ao buscar as varas!'
      });
    }
  };

  const getVara = (mutirao) => {
    let varasComEscala = [];
    mutirao.forEach(obj => {
      if (varasComEscala.indexOf(obj.vara) === -1) {
        varasComEscala.push(obj.vara);
      }
    });
    setVaras(varasComEscala);
  };

  const getMutirao = (selectedVara) => {
    const options = mutiroes
      .filter(obj => obj.vara === selectedVara)
      .map(obj => ({
        id: obj.id,
        periodo: `${formatarData(obj.dataInicial, "/")} a ${formatarData(obj.dataFinal, "/")}`
      }));
    setPeriodoMutiraoOptions(options);
  };

  const handleVaraChange = (e) => {
    const selectedVara = e.target.value;
    setVara(selectedVara);
    if (selectedVara === "sem vara") {
      setPeriodoMutiraoOptions([]);
    } else {
      getMutirao(selectedVara);
    }
  };

  const handleExcluir = async () => {
    const idMutirao = selectedPeriodo;
    try {
      await axios.delete(baseURL + 'mutirao/' + idMutirao);
      listarVaras();
      setSelectedPeriodo("");
      Swal.fire({
        icon: 'success',
        title: 'Sucesso',
        text: "Mutirão excluído com sucesso",
        showConfirmButton: true,
      });
    } catch (error) {
      console.error(error);
    }
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

  return (
    <>
      <Box sx={{ maxWidth: '600px' }}>
        <form>
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            Excluir Mutirão
          </Typography>

          <TextField
            id="vara"
            name="vara"
            select
            label="Vara"
            value={vara}
            sx={{
              mb: 2,
              width: '100%',
              '& textarea': {
                height: '100px',
                overflowY: 'auto',
                resize: 'vertical',
              },
            }}
            onChange={handleVaraChange}
            required
          >
            {varas.map((varaOption, index) => (
              <MenuItem key={index} value={varaOption}>
                {varaOption}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            id="mutirao"
            name="mutirao"
            select
            label="Período do Mutirão"
            value={selectedPeriodo}
            sx={{ width: '100%', mb: 2 }}
            onChange={(e) => setSelectedPeriodo(e.target.value)}
            required
          >
            {periodoMutiraoOptions.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.periodo}
              </MenuItem>
            ))}
          </TextField>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
            <Button
              type="button"
              variant="outlined"
              onClick={() => {
                setVara("");
                setSelectedPeriodo("");
                setGrupo("");
              }}
              className='clearButton'>
              Limpar
            </Button>

            <Button
              type="button"
              variant="contained"
              className='sendButton'
              sx={{ ml: 1 }}
              onClick={handleExcluir}
            >
              Excluir
            </Button>
          </Box>
        </form>
      </Box>
    </>
  );
}
