import React, { Component } from 'react';
import { Table, withStyles, TableCell, Paper, TableHead, TableBody, TableRow } from '@material-ui/core';

import TableStatusMenu from '../TableStatusMenu/TableStatusMenu';
import EditButton from '../editButton/EditButton';
import DeleteButton from '../deleteButton/DeleteButton';

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
  actions: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    height: '100%',
  },
});

const STATUS = {
  IN_PROGRESS: 'Выполняется',
  LATER: 'На потом',
  COMPLETED: 'Выполнена',
};

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

export const rows = [
  createData(STATUS.IN_PROGRESS, 'Изучить React', 'Изучить React, Redux, React Router и тд.', '25.03.19', PRIORITY.URGENT_IMPORTANT, 'тег0'),
  createData(STATUS.COMPLETED, 'Изучить JS', 'Изучить основы JS', '25.03.19', PRIORITY.URGENT_IMPORTANT, 'тег1'),
];

class TodoTable extends Component {
  state = {
    isHovering: false,
  }

  handleRowMouseEnter = () => {
    this.setState({
      isHovering: true,
    });
  }

  handleRowMouseLeave = () => {
    this.setState({
      isHovering: false,
    });
  }

  render() {
    const { classes } = this.props;
    const { isHovering } = this.state;

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
              <TableRow 
                className={classes.row} 
                key={row.id} 
                hover 
                onMouseEnter={this.handleRowMouseEnter}
                onMouseLeave={this.handleRowMouseLeave}
              >
                <CustomTableCell>{row.id}</CustomTableCell>
                <CustomTableCell align="right">
                  <TableStatusMenu 
                    status={Object.values(STATUS)} 
                    current={row.status} 
                  />
                </CustomTableCell>
                <CustomTableCell align="right">{row.name}</CustomTableCell>
                <CustomTableCell align="right">{row.descr}</CustomTableCell>
                <CustomTableCell align="right">{row.date}</CustomTableCell>
                <CustomTableCell align="right">{row.priority}</CustomTableCell>
                <CustomTableCell align="right">{row.tag}</CustomTableCell>
                <CustomTableCell className={classes.actions}>
                  {
                    isHovering
                    &&
                    <>
                      <EditButton />
                      <DeleteButton />
                    </>
                  }
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default withStyles(styles)(TodoTable);
