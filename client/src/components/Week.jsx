import React, { Component } from 'react';
import Time from './Time.jsx';
import Day from './Day.jsx';
import axios from 'axios';

class Week extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dates: []
    };
  }

  componentDidMount() {
    axios
      .get('/api/dates', {
        params: {
          weekId: this.props.weekId
        }
      })
      .then(res => {
        this.setState({ dates: res.data });
      })
      .catch(err => console.log(err));
  }

  componentDidUpdate(prevProps) {
    if (this.props.weekId !== prevProps.weekId) {
      axios
        .get('/api/dates', {
          params: {
            weekId: this.props.weekId
          }
        })
        .then(res => {
          this.setState({ dates: res.data });
        })
        .catch(err => console.log(err));
    }
  }

  render() {
    return (
      <div className='d-flex justify-content-center p-2 flex-grow-1'>
        <Time />
        {this.state.dates.map((date, index) => (
          <Day key={index} date={date} dayId={index + 1} />
        ))}
      </div>
    );
  }
}

export default Week;
