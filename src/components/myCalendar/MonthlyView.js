import React from 'react';
import {connect} from 'react-redux';
import NewEventButton from './NewEventButton';
import PropTypes from 'prop-types';
import axios from 'axios';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

/* import Mobiscroll JS and CSS */
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';

//setup redux state for global usage of information 
const mapReduxStateToProps = reduxState => ({
    reduxState
  });

  const styles = theme => ({
    root: {
      flexGrow: 1,
      maxWidth: 600,
      padding: theme.spacing.unit * 2,
      margin: theme.spacing.unit * 4,
    },
    icon: {
      color: theme.palette.text.primary,
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
      formControl: {
        margin: theme.spacing.unit,
        minWidth: 120,
      },
      selectEmpty: {
        marginTop: theme.spacing.unit * 2,
      },
      paper: {
        ...theme.mixins.gutters(),
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
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

class MonthlyView extends React.Component {
    state = {
        person_id: this.props.reduxState.user.id,
        events: [
            {
            start: new Date('2018-11-26 12:00:00-06'),
            end: new Date('2018-11-26 13:00:00-06'),
            text: 'Lunch at Prime',
            color: '#ffffff'
            }, 
        ],
        openClick: false,
        openEdit: false,
        color: "ffffff",
        days_out_of_the_week: '',
        end: '',
        id: 0,
        person_id: 0,
        pref_type_name: '',
        start: '',
        text: '',
        title:'', 
        description:'',
        location:'',
    };

     // when the page loads run this database call
     componentDidMount() {
        this.getEvent();
      }
      //get the preferences from the database
      getEvent = () => {
       //Dispatch action to get the preferences from the server
       //This is picked up by the watcherSaga in index.js
       this.props.dispatch( { type: 'FETCH_EVENT', payload: this.state} );
      }

      handleChangeNewEvent = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });    
      };

      onEventSelect = (event, inst) => {
        console.log('an event was clicked. event:', event, 'inst:', inst);
        console.log('what is the event', event.event);
        this.setState({ 
            openClick: true, 
            color: event.event.color,
            days_out_of_the_week: event.event.days_out_of_the_week,
            end: event.event.end,
            id: event.event.id,
            person_id: event.event.person_id,
            pref_type_name: event.event.pref_type_name,
            start: event.event.start,
            text: event.event.text,
            title: event.event.title,
            description: event.event.description,
            location: event.event.location,
            });
        console.log('what is new state?:', this.state);
        
        }
    
        handleCancel = () => {
            this.setState({ openClick: false });
        };

        handleSave = () => {
            this.setState({ openClick: false });
        };

        handleRemove = (id) => {
            console.log('deleting event', id);
            axios({
              method: 'DELETE',
              url: `/api/deleteevent/${id}`
            })
            .then( (response) => {
              this.getEvent();
              console.log(`deleted event: ${id} successfully`);
            })
            .catch( (error) => {
              console.log(`error deleting event: ${id}`);
            });
            this.setState({ openClick: false });
          }

          handleEdit = (id) => {
            console.log('handle edit cliked for id:', id);
            
        }
  
        handleCloseCancel = () => {
          this.setState({ 
            openEdit: false,
          });
          console.log('edit form was canceled');
        };
      
        handleCloseSave = () => {
          this.setState({ 
            openEdit: false,
          });
          console.log('edit form was saved', this.state);
          // this.props.dispatch( {type: 'ADD_NEW_ONE_TIME_EVENT', payload: this.state});
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
  
        handleEditOpen = () => {
          this.setState({ openEdit: true });
        };
  
        showCalendar = () => {
            console.log('ran showCalendar');
          this.refs.myCalendar.instance.refresh();
        };

    render() {
        const { fullScreen, classes } = this.props;
        return (
            <div>
                <div className="mbsc-grid-fixed mbsc-grid-md">
                <NewEventButton />
                    <Paper className={classes.paper} elevation={1}>
                        <mobiscroll.Eventcalendar
                            theme="windows"
                            display="inline"
                            data={this.props.reduxState.event}
                            view={{
                                calendar: { type: 'month' },
                                eventList: { type: 'month' }
                            }}
                            onEventSelect={this.onEventSelect}
                        />
                    </Paper>
                    <div>
                        <Dialog
                        fullScreen={fullScreen}
                        open={this.state.openClick}
                        onClose={this.handleCancel}
                        aria-labelledby="responsive-dialog-title"
                        >
                        <DialogTitle id="responsive-dialog-title">Event Name: {this.state.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            Description: {this.state.description}
                            </DialogContentText>
                            <DialogContentText>
                            Location: {this.state.location}
                            </DialogContentText>
                            <DialogContentText>
                            Start Time: {this.state.start}
                            </DialogContentText>
                            <DialogContentText>
                            End Time: {this.state.end}
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            {/* <Button onClick={this.handleCancel} color="primary">
                                Cancel
                            </Button> */}
                            {/* <Button onClick={() => this.handleRemove(this.state.id)} color="primary">
                                Delete
                            </Button> */}
                            <div className={classes.root}>
                                <MuiThemeProvider theme={theme}>
                                    <Button color="primary" onClick={this.handleEditOpen}>
                                        Edit
                                    </Button>
                                    <Dialog
                                    open={this.state.openEdit}
                                    onClose={this.handleClose}
                                    aria-labelledby="form-dialog-title"
                                    >
                                    <DialogTitle id="form-dialog-title">Edit  A New One Time Event</DialogTitle>
                                    <DialogContent>
                                        <DialogContentText>
                                        To edit an event, please adjust your info here.
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
                                        Edit Start Date and Time
                                        </DialogContentText>
                                        <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="date-native-simple">Month</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">Day</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">Year</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">Hour</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">Minute</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">AM/PM</InputLabel>
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
                                        Edit End Date and Time
                                        </DialogContentText>
                                        <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="date-native-simple">Month</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">Day</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">Year</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">Hour</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">Minute</InputLabel>
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
                                        <InputLabel htmlFor="date-native-simple">AM/PM</InputLabel>
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
                            <Button onClick={this.handleSave} color="primary" autoFocus>
                                Done
                            </Button>
                        </DialogActions>
                        </Dialog>
                    </div>
                </div>
            </div>
        );
    }        
}

MonthlyView.propTypes = {
    fullScreen: PropTypes.bool.isRequired,
    classes: PropTypes.object.isRequired,
  };

export default withMobileDialog()(connect(mapReduxStateToProps)(withStyles(styles)(MonthlyView)));