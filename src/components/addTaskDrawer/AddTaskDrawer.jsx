import React, { Component } from 'react';
import { Button, Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';
import CancelSnackbar from '../cancelSnackbar/CancelSnackbar';

import SidePanel from '../sidePanel/SidePanel';

const styles = {
  list: {
    width: 200,
  },
};

class AddTaskDrawer extends Component {
  state = {
    isOpened: false,
  }

  toggleDrawer = (open) => (evt) => {
    this.setState({
      isOpened: open,
    });
  }

  handleClose = () => {
    const { name, descr, selectedDate, priority, tag } = this.state;
    this.setState({
      isOpened: false,
    });

    if (!name && !descr && !selectedDate && !priority && !tag) {
      this.setState({
        snackbarOpen: true,
      });
    }
  }

  handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    this.setState({ snackbarOpen: false });
  };

  render() {
    const { classes } = this.props;

    return (
      <>
        <Button 
            variant="contained" 
            color="primary"
            onClick={this.toggleDrawer(true)}
          >
            Добавить новую задачу
        </Button>
        <Drawer
          open={this.state.isOpened}
          onClose={this.handleClose}
        >
          <SidePanel 
            className={classes.list}
            handleClose={this.handleClose}
            addTask={this.props.addTask}
          />
        </Drawer>
      </>
    )
  }
}

export default withStyles(styles)(AddTaskDrawer);
