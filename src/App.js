import React, { Component } from 'react';
import DaySchedule from './components/DaySchedule';

import { date, events } from './data/eventData';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date,
      events
    };
  }

  handleEventUpdate = event => {
    let events = this.state.events;

    for (let i = 0; i < events.length; i++) {
      if (event.id === events[i].id) {
        let startTime = events[i].startTime.split('T');
        let endTime = events[i].endTime.split('T');

        startTime[1] = event.startTime;
        endTime[1] = event.endTime;

        startTime = startTime[0] + 'T' + startTime[1];
        endTime = endTime[0] + 'T' + endTime[1];

        events[i].startTime = startTime;
        events[i].endTime = endTime;
        this.setState({ events });
      }
    }
  };

  render() {
    const { date, events } = this.state;
    return (
      <div className="App">
        <DaySchedule
          date={date}
          events={events}
          onEventUpdate={event => this.handleEventUpdate(event)}
        />
      </div>
    );
  }
}

export default App;
