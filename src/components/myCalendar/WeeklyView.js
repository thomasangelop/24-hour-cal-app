import React from 'react';
import { connect } from 'react-redux';
import NewEventButton from './NewEventButton';

/* import Mobiscroll JS and CSS */
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import DeleteEventButton from './DeleteEventButton';

//setup redux state for global usage of information 
const mapReduxStateToProps = reduxState => ({
    reduxState
  });

class WeeklyView extends React.Component {
    state = {
        person_id: this.props.reduxState.user.id,
        events: [
            {
            start: new Date('2018-11-26 12:00:00-06'),
            end: new Date('2018-11-26 13:00:00-06'),
            text: 'Lunch at Prime',
            color: '#ffffff'
            }, 
        ]
    };
    
    // when the page loads run this database call
    componentDidMount() {
      this.getPreferences();
    }
    //get the preferences from the database
    getPreferences = () => {
     //Dispatch action to get the preferences from the server
     //This is picked up by the watcherSaga in index.js
     this.props.dispatch( { type: 'FETCH_EVENT', payload: this.state} );
    }
        
    render() {
        return (
            <div>
                <div className="mbsc-grid-fixed mbsc-grid-md">
                <NewEventButton /><DeleteEventButton />
                    <mobiscroll.Eventcalendar
                        theme="24-hour-cal"
                        display="inline"
                        data={this.state.events}
                        view={{
                            calendar: { type: 'week' },
                            eventList: { type: 'week' }
                        }}
                    />
                </div>
            </div>
        );
    }        
}
export default connect(mapReduxStateToProps)(WeeklyView);