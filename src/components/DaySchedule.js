import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';

import Event from './Event';
import { getCurrentEvents, findIndex } from '../util';
import { timeData } from '../data/TimeData';
import './DaySchedule.css';

const BLOCKS = 48;

class DaySchedule extends Component {
  static propTypes = {
    date: PropTypes.string,
    events: PropTypes.array.isRequired
  };

  handleDragStop = event => {
    this.props.onEventUpdate(event);
  };

  handleResize = event => {
    this.props.onEventUpdate(event);
  };

  buildEvents = () => {
    const { date, events } = this.props;
    let eventObjects = [];

    const currentEvents = getCurrentEvents(date, events);

    for (let event of currentEvents) {
      let startTime = event.startTime.split('T').pop();
      let endTime = event.endTime.split('T').pop();

      let startIndex = findIndex(startTime);
      let endIndex = findIndex(endTime);

      eventObjects.push(
        <ContainerDimensions key={event.id}>
          {({ width, height }) => (
            <Event
              id={event.id}
              blockSize={Math.floor(height / BLOCKS)}
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

  buildSchedulerIndex = () => {
    let gridLines = [];
    for (let i = 1; i < BLOCKS; i++) {
      if (i % 2 === 1) {
        gridLines.push(
          <ContainerDimensions key={i}>
            {({ width, height }) => (
              <div
                style={{
                  borderBottom: '2px dashed lightgrey',
                  width: 'auto',
                  height: Math.floor(height / BLOCKS) - 2, // -2px
                  padding: 0,
                  margin: 0,
                  textAlign: 'right'
                }}
              >
                <div className="label_text">{timeData[i - 1].label}</div>
              </div>
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
                  height: Math.floor(height / BLOCKS) - 2, // -2px
                  padding: 0,
                  margin: 0
                }}
              />
            )}
          </ContainerDimensions>
        );
      }
    }
    return gridLines;
  };

  buildEventGridLines = () => {
    let gridLines = [];
    for (let i = 1; i < BLOCKS; i++) {
      if (i % 2 === 1) {
        gridLines.push(
          <ContainerDimensions key={i}>
            {({ width, height }) => (
              <div
                style={{
                  borderBottom: '2px dashed lightgrey',
                  width: 'auto',
                  height: Math.floor(height / BLOCKS) - 2,
                  padding: 0,
                  margin: 0
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
                  height: Math.floor(height / BLOCKS) - 2, // -2px
                  padding: 0,
                  margin: 0
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
      <div className="scheduler_container">
        <div className="index_container">{this.buildSchedulerIndex()}</div>
        <div className="event_container">
          {this.buildEventGridLines()}
          {this.buildEvents()}
        </div>
      </div>
    );
  }
}

export default DaySchedule;
