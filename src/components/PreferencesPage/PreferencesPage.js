import React from 'react';
import CreateNewP from './CreateNewP';
import { connect } from 'react-redux';

//import paper information from material ui
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import IconButton from '@material-ui/core/IconButton';


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


//setup redux state for global usage of information 
const mapReduxStateToProps = reduxState => ({
  reduxState
});

// This is one of our simplest components
// It doesn't have local state, so it can be a function component.
// It doesn't dispatch any redux actions or display any part of redux state
// or even care what the redux state is, so it doesn't need 'connect()'

const styles = theme => ({
  root: {
    ...theme.mixins.gutters(),
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit * 2,
    margin: 30,
  },
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
  extendedIcon: {
    marginRight: theme.spacing.unit,
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

class PreferencesPage extends React.Component {
  state = {
    key: 0,
    open: false,
    monday: false,
    tuesday: false,
    wednesday: false,
    thursday: false,
    friday: false,
    saturday: false,
    sunday: false,
  }
  // when the page loads run this database call
  componentDidMount() {
    this.getPreferences();
  }
  //get the preferences from the database
  getPreferences = () => {
    //Dispatch action to get the preferences from the server
    //This is picked up by the watcherSaga in index.js
    this.props.dispatch( { type: 'FETCH_PREF', payload: this.state} );
  }

  handleChangeFor = key => event => {
    this.setState({
      [key]: event.target.value
    })
    console.log('handle change for key id');
    
  }

  //EDIT button functions: 
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
    
  };

  render() {
    const { classes } = this.props;
    console.log('pref:',this.props.reduxState.pref);
  return(
  <div>
    <h3>Preferences</h3>
    <p>
    Create or delete a new preference type.
    </p>
    <CreateNewP />
    {/* Paper card div */}
    <div>
      {this.props.reduxState.pref.map(preferences => (
          <Paper className={classes.root} elevation={1} key={preferences.id}>
            <Typography variant="h5" component="h3">
             {preferences.type_name}
             </Typography>
             <Typography>
             <p>Type Name: {preferences.type_name}</p>
             </Typography>
             <Typography>
             <p>Start Date: {preferences.start_date}</p>
             </Typography>
             <Typography>
             <p>End Date: {preferences.end_date}</p>
             </Typography>
             <Typography>
             <p>Amount of Time in Hours: {preferences.time_duration.hours}</p>
             </Typography>
             <Typography>
             <p>Amount of Time in Minutes: {preferences.time_duration.minutes}</p>
             </Typography>
             <Typography>
             <p>Days Out of the Week: {preferences.days_out_of_the_week}</p>
             </Typography>
             
             {/* Edit button div below */}
             <div>
              <MuiThemeProvider theme={theme}>
                <Button variant="contained" color="secondary" style={{ cursor: 'pointer' }} className={classes.button} onClick={this.handleClick} onClick={this.handleClickOpen}>
                    Edit
                </Button>
                <Dialog
                  open={this.state.open}
                  onClose={this.handleClose}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Edit Preference</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      To edit a preference, please adjust your info here.
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      id="name"
                      label="Preference Type Name"
                      type="text"
                      fullWidth
                    />
                    <br />
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
                    <br />
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
                    <br />
                    <TextField
                      id="filled-adornment-weight"
                      className={classes.margin}
                      className={classes.textField}
                      label="Duration (Hours)"
                      InputProps={{
                      endAdornment: (
                        <InputAdornment variant="filled" position="end">
                          Hours
                        </InputAdornment>
                      ),
                      }}
                      />
                      <TextField
                      id="filled-adornment-weight"
                      className={classes.margin}
                      className={classes.textField}
                      label="Duration (Minutes)"
                      InputProps={{
                      endAdornment: (
                        <InputAdornment variant="filled" position="end">
                          Minutes
                        </InputAdornment>
                      ),
                      }}
                      />
                      <br />
                    <FormControlLabel
                        control={
                        <Checkbox
                        checked={this.state.monday}
                        onChange={this.handleChange('monday')}
                        value="monday"
                        indeterminate/>}
                        label="Monday"
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
            {/* Delete button div below */}
            <div>
              <MuiThemeProvider theme={theme}>
                <IconButton className={classes.button} aria-label="Delete">
                <DeleteIcon />
                </IconButton>
              </MuiThemeProvider>
            </div>
          </Paper>
      )
      )}
    </div>
  </div>
  )
  }
}

PreferencesPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(PreferencesPage));
