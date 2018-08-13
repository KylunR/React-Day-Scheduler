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
    description: PropTypes.string
  };

  state = {
    y: 0,
    height: 0
  };

  componentDidMount() {
    const { startIndex, endIndex, slotWidth } = this.props;
    let y = startIndex * slotWidth;
    let height = endIndex * slotWidth - y;

    this.setState({ y, height });
  }

  getTimeEquivalent = () => {
    const { slotWidth } = this.props;

    // Get top and bottom pixel locations along y-axis
    let eventStart = this.state.y;
    let eventEnd = eventStart + this.state.height;

    // Find slot the pixel values relate to
    eventStart = Math.floor(eventStart / slotWidth);
    eventEnd = Math.floor(eventEnd / slotWidth);

    // Find start and end times relating to the slots
    const startTime = TIME[eventStart];
    const endTime = TIME[eventEnd];
    return [startTime, endTime];
  };

  render() {
    const { width, slotWidth, color, description } = this.props;
    const eventTime = this.getTimeEquivalent();

    return (
      <Rnd
        style={{ style, backgroundColor: color }}
        bounds="parent"
        dragAxis="y"
        size={{ width, height: this.state.height }}
        position={{ x: 0, y: this.state.y }}
        enableResizing={{ bottom: true }}
        resizeGrid={[0, slotWidth]}
        onDragStop={(e, d) => {
          let y = d.y - (d.y % slotWidth);
          this.setState({ y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            height: parseInt(ref.style.height, 0),
            ...position
          });
        }}
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
