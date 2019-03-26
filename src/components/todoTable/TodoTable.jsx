import React from 'react';
import { Table, withStyles, TableCell, Paper, TableHead, TableBody, TableRow } from '@material-ui/core';

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing.unit * 3,
    overflowX: 'auto',
  },
  table: {
    minWidth: 700,
  },
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
});

const STATUS = {
  IN_PROGRESS: 'Выполняется',
  LATER: 'На потом',
  COMPLETED: 'Выполнена',
}

const PRIORITY = {
  URGENT_IMPORTANT: 'Срочная важная задача',
  URGENT_NOT_IMPORTANT: 'Срочная не важная задача',
  NOT_URGENT_IMPORTANT: 'Не срочная важная задача',
  NOT_URGENT_NOT_IMPORTANT: 'Не срочная не важная задача',
}

let id = 0;
function createData(status, name, descr, date, priority, tag) {
  id += 1;
  return { id, status, name, descr, date, priority, tag };
}

const rows = [
  createData(STATUS.IN_PROGRESS, 'Изучить React', 'Изучить React, Redux, React Router и тд.', '25.03.19', PRIORITY.URGENT_IMPORTANT, 'тег0'),
  createData(STATUS.COMPLETED, 'Изучить JS', 'Изучить основы JS', '25.03.19', PRIORITY.URGENT_IMPORTANT, 'тег1'),
];


const TodoTable = (props) => {
  const { classes } = props;

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <CustomTableCell>Id задачи</CustomTableCell>
            <CustomTableCell align="right">Статус</CustomTableCell>
            <CustomTableCell align="right">Название задачи</CustomTableCell>
            <CustomTableCell align="right">Описание задачи</CustomTableCell>
            <CustomTableCell align="right">Дата выполнения</CustomTableCell>
            <CustomTableCell align="right">Важность</CustomTableCell>
            <CustomTableCell align="right">Тег</CustomTableCell>
            <CustomTableCell align="right">Действие</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow className={classes.row} key={row.id}>
              <CustomTableCell>{row.id}</CustomTableCell>
              <CustomTableCell align="right">{row.status}</CustomTableCell>
              <CustomTableCell align="right">{row.name}</CustomTableCell>
              <CustomTableCell align="right">{row.descr}</CustomTableCell>
              <CustomTableCell align="right">{row.date}</CustomTableCell>
              <CustomTableCell align="right">{row.priority}</CustomTableCell>
              <CustomTableCell align="right">{row.tag}</CustomTableCell>
              <CustomTableCell align="right">Действие</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
}

export default withStyles(styles)(TodoTable);
