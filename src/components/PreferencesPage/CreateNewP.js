import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { connect } from 'react-redux';


// Form Dialogs inports
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

//checkbox inports
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

//setup redux state for global usage of information 
const mapReduxStateToProps = reduxState => ({
  reduxState
});


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
      main: '#54a543',
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
      person_id: this.props.reduxState.user.id,
      type_name: '',
      // start_date: '',
      // end_date: '',
      time_duration: '',
      days_out_of_the_week: '',
  };

  getPreferences = () => {
    //Dispatch action to get the preferences from the server
    //This is picked up by the watcherSaga in index.js
    console.log('getting new prefs');
    this.props.dispatch( { type: 'FETCH_PREF', payload: this.state} );
  }

  componentDidMount = () => {
    this.getPreferences();
  }

  handleChangePref = (event) => {
    event.preventDefault();
    this.setState({ [event.target.name]: event.target.value });    
  };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleCloseCancel = () => {
    this.setState({ 
      open: false,
    });
    console.log('create form was canceled');
  };

  handleCloseSave = () => {
    this.setState({ 
      open: false,
    });
    console.log('create form was saved');
    this.props.dispatch( {type: 'ADD_NEW_PREF', payload: this.state})
    //clear state
    this.setState({
      type_name: '',
      // start_date:'',
      // end_date:'',
      time_duration:'',
      days_out_of_the_week:''
    })
    this.getPreferences();
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
              id="filled-adornment-weight"
              className={classes.textField}
              label="Duration (Ex: '2 hours' or '20 minutes' or '2 hours, 20 minutes)"
              name="time_duration"
              value={this.state.time_duration}
              onChange={this.handleChangePref}
              />
              <br />
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Days Out of the Week (Ex: 'M, W, T, F' or 'M')"
              type="text"
              fullWidth
              name='days_out_of_the_week'
              value={this.state.days_out_of_the_week}
              onChange={this.handleChangePref}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCloseCancel} color="primary">
              Cancel
            </Button>
            <Button onClick={this.handleCloseSave} color="primary">
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

export default connect(mapReduxStateToProps)(withStyles(styles)(CreateNewP));