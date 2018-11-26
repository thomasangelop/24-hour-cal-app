import React, { Component } from 'react';

/* import Mobiscroll JS and CSS */
import mobiscroll from '@mobiscroll/react';
import '@mobiscroll/react/dist/css/mobiscroll.react.min.css';

mobiscroll.settings = {
  lang: 'en',
  theme: 'material'
};

class NewEvent extends React.Component {
  constructor(props) {
      var now = new Date();
      super(props);
      this.state = {
          eventText: '',
          eventDesc: '',
          eventDate: [now, new Date(now.getFullYear(), now.getMonth(), now.getDate(), now.getHours() + 2)],
          myEvents: [{d: new Date(), text: 'Prime MVPs' }],
          allDay: false,
          isBusy: 'busy'
      };
      
      this.textChange = this.textChange.bind(this);
      this.descChange = this.descChange.bind(this);
      this.allDayChange = this.allDayChange.bind(this);
      this.dateChange = this.dateChange.bind(this);
      this.isBusyChange = this.isBusyChange.bind(this);
      this.addEvent = this.addEvent.bind(this);
  }
  
  textChange(event) {
      var state = this.state;
      state.eventText = event.target.value;
      this.setState(state);
  }
  
  descChange(event) {
      var state = this.state;
      state.eventDesc = event.target.value;
      this.setState(state);
  }
  
  allDayChange(event) {
      var state = this.state;
      state.allDay = event.target.checked;
      this.refs.range.instance.option({
          controls: state.allDay ? ['date'] : ['date', 'time'],
          dateWheels: state.allDay ? 'MM dd yy' : '|D M d|'
      });
      
      this.refs.range.instance.setVal(this.refs.range.instance.getVal(), true, false);
      this.setState(state);
  }
  
  dateChange(event, inst) {
      var state = this.state;
      state.eventDate = inst.getVal();
      this.setState(state);
  }
  
  isBusyChange(event){
      var state = this.state;
      state.isBusy = event.target.value;
      this.setState(state);
  }
  
  addEvent(event, inst) {
      var changedState = this.state;
      changedState.myEvents = changedState.myEvents.concat([{
          start: this.state.eventDate[0],
          end: this.state.eventDate[1],
          text: this.state.eventText || 'New Event',
          allDay: this.state.allDay
      }]);
      changedState.eventText = '';
      changedState.eventDesc = '';
      this.setState(changedState);
      this.refs.eventCal.instance.setVal(this.state.eventDate[0]);
  }
  
  render () {
      return (
          <div>
              <div className="mbsc-grid-fixed mbsc-grid-md">
                    <mobiscroll.Eventcalendar
                        theme="24-hour-cal"
                        display="inline"
                        data={this.state.myEvents}
                        view={{
                            calendar: { type: 'week' },
                            eventList: { type: 'week' }
                        }}
                    />
                </div>

              <mobiscroll.Form className="mbsc-grid-fixed mbsc-grid-md">
                  <mobiscroll.FormGroup>
                      <mobiscroll.FormGroupTitle>Add New event</mobiscroll.FormGroupTitle>
                      <mobiscroll.Form.Label>
                          Type Name
                          <input value={this.state.eventText} onChange={this.textChange} />
                      </mobiscroll.Form.Label>
                      <mobiscroll.Textarea value={this.state.eventDesc} onChange={this.descChange}>
                          Event Name
                      </mobiscroll.Textarea>
                  </mobiscroll.FormGroup>
                  <mobiscroll.FormGroup>  
                      {/* <mobiscroll.Switch value={this.state.allDay} onChange={this.allDayChange}>
                          All-day
                      </mobiscroll.Switch> */}
                          <mobiscroll.Form.Label>
                              Starts
                              <input id="startDate" />
                          </mobiscroll.Form.Label>
                          <mobiscroll.Form.Label>
                              Ends
                              <input id="endDate" />
                          </mobiscroll.Form.Label>
                          <mobiscroll.Form.Label>
                              Time Duration
                              <input id="timeDuration" />
                          </mobiscroll.Form.Label>
                          <mobiscroll.Form.Label>
                              Days Out Of The Week
                              <input id="days_out_of_the_week" />
                          </mobiscroll.Form.Label>
                          {/* <mobiscroll.Range
                              theme="ios"                 // Specify theme like: theme="ios" or omit setting to use default
                              lang="en"                   // Specify language like: lang="pl" or omit setting to use default
                              ref="range"
                              type="hidden"
                              controls={['date', 'time']}
                              dateWheels="|D M d|"
                              startInput="#startDate"
                              endInput="#endDate"
                              tabs={false}
                              value={this.state.eventDate}
                              onSet={this.dateChange}
                          /> */}
                  </mobiscroll.FormGroup>
                  <mobiscroll.FormGroup className="mbsc-btn-group-block">
                      <button onClick={this.addEvent} type="button">Add Event</button>
                  </mobiscroll.FormGroup>
              </mobiscroll.Form>
          </div>
      );
  }    
}
export default NewEvent;