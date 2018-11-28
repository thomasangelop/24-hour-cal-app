import React from 'react';
import {connect} from 'react-redux';
import NewEventButton from './NewEventButton';
import EditEventButton from './EditEventButton';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import axios from 'axios';


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
        open: false,
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

      onEventSelect = (event, inst) => {
        console.log('an event was clicked. event:', event, 'inst:', inst);
        console.log('what is the event', event.event);
        this.setState({ 
            open: true, 
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
            this.setState({ open: false });
        };

        handleSave = () => {
            this.setState({ open: false });
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
            this.setState({ open: false });
          }

    render() {
        const { fullScreen } = this.props;
        return (
            <div>
                <div className="mbsc-grid-fixed mbsc-grid-md">
                <NewEventButton />
                    <mobiscroll.Eventcalendar
                        theme="24-hour-cal"
                        display="inline"
                        data={this.props.reduxState.event}
                        view={{
                            calendar: { type: 'month' },
                            eventList: { type: 'month' }
                        }}
                        onEventSelect={this.onEventSelect}
                    />
                    <div>
                        <Dialog
                        fullScreen={fullScreen}
                        open={this.state.open}
                        onClose={this.handleClose}
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
                        <Button onClick={this.handleCancel} color="primary">
                                Cancel
                            </Button>
                            <Button onClick={() => this.handleRemove(this.state.id)} color="primary">
                                Delete
                            </Button>
                            {/* <Button onClick={this.handleCancel} color="primary"> */}
                                <EditEventButton />
                            {/* </Button> */}
                            <Button onClick={this.handleSave} color="primary" autoFocus>
                                Save
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
  };

export default withMobileDialog()(connect(mapReduxStateToProps)(MonthlyView));