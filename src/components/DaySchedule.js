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

  findIndex = time => {
    for (let i = 0; i < TIME.length; i++) {
      if (time === TIME[i].iso) {
        return i;
      }
    }
  };

  handleDragStop = event => {
    //Pass to App.js to store update event data in state.
    this.props.onEventUpdate(event);
  };

  handleResize = event => {
    this.props.onEventUpdate(event);
  };

  buildEvents = () => {
    let eventObjects = [];

    const { date, events } = this.props;
    const todaysEvents = getTodaysEvents(date, events);

    for (let event of todaysEvents) {
      let startTime = event.startTime.split('T').pop();
      let endTime = event.endTime.split('T').pop();
      let startIndex = this.findIndex(startTime);
      let endIndex = this.findIndex(endTime);

      eventObjects.push(
        <ContainerDimensions key={event.id}>
          {({ width, height }) => (
            <Event
              id={event.id}
              slotWidth={Math.floor(height / 24)} //need to refactor to slotSize
              startIndex={startIndex}
              endIndex={endIndex}
              width={width}
              color={event.color}
              description={event.description}
              onDragStop={event => this.handleDragStop(event)}
              onResize={event => this.handleResize(event)}
            />
          )}
        </ContainerDimensions>
      );
    }
    return eventObjects;
  };

  buildGridLines = height => {
    let gridLines = [];
    for (let i = 1; i < 24; i++) {
      if (i % 2 === 1) {
        gridLines.push(
          <ContainerDimensions key={i}>
            {({ width, height }) => (
              <div
                style={{
                  borderBottom: '2px dashed lightgrey',
                  width: 'auto',
                  height: Math.floor(height / 24) - 1 //-1 to account for border of 1px
                }}
              />
            )}
          </ContainerDimensions>
        );
      } else {
        gridLines.push(
          <ContainerDimensions key={i}>
            {({ width, height }) => (
              <div
                style={{
                  borderBottom: '2px solid lightgrey',
                  width: 'auto',
                  height: Math.floor(height / 24) - 1 //-1 to account for border of 1px
                }}
              />
            )}
          </ContainerDimensions>
        );
      }
    }
    return gridLines;
  };

  render() {
    return (
      <div className="schedule_container">
        <div className="time_container">{this.buildGridLines()}</div>
        <div className="event_container">
          {this.buildGridLines()}
          {this.buildEvents()}
        </div>
      </div>
    );
  }
}

export default DaySchedule;
