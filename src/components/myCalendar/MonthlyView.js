import React from 'react';
import {connect} from 'react-redux';
import NewEventButton from './NewEventButton';

/* import Mobiscroll JS and CSS */
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';

//setup redux state for global usage of information 
const mapReduxStateToProps = reduxState => ({
    reduxState
  });

class MonthlyView extends React.Component {
    state = {
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
        this.getEvent();
      }
      //get the preferences from the database
      getEvent = () => {
       //Dispatch action to get the preferences from the server
       //This is picked up by the watcherSaga in index.js
       this.props.dispatch( { type: 'FETCH_EVENT', payload: this.state} );
      }

    render() {
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
                    />
                </div>
            </div>
        );
    }        
}
export default connect(mapReduxStateToProps)(MonthlyView);