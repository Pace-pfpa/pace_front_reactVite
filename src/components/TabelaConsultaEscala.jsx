import React from 'react';
import PropTypes from 'prop-types';
import TableSortLabel from '@mui/material/TableSortLabel';
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TablePagination, Paper, Checkbox } from '@mui/material';
import { format, parseISO } from 'date-fns';
import { ptBR } from 'date-fns/locale';

const headCells = [
  { id: 'data', numeric: false, disablePadding: false, label: 'Data' },
  { id: 'hora', numeric: false, disablePadding: false, label: 'Hora' },
  { id: 'turno', numeric: false, disablePadding: false, label: 'Turno'},
  { id: 'processo', numeric: false, disablePadding: false, label: 'Processo' },
  // { id: 'tipo', numeric: false, disablePadding: false, label: 'Contestação' },
  { id: 'orgao_julgador', numeric: false, disablePadding: false, label: 'Órgão Julgador' },
  { id: 'partes', numeric: false, disablePadding: false, label: 'Partes' },
  { id: 'sala', numeric: false, disablePadding: false, label: 'Sala' },
  { id: 'situacao', numeric: false, disablePadding: false, label: 'Situação' },
];

export const TabelaEscalaAvaliar = ({ data }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('data');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [selected, setSelected] = React.useState([]);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const formatDate = (dateString) => {
    const date = parseISO(dateString);


    if (isNaN(date.getTime())) {
      return dateString;
    }
    return format(date, 'dd/MM/yyyy', { locale: ptBR });
  };

  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = data.map((row) => row.id);
      console.log("aaaa1",newSelected)
      setSelected(newSelected);
      return;
    }
    console.log("aaaa2")
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
      console.log("newSelected primeiro if", newSelected)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
      console.log("newSelected segundo if", newSelected)
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
      console.log("newSelected terceiro if", newSelected)
    } else if (selectedIndex > 0) {
      console.log("newSelected quarto if", newSelected)
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }
    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table sx={{ minWidth: 750 }}>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                    inputProps={{ 'aria-label': 'select all rows' }}
                  />
                </TableCell>
                {headCells.map((headCell) => (
                  <TableCell
                    key={headCell.id}
                    align={headCell.numeric ? 'right' : 'left'}
                    padding={headCell.disablePadding ? 'none' : 'normal'}
                    sortDirection={orderBy === headCell.id ? order : false}
                  >
                    <TableSortLabel
                      active={orderBy === headCell.id}
                      direction={orderBy === headCell.id ? order : 'asc'}
                      onClick={(event) => handleRequestSort(event, headCell.id)}
                    >
                      {headCell.label}
                    </TableSortLabel>
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, index) => {
                const isItemSelected = isSelected(row.id);
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    onClick={(event) => handleClick(event, row.id)}
                    role="checkbox"
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                    sx={{ cursor: 'pointer' }}
                  >
                    <TableCell padding="checkbox">
                      <Checkbox
                        color="primary"
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    <TableCell>{formatDate(row.data)}</TableCell>
                    <TableCell>{row.hora}</TableCell>
                    <TableCell>{row.turno}</TableCell>
                    <TableCell>{row.processo}</TableCell>
                    {/* <TableCell>{row.tipo}</TableCell> */}
                    <TableCell>{row.orgao_julgador}</TableCell>
                    <TableCell>{row.partes}</TableCell>
                    <TableCell>{row.sala}</TableCell>
                    <TableCell>{row.situacao}</TableCell>
                  </TableRow>
                );
              })}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={headCells.length + 1} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Paper>
    </Box>
  );
};

TabelaEscalaAvaliar.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TabelaEscalaAvaliar;
