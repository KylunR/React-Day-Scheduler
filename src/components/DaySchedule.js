import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';

import Event from './Event';
import { getTodaysEvents } from '../util';
import { TIME } from '../data/timeData';
import './DaySchedule.css';

class DaySchedule extends Component {
  static propTypes = {
    date: PropTypes.string,
    events: PropTypes.array.isRequired
  };

  state = {
    eventObjects: null
  };

  componentDidMount() {
    this.buildEvents();
  }

  findIndex = time => {
    for (let i = 0; i < TIME.length; i++) {
      if (time === TIME[i].iso) {
        return i;
      }
    }
  };

  buildEvents = () => {
    const { date, events } = this.props;
    const todaysEvents = getTodaysEvents(date, events);

    let eventObjects = [];
    for (let event of todaysEvents) {
      let startTime = event.startTime.split('T').pop();
      let endTime = event.endTime.split('T').pop();
      let startIndex = this.findIndex(startTime);
      let endIndex = this.findIndex(endTime);

      eventObjects.push(
        <ContainerDimensions key={event.id}>
          {({ width, height }) => (
            <Event
              slotWidth={Math.floor(height / 24)}
              startIndex={startIndex}
              endIndex={endIndex}
              width={width}
              color={event.color}
              description={event.description}
            />
          )}
        </ContainerDimensions>
      );
    }

    return eventObjects;
  };

  render() {
    return <div className="event_container">{this.buildEvents()}</div>;
  }
}

export default DaySchedule;
