import React, { Component } from 'react';
import { Typography, Button } from '@material-ui/core';
import TodoTable from '../todoTable/TodoTable';

class App extends Component {
  render() {
    return (
      <>
        <Typography variant="h1" color="textPrimary" align="center" gutterBottom>
          Список задач
        </Typography>

        <Button variant="contained" color="primary">
          Добавить новую задачу
        </Button>

        <TodoTable />
      </>
    );
  }
}

export default App;
