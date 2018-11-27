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
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


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
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  formControl: {
    margin: theme.spacing.unit,
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing.unit * 2,
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

class NewEventButton extends React.Component {

  state = {
      open: false,
      person_id: this.props.reduxState.user.id,
      startMonth:'',
      startDay:'',
      startYear:'',
      startHour:'',
      startMinute:'',
      startAMPM:'',
      endMonth:'',
      endDay:'',
      endYear:'',
      endHour:'',
      endMinute:'',
      endAMPM:'',
      title:'',
      description:'',
      location:'',
      color:'ffffff'
  };

  

  //get the events from the database
  getEvent = () => {
    //Dispatch action to get the events from the server
    //This is picked up by the watcherSaga in index.js
    this.props.dispatch( { type: 'FETCH_EVENT', payload: this.state} );
   }

  handleChangeNewEvent = (event) => {
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
    console.log('create form was saved', this.state);
    this.props.dispatch( {type: 'ADD_NEW_ONE_TIME_EVENT', payload: this.state})
    //clear state
    this.setState({
      startMonth:'',
      startDay:'',
      startYear:'',
      startHour:'',
      startMinute:'',
      startAMPM:'',
      endMonth:'',
      endDay:'',
      endYear:'',
      endHour:'',
      endMinute:'',
      endAMPM:'',
      title:'',
      description:'',
      location:'',
      color:'ffffff'
    });
    this.getEvent();
  };

  render() {
    const { classes } = this.props;


  return (
    <div className={classes.root}>
      <MuiThemeProvider theme={theme}>
        <Button variant="contained" color="primary" className={classes.button} onClick={this.handleClickOpen}>
            Create New One Time Event
        </Button>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle id="form-dialog-title">Create A New One Time Event</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create an event, please enter your info here.
            </DialogContentText>
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Title"
              type="text"
              fullWidth
              name='title'
              value={this.state.title}
              onChange={this.handleChangeNewEvent}
              />
              <br />
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Description"
              type="text"
              fullWidth
              name='description'
              value={this.state.description}
              onChange={this.handleChangeNewEvent}
              />
              <br />
              <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Location"
              type="text"
              fullWidth
              name='location'
              value={this.state.location}
              onChange={this.handleChangeNewEvent}
              />
              <br />
              <br />
              <br />
              <DialogContentText>
              Enter Start Date and Time
              </DialogContentText>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Month</InputLabel>
              <Select
              native
              name="startMonth"
              value={this.state.startMonth}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Day</InputLabel>
              <Select
              native
              name="startDay"
              value={this.state.startDay}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
              <option value={30}>30</option>
              <option value={31}>31</option>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Year</InputLabel>
              <Select
              native
              name="startYear"
              value={this.state.startYear}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={2018}>2018</option>
              <option value={2019}>2019</option>
              </Select>
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Hour</InputLabel>
              <Select
              native
              name="startHour"
              value={this.state.startHour}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Minute</InputLabel>
              <Select
              native
              name="startMinute"
              value={this.state.startMinute}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={0}>00</option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">AM/PM</InputLabel>
              <Select
              native
              name="startAMPM"
              value={this.state.startAMPM}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={'AM'}>AM</option>
              <option value={'PM'}>PM</option>
              </Select>
              </FormControl>
              <br />
              <br />
              <br />
              <DialogContentText>
              Enter End Date and Time
              </DialogContentText>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Month</InputLabel>
              <Select
              native
              name="endMonth"
              value={this.state.endMonth}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={1}>January</option>
              <option value={2}>February</option>
              <option value={3}>March</option>
              <option value={4}>April</option>
              <option value={5}>May</option>
              <option value={6}>June</option>
              <option value={7}>July</option>
              <option value={8}>August</option>
              <option value={9}>September</option>
              <option value={10}>October</option>
              <option value={11}>November</option>
              <option value={12}>December</option>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Day</InputLabel>
              <Select
              native
              name="endDay"
              value={this.state.endDay}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              <option value={13}>13</option>
              <option value={14}>14</option>
              <option value={15}>15</option>
              <option value={16}>16</option>
              <option value={17}>17</option>
              <option value={18}>18</option>
              <option value={19}>19</option>
              <option value={20}>20</option>
              <option value={21}>21</option>
              <option value={22}>22</option>
              <option value={23}>23</option>
              <option value={24}>24</option>
              <option value={25}>25</option>
              <option value={26}>26</option>
              <option value={27}>27</option>
              <option value={28}>28</option>
              <option value={29}>29</option>
              <option value={30}>30</option>
              <option value={31}>31</option>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Year</InputLabel>
              <Select
              native
              name="endYear"
              value={this.state.endYear}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={2018}>2018</option>
              <option value={2019}>2019</option>
              </Select>
              </FormControl>
              <br />
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Hour</InputLabel>
              <Select
              native
              name="endHour"
              value={this.state.endHour}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
              <option value={6}>6</option>
              <option value={7}>7</option>
              <option value={8}>8</option>
              <option value={9}>9</option>
              <option value={10}>10</option>
              <option value={11}>11</option>
              <option value={12}>12</option>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">Minute</InputLabel>
              <Select
              native
              name="endMinute"
              value={this.state.endMinute}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={0}>00</option>
              <option value={15}>15</option>
              <option value={30}>30</option>
              <option value={45}>45</option>
              </Select>
              </FormControl>
              <FormControl className={classes.formControl}>
              <InputLabel htmlFor="age-native-simple">AM/PM</InputLabel>
              <Select
              native
              name="endAMPM"
              value={this.state.endAMPM}
              onChange={this.handleChangeNewEvent}
              >
              <option value='' />
              <option value={'AM'}>AM</option>
              <option value={'PM'}>PM</option>
              </Select>
              </FormControl>
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

NewEventButton.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default connect(mapReduxStateToProps)(withStyles(styles)(NewEventButton));