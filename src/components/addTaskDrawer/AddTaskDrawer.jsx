import React, { Component } from 'react';
import { Button, Drawer } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import SidePanel from '../sidePanel/SidePanel';

const styles = {
  list: {
    width: 250,
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
          onClose={this.toggleDrawer(false)}
        >
          <SidePanel 
            className={classes.list}
          />
        </Drawer>
      </>
    )
  }
}

export default withStyles(styles)(AddTaskDrawer);
