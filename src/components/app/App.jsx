import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

import TodoTable from '../todoTable/TodoTable';
import AddTaskDrawer from '../addTaskDrawer/AddTaskDrawer';

let id = 0;

class App extends Component {
  state = {
    isDrawerOpened: false,
    tasks: [],
  }

  addTask = (name, descr, status, priority, date, tag) => {
    this.state.tasks.push({
      id,
      name,
      descr,
      status,
      priority,
      date,
      tag
    });
    id++;
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
          tasks={this.state.tasks}
          addTask={this.addTask}
        />

        <TodoTable tasks={this.state.tasks}/>
      </>
    );
  }
}

export default App;
