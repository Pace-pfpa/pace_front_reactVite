import React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel, TablePagination, Checkbox, Paper, Box } from '@mui/material';
import { format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';

export const TabelaEscalaAvaliar = ({ data, selected, setSelected }) => {
  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('data');
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

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
      const newSelected = data.map((row) => row.processo); // Use `processo` como identificador
      setSelected(newSelected);
      return;
    }
    setSelected([]);
  };

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const isSelected = (id) => selected.indexOf(id) !== -1;

  return (
    <Box sx={{ width: '100%', mt: 2 }}>
      <Paper sx={{ width: '100%', mb: 2 }}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    color="primary"
                    indeterminate={selected.length > 0 && selected.length < data.length}
                    checked={data.length > 0 && selected.length === data.length}
                    onChange={handleSelectAllClick}
                  />
                </TableCell>
                <TableCell>
                  <TableSortLabel
                    active={orderBy === 'data'}
                    direction={orderBy === 'data' ? order : 'asc'}
                    onClick={(event) => handleRequestSort(event, 'data')}
                  >
                    Data
                  </TableSortLabel>
                </TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Turno</TableCell>
                <TableCell>Processo</TableCell> {/* Ajuste de `processo` */}
                <TableCell>Órgão Julgador</TableCell>
                <TableCell>Partes</TableCell>
                <TableCell>Classe</TableCell>
                <TableCell>Tipo de Audiência</TableCell>
                <TableCell>Sala</TableCell>
                <TableCell>Situação</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {stableSort(data, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row.processo); // Ajuste de `processo`
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row.processo)} // Ajuste de `processo`
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      key={row.processo} // Ajuste de `processo`
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell component="th" id={labelId} scope="row">
                        {formatDate(row.data)}
                      </TableCell>
                      <TableCell>{row.hora}</TableCell>
                      <TableCell>{row.turno}</TableCell>
                      <TableCell>{row.processo}</TableCell> {/* Ajuste de `processo` */}
                      <TableCell>{row.orgao_julgador}</TableCell>
                      <TableCell>{row.partes}</TableCell>
                      <TableCell>{row.classe}</TableCell>
                      <TableCell>{row.tipo_audiencia}</TableCell>
                      <TableCell>{row.sala}</TableCell>
                      <TableCell>{row.situacao}</TableCell>
                    </TableRow>
                  );
                })}
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

const stableSort = (array, comparator) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
};

const getComparator = (order, orderBy) => {
  return (a, b) => {
    if (b[orderBy] < a[orderBy]) {
      return order === 'desc' ? -1 : 1;
    }
    if (b[orderBy] > a[orderBy]) {
      return order === 'desc' ? 1 : -1;
    }
    return 0;
  };
};

export default TabelaEscalaAvaliar;