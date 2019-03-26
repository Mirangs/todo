import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Menu, MenuItem } from '@material-ui/core';


class TableStatusMenu extends Component {
  state = {
    anchorEl: null,
  }

  handleClick = evt => {
    this.setState({ anchorEl: evt.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const { anchorEl } = this.state;
    const { status, current } = this.props;

    return(
      <>
        <Button
          aria-owns={anchorEl ? 'status-menu': undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
        >
          {current}
        </Button>
        <Menu
          id="status-menu"
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={this.handleClose}
        >
          {
            status.map((item, index) => (
              <MenuItem key={index} onClick={this.handleClose}>{item}</MenuItem>
            ))
          }
        </Menu>
      </>
    );
  }
}

TableStatusMenu.propTypes = {
  status: PropTypes.array,
}

export default TableStatusMenu;
