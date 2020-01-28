import React, { Component } from 'react';
import Week from './Week.jsx';
import { Button } from 'reactstrap';

class Calendar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      weekId: 1
    };
    this.goToPrevWeek = this.goToPrevWeek.bind(this);
    this.goToNextWeek = this.goToNextWeek.bind(this);
  }

  goToPrevWeek() {
    if (this.state.weekId !== 1) {
      this.setState({ weekId: this.state.weekId - 1 }, () =>
        console.log(this.state.weekId)
      );
    }
  }

  goToNextWeek() {
    if (this.state.weekId !== 53) {
      this.setState({ weekId: this.state.weekId + 1 }, () =>
        console.log(this.state.weekId)
      );
    }
  }

  render() {
    return (
      <div className='d-flex justify-content-around p-2'>
        <div className='p-2'>
          <Button data-test='prevWeekButton' onClick={this.goToPrevWeek}>
            Prev Week
          </Button>
        </div>
        <Week data-test='Week' weekId={this.state.weekId} />
        <div className='p-2'>
          <Button data-test='nextWeekButton' onClick={this.goToNextWeek}>
            Next Week
          </Button>
        </div>
      </div>
    );
  }
}

export default Calendar;
