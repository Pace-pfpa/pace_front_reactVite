import React, { useEffect, useState } from "react";
import { Box, Typography, TextField, MenuItem, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
import { api_axios_getMutirao } from "../API/api_axios_getMutirao";
import Swal from "sweetalert2";

const grupoOptions = [
    { value: 'TODOS', label: 'Todos' },
    { value: 'PREPOSTO', label: 'Preposto' },
    { value: 'PROCURADOR', label: 'Procurador' }
];

export const EscalaGerar = () => {
    const [formValues, setFormValues] = useState([]);
    const [vara, setVara] = useState("");

    const listarVaras =  (mutiraoDatabase) => {
      let varasSemEscala = [];
      console.log(varasSemEscala)
        mutiraoDatabase.forEach(obj => {
            if(obj.status === "SEM_ESCALA"){
              if(varasSemEscala.indexOf(obj.vara) === -1){
                varasSemEscala.push(obj)
              }
            }
        });

        setFormValues(varasSemEscala)
    }

      useEffect(() => {
        const varaForms = formValues
        console.log("o",formValues)
        if (varaForms.length > 0){
          
        }
     

      },[vara])




    useEffect(() => {
        const mutirao =  (async() => {
          try{
            const response = await api_axios_getMutirao();
            listarVaras(response);

          }catch(error){
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

        });

        mutirao();
    },[])

    const teste = (value)=> {
      console.log(value)
    }

    const limparCampos = () => {
        setFormValues({
          nome: '',
          grupo: 'preposto',
          status: 'ATIVO',
          dataInicial: '',
          dataFinal: '',
        });
    };
    return (
        <>
          <Typography variant="h5" component="div" sx={{ mb: 3 }}>
            Gerar Escala
          </Typography>

          <Box sx={{ maxWidth: '600px' }}>
            <form>
              <div>
                <TextField
                  id="vara"
                  name="vara"
                  select
                  label="Vara"
                  value={vara}
                  sx={{ width: '100%', mb: 2 }}
                  onChange={(e) => setVara(e.target.value)}
                  required
                >
                  {formValues.map((item, index) => (
                    <MenuItem key={index} value={item.vara}> {item.vara} </MenuItem>
                  ))}
                </TextField>
              </div>

              <div>
                <TextField
                  id="periodoMutirao"
                  name="periodoMutirao"
                  select
                  label="Período do Mutirão"
                  sx={{ width: '100%', mb: 2 }}
                  required
                ></TextField>
              </div>

              <div>
                <TextField
                    id="grupo"
                    name="grupo"
                    select
                    label="Grupo"
                    // value={formValues.status}
                    sx={{ width: '100%', mb: 2 }}
                    // onChange={(e) => setFormValues({ ...formValues, status: e.target.value })}
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
                  className='sendButton' sx={{ ml: 1  }}>
                  Cadastrar
                </Button>
              </Box>
            </form>
            </Box>
        </>
    )
}