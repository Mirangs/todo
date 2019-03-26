import React from 'react';

import { withStyles } from '@material-ui/core/styles';
import { Fab, Icon } from '@material-ui/core';

const styles = theme => ({
  fab: {
    margin: theme.spacing.unit,
  },
});


const EditButton = ({ classes }) => {
  return (
    <Fab 
      color="primary" 
      aria-label="Edit" 
      className={classes.fab}
      size="small"
      >
        <Icon fontSize="small">delete_icon</Icon>
    </Fab>
  )
}

export default withStyles(styles)(EditButton);