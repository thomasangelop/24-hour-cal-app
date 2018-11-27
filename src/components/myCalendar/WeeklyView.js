import React from 'react';
import { connect } from 'react-redux';
import NewEventButton from './NewEventButton';

/* import Mobiscroll JS and CSS */
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';

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
        
    }
        
    render() {
        return (
            <div>
                {/* <pre>{JSON.stringify(this.props.reduxState.event)}</pre>
                events: [
                {this.props.reduxState.event.map(events => (
                    <p key={events.id}>
                        start: new Date('{events.start}'),
                        end: new Date('{events.end}'),
                        text: '{events.text}',
                        color: '#{events.color}'
                    </p>
                ))}
                ] */}
                <div className="mbsc-grid-fixed mbsc-grid-md">
                <NewEventButton />
                    <mobiscroll.Eventcalendar
                        theme="24-hour-cal"
                        display="inline"
                        // data={this.state.events}
                        data={this.props.reduxState.event}
                        view={{
                            calendar: { type: 'week' },
                            eventList: { type: 'week' }
                        }}
                        onEventSelect={this.onEventSelect}
                    />
                </div>
            </div>
        );
    }        
}
export default connect(mapReduxStateToProps)(WeeklyView);