import React, { Component } from 'react';
import { time } from '../helpers/calendar';

class Time extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: []
    };
  }

  createTableRows() {
    let timeSlots = [];
    for (let i = 0; i < 48; i++) {
      if (i % 2 === 0) {
        timeSlots.push(
          <tr key={i} style={{ borderBottom: '1px solid white' }}>
            {time[i / 2]}
          </tr>
        );
      } else {
        timeSlots.push(
          <tr key={i} style={{ borderBottom: '1px solid' }}>
            <br />
          </tr>
        );
      }
    }
    return timeSlots;
  }

  render() {
    return (
      <table className='table table-bordered'>
        <thead>
          <tr>
            <br />
          </tr>
          <tr style={{ borderBottom: '1px solid' }}>
            <br />
          </tr>
        </thead>
        <tbody>{this.createTableRows.bind(this)()}</tbody>
      </table>
    );
  }
}

export default Time;
