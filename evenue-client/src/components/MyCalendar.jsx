import React from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './MyCalendar.css';
import './styles.css';
import TopNav from './Navbar';

const localizer = momentLocalizer(moment);

const[data]="";

console.log("->"+data);


class MyCalendar extends React.Component {
  state = {
    events: []
  };
  

  handleAddEvent = (newEvent) => {
    const updatedEvents = [...this.state.events, newEvent];
    console.log('updatedEvents:', updatedEvents);
    this.setState({ events: updatedEvents });
    
    this.setState({ events: updatedEvents }, () => {
      console.log('events in state:', this.state.events);
    });
  
    // Print the data on the event start date
    const data = 'Your data here';
    const { start } = newEvent;
    const index = this.state.events.findIndex((event) => event.start === start);
    const updatedEvent = { ...newEvent, data };
    const updatedEvents2 = [...this.state.events];
    updatedEvents2.splice(index, 1, updatedEvent);
    this.setState({ events: updatedEvents2 });

    
  };
  
  
  
  eventPropGetter = (event) => {
    const title = event && event.title;
    const className = `event-${title && title.replace(/\s+/g, '-').toLowerCase()}`;
    const data = event && event.data;
    const tooltip = `${title} - ${data}`;
    return {
      className,
      title: tooltip
    };
  };
  
  

  render() {
    const { events } = this.state;
    return (
      <div className="bag">
        <TopNav />
        <div className='calendar'>
          <div className='calendar-container'>
            <Calendar 
              key={events.length} 
              localizer={localizer}
              events={events}
              startAccessor="start"
              endAccessor="end"
              defaultDate={new Date()}
              views={['month']}
              selectable={true}
              onSelectSlot={(slotInfo) => {
                const title = window.prompt('Enter event title:');
                if (title) {
                  const start = slotInfo.start;
                  const end = slotInfo.end;
                  const data = this.state.events.find((event) => event.start === start)?.data || '';
                  const newEvent = { title, start, end, data };
                  this.handleAddEvent(newEvent);
                }
              }}
              eventPropGetter={this.eventPropGetter}
            />
            {events.map((event) => (
              <div key={event.start.toString()}>{event.title}</div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}  

export default MyCalendar;
