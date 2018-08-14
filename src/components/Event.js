import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import PropTypes from 'prop-types';
import { FaBars } from 'react-icons/fa';

import { timeData } from '../data/TimeData';

class Event extends Component {
  static propTypes = {
    blockSize: PropTypes.number,
    startIndex: PropTypes.number,
    endIndex: PropTypes.number,
    width: PropTypes.number,
    color: PropTypes.string,
    description: PropTypes.string,
    id: PropTypes.number
  };

  state = {
    startLocation: 0,
    endLocation: 0
  };

  componentDidMount() {
    const { startIndex, endIndex, blockSize } = this.props;
    const startLocation = startIndex * blockSize;
    const endLocation = endIndex * blockSize - startLocation;

    this.setState({ startLocation, endLocation });
  }

  getTimeEquivalent = () => {
    const { blockSize } = this.props;

    // Get top and bottom pixel locations along y-axis
    let startIndex = this.state.startLocation;
    let endIndex = startIndex + this.state.endLocation;

    // Find indices each pixel value relates to
    startIndex = Math.floor(startIndex / blockSize);
    endIndex = Math.floor(endIndex / blockSize);

    // Store time data relating to those indices
    const startTime = timeData[startIndex];
    const endTime = timeData[endIndex];

    return [startTime, endTime];
  };

  onDragStop = (e, d) => {
    this.setState({ startLocation: d.y - (d.y % this.props.blockSize) });

    const eventTime = this.getTimeEquivalent();
    let eventData = {
      id: this.props.id,
      startTime: eventTime[0].iso,
      endTime: eventTime[1].iso
    };

    //callback to DaySchedule.js
    this.props.onDragStop(eventData);
  };

  onResize = (e, d, ref) => {
    this.setState({
      endLocation: parseInt(ref.style.height, 0)
    });

    const eventTime = this.getTimeEquivalent();
    let eventData = {
      id: this.props.id,
      startTime: eventTime[0].iso,
      endTime: eventTime[1].iso
    };

    //callback to DaySchedule.js
    this.props.onResize(eventData);
  };

  render() {
    const { width, blockSize, color, description } = this.props;

    return (
      <Rnd
        style={{
          backgroundColor: color,
          borderRadius: 10
        }}
        bounds="parent"
        dragAxis="y"
        size={{ width, height: this.state.endLocation }}
        position={{ x: 0, y: this.state.startLocation }}
        minHeight={blockSize}
        enableResizing={{ bottom: true }}
        resizeGrid={[0, blockSize]}
        onDragStop={(e, d) => this.onDragStop(e, d)}
        onResize={(e, d, ref) => this.onResize(e, d, ref)}
      >
        <div>
          <div className="event_text">{description}</div>
          <div className="event_icon">
            <FaBars />
          </div>
        </div>
      </Rnd>
    );
  }
}

export default Event;
