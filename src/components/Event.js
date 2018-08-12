import React, { Component } from 'react';
import { Rnd } from 'react-rnd';
import PropTypes from 'prop-types';
import { TIME } from '../constants/timeValues';

class Event extends Component {
  static propTypes = {
    slotWidth: PropTypes.number,
    startPosition: PropTypes.number
  };

  state = {
    height: 100,
    x: 0,
    y: this.props.startPosition
  };

  render() {
    const { width, slotWidth, color } = this.props;

    //FIX THIS JUNK
    let topValue = this.state.y;
    let bottomValue = topValue + parseInt(this.state.height, 0);

    topValue = Math.floor(topValue / slotWidth);
    bottomValue = Math.floor(bottomValue / slotWidth);

    let topTime = TIME[topValue].label;
    let bottomTime = TIME[bottomValue].label;

    return (
      <Rnd
        style={{ style, backgroundColor: color }}
        bounds="parent"
        dragAxis="y"
        size={{ width, height: this.state.height }}
        position={{ x: this.state.x, y: this.state.y }}
        enableResizing={{ bottom: true }}
        resizeGrid={[0, slotWidth]}
        onDragStop={(e, d) => {
          let y = d.y - (d.y % slotWidth);
          this.setState({ x: 0, y });
        }}
        onResize={(e, direction, ref, delta, position) => {
          this.setState({
            height: ref.style.height,
            ...position
          });
        }}
      >
        {'top ' + topTime + ' '}
        {'bottom ' + bottomTime + ' '}
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
