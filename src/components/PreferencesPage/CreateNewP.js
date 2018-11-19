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
            <TextField
              margin="dense"
              id="name"
              label="Days Of The Week"
              type="email"
              fullWidth
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