import React, { Component } from 'react';
import { string, array } from 'prop-types';
import { Rnd } from 'react-rnd';

import './DaySchedule.css';

class DaySchedule extends Component {
  static propTypes = {
    date: string,
    events: array.isRequired
  };

  state = {
    height: 200,
    x: 0,
    y: 0
  };

  buildGrid = () => {
    let height = parseInt(this.state.height);
    let bottomValue = this.state.y + height;
    return (
      <div className="calendar_container">
        <Rnd
          style={style}
          bounds="parent"
          enableResizing={{ bottom: true }}
          size={{ width: 200, height: this.state.height }}
          position={{ x: this.state.x, y: this.state.y }}
          onDragStop={(e, d) => {
            this.setState({ x: d.x, y: d.y });
          }}
          onResize={(e, direction, ref, delta, position) => {
            this.setState({
              height: ref.style.height,
              ...position
            });
            console.log(ref.style);
          }}
        >
          {'top' + this.state.y}
          {'bottom' + bottomValue}
        </Rnd>
      </div>
    );
  };

  render() {
    return <div className="container">{this.buildGrid()}</div>;
  }
}

const style = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  border: 'solid 1px #ddd',
  background: '#f0f0f0'
};

export default DaySchedule;
