import React from 'react';
import NewEventButton from './NewEventButton';

/* import Mobiscroll JS and CSS */
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';
import DeleteEventButton from './DeleteEventButton';

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
    render() {
        return (
            <div>
                <div className="mbsc-grid-fixed mbsc-grid-md">
                <NewEventButton /> <DeleteEventButton />
                    <mobiscroll.Eventcalendar
                        theme="24-hour-cal"
                        display="inline"
                        data={this.state.events}
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
export default MonthlyView;