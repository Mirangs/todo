import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Button, TextField, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel, FormControl, Paper, CircularProgress, InputAdornment } from '@material-ui/core';
import { MuiPickersUtilsProvider, DatePicker } from 'material-ui-pickers';
import DateFnsUtils from '@date-io/date-fns';
import { withStyles } from '@material-ui/core/styles';
import TaskAutoComplete from '../taskAutocomplete/TaskAutoComplete';
import classNames from 'classnames';
import green from '@material-ui/core/colors/green';
import { DateRange, Note, Description } from '@material-ui/icons';

import CancelSnackbar from '../cancelSnackbar/CancelSnackbar';

const styles = theme => ({
  header: {
    paddingTop: 25,
    color: theme.palette.common.white,
  },
  footer: {
    top: 'auto',
    bottom: 0,
  },
  main: {
    padding: '20px',
    paddingBottom: '75px',
    minHeight: '85vh',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: '300px',
  },
  list: {
    width: 450,
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -12,
    marginLeft: -12,
  },
});

class SidePanel extends Component {
  state = {
    id: '',
    name: '',
    descr: '',
    priority: '',
    tag: '',
    selectedDate: null,
    isStatusOpened: false,
    status: 1,
    loading: false,
    success: false,
    snackbarOpen: false,
  }

  componentWillUnmount() {
    clearTimeout(this.timer);
  }  

  handleChange = name => evt => {
    this.setState({ [name]: evt.target.value });
  }

  handleDateChange = date => {
    this.setState({
      selectedDate: date,
      isStatusOpened: true,
    });
  }

  handleSaveClick = () => {
    const { id, name,  status, priority, selectedDate, descr, tag } = this.state;

    if (!this.state.loading) {
      this.setState(
        {
        success: false,
        loading: true,
      },
      () => {
        this.timer = setTimeout(() => {
          this.props.addTask(
            id,
            name,
            descr,
            status,
            priority,
            selectedDate,
            tag
          );
          this.setState({
            loading: false,
            success: true,
          })
        }, 2000)
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { selectedDate, isStatusOpened, loading, success } = this.state;
    const buttonClassname = classNames({
      [classes.buttonSuccess]: success,
    });

    return (
      <div className={classes.list}>
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
  
        <form onSubmit={this.handleSubmit}>
          <Paper
            className={classes.main}
          >
            <TextField
              required
              id="task-name"
              label="Название задачи"
              value={this.state.name}
              onChange={this.handleChange('name')}
              margin="normal"
              fullWidth
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Note />
                    </InputAdornment>
                  )
                }}
            />

            <TextField
              id="task-descr"
              label="Описание задачи"
              multiline
              margin="normal"
              fullWidth
              onChange={this.handleChange('descr')}
              InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Description />
                    </InputAdornment>
                  )
                }}
            />      

            <MuiPickersUtilsProvider utils={DateFnsUtils}>
              <DatePicker
                margin="normal"
                label="Дата выполнения"
                value={selectedDate}
                onChange={this.handleDateChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <DateRange />
                    </InputAdornment>
                  )
                }}
              />
            </MuiPickersUtilsProvider>

            {
              isStatusOpened
              && 
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
            }

            <FormControl>
              <InputLabel htmlFor="status-select">Статус выполнения</InputLabel>
              <Select 
                className={classes.formControl}
                value={this.state.status}
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

            <TaskAutoComplete onChange={this.handleChange('tag')}/>

          </Paper>
  
        <AppBar 
          position="fixed"
          className={classes.footer}
        >
          <Toolbar>
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              className={buttonClassname}
              disabled={loading}
              onClick={this.handleSaveClick}
            >
              Сохранить
            </Button>
            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
    
            <Button
              variant="contained"
              style={{marginLeft: 'auto'}}
              onClick={this.props.handleClose}
            >
              Отменить
            </Button>

          </Toolbar>
        </AppBar>

        </form>
        <CancelSnackbar
          open={this.state.snackbarOpen}
          handleSnackbarClose={this.handleSnackbarClose}
        />
      </div>
    )
  }
}

export default withStyles(styles)(SidePanel);
