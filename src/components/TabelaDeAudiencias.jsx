import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

export const TabelaDeAudiencias = ({ data, enableRowSelection, selected = [], onRowClick }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleRowClick = (row) => {
    if (enableRowSelection && onRowClick) {
      onRowClick(row);
    }
  };

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Data</TableCell>
              <TableCell align="left">Hora</TableCell>
              <TableCell align="right">Turno</TableCell>
              <TableCell align="right">Sala</TableCell>
              <TableCell align="right">Vara</TableCell>
              <TableCell align="right">Nome da Parte</TableCell>
              <TableCell align="right">Status Tarefa Sapiens</TableCell>
              <TableCell align="right">Objeto</TableCell>
              <TableCell align="right">Pautista</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => (
              <TableRow
                key={row.nome}
                onClick={() => handleRowClick(row)}
                sx={{
                  cursor: enableRowSelection ? 'pointer' : 'default',
                  backgroundColor: selected.includes(row.nome) ? '#d3d3d3' : 'inherit',
                  color: selected.includes(row.nome) ? '#fff' : 'inherit',
                }}
              >
                <TableCell component="th" scope="row">{row.nome}</TableCell>
                <TableCell align="left">{row.grupoPautista}</TableCell>
                <TableCell align="left">{row.turnoPautista}</TableCell>
                <TableCell align="right">{row.statusPautista}</TableCell>
                <TableCell align="right">{row.dataInicial}</TableCell>
                <TableCell align="right">{row.dataFinal}</TableCell>
                <TableCell align="right">{row.saldo}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
};
