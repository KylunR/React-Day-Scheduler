import React, { Component } from 'react';
import DaySchedule from './components/DaySchedule';

import { date, initialEventData } from './data';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      date,
      events: initialEventData
    };
  }

  handleEventUpdate = event => console.log(event);

  render() {
    const { date, events } = this.state;
    return (
      <div className="App">
        <DaySchedule
          date={date}
          events={events}
          onEventUpdate={this.handleEventUpdate}
        />
      </div>
    );
  }
}

export default App;
