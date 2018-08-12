import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';

import Event from './Event';
import './DaySchedule.css';

class DaySchedule extends Component {
  static propTypes = {
    date: PropTypes.string,
    events: PropTypes.array.isRequired
  };

  render() {
    return (
      <div className="calendar_container">
        <ContainerDimensions>
          {({ width, height }) => (
            <Event
              slotWidth={50}
              startPosition={200}
              width={width}
              color={'#2ecc71'}
            />
          )}
        </ContainerDimensions>
      </div>
    );
  }
}

export default DaySchedule;
