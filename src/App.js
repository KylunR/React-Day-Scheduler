import React, { Component } from 'react';
import DaySchedule from './components/DaySchedule';

import { date, events } from './data/eventData';

class App extends Component {
  state = {
    date,
    events
  };

  handleEventUpdate = event => {
    let { events } = this.state;
    for (let i = 0; i < events.length; i++) {
      if (event.id === events[i].id) {
        // Isolate HH:MM:SSZ from YYYY-MM-DDT
        let startTime = events[i].startTime.split('T');
        let endTime = events[i].endTime.split('T');

        // Update HH:MM:SSZ values
        startTime[1] = event.startTime;
        endTime[1] = event.endTime;

        // Combine both indices and add 'T' back in middle
        startTime = startTime[0] + 'T' + startTime[1];
        endTime = endTime[0] + 'T' + endTime[1];

        // Update time change
        events[i].startTime = startTime;
        events[i].endTime = endTime;
        this.setState({ events });
      }
    }
  };

  render() {
    const { date, events } = this.state;
    return (
      <div>
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
