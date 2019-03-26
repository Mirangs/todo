import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, FormControl, Paper } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import TaskAutoComplete from '../taskAutocomplete/TaskAutoComplete';

const styles = theme => ({
  header: {
    paddingTop: 25,
    color: theme.palette.common.white,
  },
  footer: {
    top: 'auto',
    bottom: 0,
    display: 'flex',
    justifyContent: 'space-around',
  },
  main: {
    padding: '20px',
    paddingBottom: '75px',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '300px',
  }
});

class SidePanel extends Component {
  state = {
    selectedDate: new Date(),
  }

  // handleChange = name => evt => {
  //   this.setState({ [name]: evt.target.value });
  // }

  render() {
    const { classes } = this.props;
    const { selectedDate } = this.state;

    return (
      <>
        <AppBar
          position="static"
        >
        <Toolbar>
          <Typography 
            variant="h2" 
            color="textSecondary"
            gutterBottom
            className={classes.header}
            margin="normal"
          >
            Новая задача
          </Typography>
        </Toolbar>
        </AppBar>
  
        <Paper
          className={classes.main}
        >
          <TextField
            id="task-name"
            label="Название задачи"
            //value={this.state.name}
            //onChange={this.handleChange('name')}
            margin="normal"
            fullWidth
          />

          <TextField
            id="task-descr"
            label="Описание задачи"
            multiline
            margin="normal"
            fullWidth
          />

          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <DatePicker
              margin="normal"
              label="Дата выполнения"
              value={selectedDate}
              fullWidth
            />
          </MuiPickersUtilsProvider>

          <RadioGroup
            aria-label="приоритет"
            name="priority"
          >
            <FormControlLabel 
              value="urgent-important"
              control={<Radio />}
              label="Срочная важная задача"
            />

            <FormControlLabel 
              value="urgent-not-important"
              control={<Radio />}
              label="Срочная не важна задача"
            />

            <FormControlLabel 
              value="not-urgent-important"
              control={<Radio />}
              label="Не срочная важная задача"
            />

            <FormControlLabel 
              value="not-urgent-not-important"
              control={<Radio />}
              label="Не срочная не важная задача"
            />
          </RadioGroup>

          <FormControl>
            <InputLabel htmlFor="status-select">Статус выполнения</InputLabel>
            <Select 
              className={classes.formControl}
              inputProps={{
                name: 'status',
                id: 'status-select'
              }}
            >
              <MenuItem value="1" select>Выполняется</MenuItem>
              <MenuItem value="2">На потом</MenuItem>
              <MenuItem value="3">Выполнена</MenuItem>
            </Select>
          </FormControl>

          <TaskAutoComplete />

        </Paper>
  
        <AppBar 
          position="fixed"
          className={classes.footer}
        >
          <Toolbar>
            <Button
              variant="contained"
              color="secondary"
            >
              Сохранить
            </Button>
    
            <Button
              variant="contained"
              style={{marginLeft: 'auto'}}
            >
              Отменить
            </Button>
          </Toolbar>
        </AppBar>
      </>
    )
  }
}

export default withStyles(styles)(SidePanel);
