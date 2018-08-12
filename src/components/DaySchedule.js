import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ContainerDimensions from 'react-container-dimensions';

import Event from './Event';
import './DaySchedule.css';
import { TIME } from '../constants/timeValues';

class DaySchedule extends Component {
  static propTypes = {
    date: PropTypes.string,
    events: PropTypes.array.isRequired
  };

  render() {
    console.log(TIME[0]);
    return (
      <div className="calendar_container">
        <ContainerDimensions>
          {({ width, height }) => (
            <Event
              slotWidth={Math.floor(height / 24)}
              startPosition={0}
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
