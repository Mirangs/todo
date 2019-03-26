import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import TodoTable from '../todoTable/TodoTable';
import AddTaskDrawer from '../addTaskDrawer/AddTaskDrawer';

import { rows } from '../todoTable/TodoTable';

class App extends Component {
  state = {
    isDrawerOpened: false,
  }

  handleAddButtonClick = () => {

  }

  render() {
    return (
      <>
        <Typography 
          variant="h1" 
          color="textPrimary" 
          align="center" 
          gutterBottom
        >
          Список задач
        </Typography>

        <AddTaskDrawer
          name={rows[0].name}
          descr={rows[0].descr}
          date={rows[0].date}
          priority={rows[0].priority}
          status={rows[0].status}
          tag={rows[0].tag}
        />

        <TodoTable />
      </>
    );
  }
}

export default App;
