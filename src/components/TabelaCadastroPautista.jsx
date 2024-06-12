import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';

const TabelaPautista = ({ data }) => {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell align="right">Grupo</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Data Inicial</TableCell>
            <TableCell align="right">Data Final</TableCell>
            <TableCell align="right">Saldo</TableCell>
            <TableCell align="right">Peso</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.nome}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">{row.nome}</TableCell>
              <TableCell align="right">{row.grupo}</TableCell>
              <TableCell align="right">{row.status}</TableCell>
              <TableCell align="right">{row.data_inicial}</TableCell> {/* Certifique-se de usar a propriedade correta */}
              <TableCell align="right">{row.data_final}</TableCell> {/* Certifique-se de usar a propriedade correta */}
              <TableCell align="right">{row.saldo}</TableCell>
              <TableCell align="right">{row.peso}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TabelaPautista;
