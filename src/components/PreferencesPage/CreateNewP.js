import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

// Form Dialogs inports
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputAdornment from '@material-ui/core/InputAdornment';

//checkbox inports
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const styles = theme => ({
  button: {
    margin: theme.spacing.unit,
  },
  input: {
    display: 'none',
  },
  textField: {
    padding: 15,
    margin: 10,
  },
});

const theme = createMuiTheme({
    palette: {
      primary: {
          main: '#d60e58',
        },
      secondary: {
        main: '#6ec95c',
      },
    },
  });

class CreateNewP extends React.Component {

  state = {
      open: false,
      monday: false,
      tuesday: false,
      wednesday: false,
      thursday: false,
      friday: false,
      saturday: false,
      sunday: false,
          person_id: 0,
          type_name: '',
          start_date: '',
          end_date: '',
          time_duration: '',
          days_out_of_the_week: '',
  };

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.checked });
  //   console.log('what is name?:', name);
  // };

  handleChangePref = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });
    console.log('what is state of input?:', this.state);
    
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ 
      open: false,
      // [name]: event.target.checked
    });
  };

  render() {
    const { classes } = this.props;


  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClickOpen}>
            Create New Preference
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create A New Preference</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create a preference, please enter your info here.
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Preference Type Name"
              type="text"
              fullWidth
              name='type_name'
              value={this.state.type_name}
              onChange={this.handleChangePref}
            />
            <br />
            <TextField
            //  id="datetime-local"
             label="Start Date"
             type="datetime-local"
             defaultValue="2018-11-24T12:30"
             className={classes.textField}
             InputLabelProps={{
             shrink: true,
             }}
             name="start_date"
             value={this.state.start_date}
             onChange={this.handleChangePref}
             />
             <br />
             <TextField
            //  id="datetime-local"
             label="End Date"
             type="datetime-local"
             defaultValue="2018-11-24T12:30"
             className={classes.textField}
             InputLabelProps={{
             shrink: true,
             }}
             name="end_date"
             value={this.state.end_date}
             onChange={this.handleChangePref}
             />
             <br />
             <TextField
              id="filled-adornment-weight"
              className={classes.textField}
              label="Duration (Hours)"
              InputProps={{
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  Hours
                </InputAdornment>
              ),
              }}
              name="time_duration"
              value={this.state.time_duration}
              onChange={this.handleChangePref}
              />
              <TextField
              id="filled-adornment-weight"
              className={classes.textField}
              label="Duration (Minutes)"
              InputProps={{
              endAdornment: (
                <InputAdornment variant="filled" position="end">
                  Minutes
                </InputAdornment>
              ),
              }}
              name="time_duration"
              value={this.state.time_duration}
              onChange={this.handleChangePref}
              />
              <br />

              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Days Out of the Week"
              type="text"
              fullWidth
              name='days_out_of_the_week'
              value={this.state.days_out_of_the_week}
              onChange={this.handleChangePref}
            />
              {/* checkboxes for days of the week */}
              <div>
             {/* <FormControlLabel
                control={
                <Checkbox
                checked={this.state.monday}
                //  onChange={this.handleChange('monday')}
                 value="monday"
                 indeterminate/>}
                label="Monday"
                onChange={this.handleChangePref}
             />
             <br />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.tuesday}
                 onChange={this.handleChange('tuesday')}
                 value="tuesday"
                 indeterminate/>}
                label="Tuesday"
             />
             <br />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.wednesday}
                 onChange={this.handleChange('wednesday')}
                 value="wednesday"
                 indeterminate/>}
                label="Wednesday"
             />
             <br />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.thursday}
                 onChange={this.handleChange('thursday')}
                 value="thursday"
                 indeterminate/>}
                label="Thursday"
             />
             <br />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.friday}
                 onChange={this.handleChange('friday')}
                 value="friday"
                 indeterminate/>}
                label="Friday"
             />
             <br />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.saturday}
                 onChange={this.handleChange('saturday')}
                 value="saturday"
                 indeterminate/>}
                label="Saturday"
             />
             <br />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.sunday}
                 onChange={this.handleChange('sunday')}
                 value="sunday"
                 indeterminate/>}
                label="Sunday"
             /> */}
             </div>
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleClose} color="primary">
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </MuiThemeProvider>
    </div>
  );
  }
}

CreateNewP.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CreateNewP);