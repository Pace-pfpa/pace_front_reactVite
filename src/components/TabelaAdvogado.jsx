import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination } from '@mui/material';

export const TabelaCadastroAdvogado = ({ data, selected = [], onRowClick = () => {} }) => {
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const isSelected = (nomeAdvogado) => selected.indexOf(nomeAdvogado) !== -1;

  return (
    <Paper>
      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Nome</TableCell>
              <TableCell align="right">Número OAB</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {
              const isItemSelected = isSelected(row.nomeAdvogado);
              return (
                <TableRow
                  key={row.nomeAdvogado}
                  hover
                  onClick={() => onRowClick(row)}
                  selected={isItemSelected}
                  sx={{ cursor: 'pointer', backgroundColor: isItemSelected ? 'rgba(0, 0, 0, 0.08)' : 'inherit' }}
                >
                  <TableCell component="th" scope="row">{row.nomeAdvogado}</TableCell>
                  <TableCell align="right">{row.numeroOAB}</TableCell>
                </TableRow>
              );
            })}
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
