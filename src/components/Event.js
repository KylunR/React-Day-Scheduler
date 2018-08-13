import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import PropTypes from 'prop-types';

import { TIME } from '../data/timeData';

class Event extends Component {
  static propTypes = {
    slotWidth: PropTypes.number,
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
    const { startIndex, endIndex, slotWidth } = this.props;
    let startLocation = startIndex * slotWidth;
    let endLocation = endIndex * slotWidth - startLocation;

    this.setState({ startLocation, endLocation });
  }

  getTimeEquivalent = () => {
    const { slotWidth } = this.props;

    // Get top and bottom pixel locations along y-axis
    let startIndex = this.state.startLocation;
    let endIndex = startIndex + this.state.endLocation;

    // Find index the pixel values relate to
    startIndex = Math.floor(startIndex / slotWidth);
    endIndex = Math.floor(endIndex / slotWidth);

    // Find start and end times relating to those indices
    const startTime = TIME[startIndex];
    const endTime = TIME[endIndex];

    return [startTime, endTime];
  };

  onDragStop = (e, d) => {
    this.setState({ startLocation: d.y - (d.y % this.props.slotWidth) });

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
  };

  render() {
    const { width, slotWidth, color, description } = this.props;
    const eventTime = this.getTimeEquivalent();

    return (
      <Rnd
        style={{ style, backgroundColor: color }}
        bounds="parent"
        dragAxis="y"
        size={{ width, height: this.state.endLocation }}
        position={{ x: 0, y: this.state.startLocation }}
        enableResizing={{ bottom: true }}
        resizeGrid={[0, slotWidth]}
        onDragStop={(e, d) => this.onDragStop(e, d)}
        onResize={(e, d, ref) => this.onResize(e, d, ref)}
      >
        {eventTime[0].label}
        {eventTime[1].label}
        {description}
      </Rnd>
    );
  }
}

const style = {
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd'
};

export default Event;
