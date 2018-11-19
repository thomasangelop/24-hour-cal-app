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
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleClick = () => {
    console.log('create new preference button was clicked');
    
  }

  render() {
    const { classes } = this.props;


  return (
    <div>
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClick} onClick={this.handleClickOpen}>
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
            />
            <TextField
             id="datetime-local"
             label="Start Date"
             type="datetime-local"
             defaultValue="2018-11-24T12:30"
             className={classes.textField}
             InputLabelProps={{
             shrink: true,
             }}
             />
             <TextField
             id="datetime-local"
             label="End Date"
             type="datetime-local"
             defaultValue="2018-11-24T12:30"
             className={classes.textField}
             InputLabelProps={{
             shrink: true,
             }}
             />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.monday}
                 onChange={this.handleChange('monday')}
                 value="monday"
                 indeterminate/>}
                label="Monday"
             />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.tuesday}
                 onChange={this.handleChange('tuesday')}
                 value="tuesday"
                 indeterminate/>}
                label="Tuesday"
             />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.wednesday}
                 onChange={this.handleChange('wednesday')}
                 value="wednesday"
                 indeterminate/>}
                label="Wednesday"
             />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.thursday}
                 onChange={this.handleChange('thursday')}
                 value="thursday"
                 indeterminate/>}
                label="Thursday"
             />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.friday}
                 onChange={this.handleChange('friday')}
                 value="friday"
                 indeterminate/>}
                label="Friday"
             />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.saturday}
                 onChange={this.handleChange('saturday')}
                 value="saturday"
                 indeterminate/>}
                label="Saturday"
             />
             <FormControlLabel
                control={
                <Checkbox
                checked={this.state.sunday}
                 onChange={this.handleChange('sunday')}
                 value="sunday"
                 indeterminate/>}
                label="Sunday"
             />
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