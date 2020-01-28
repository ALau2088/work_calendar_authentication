import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import AddEventModal from './AddEventModal.jsx';
import EditEventModal from './EditEventModal.jsx';
import { days, times } from '../helpers/calendar';

class Day extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      userId: ''
    };
    this.onAdd = this.onAdd.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.onEdit = this.onEdit.bind(this);
  }

  componentDidMount() {
    this.getEvents();
  }

  componentDidUpdate(prevProps) {
    if (
      prevProps.date !== this.props.date ||
      prevProps.userId !== this.props.userId
    ) {
      this.getEvents();
    }
  }

  getEvents() {
    axios
      .get('/api/events', {
        params: {
          userId: this.props.userId,
          dateId: this.props.date.id,
          dayId: this.props.dayId,
          dayNumberOfMonth: this.props.date.day_number_of_month
        }
      })
      .then(res => this.setState({ events: res.data }))
      .catch(err => console.log(err));
  }

  createTableRows() {
    const { workDayStartTime, workDayEndTime } = this.props;
    let timeSlots = [];
    for (let i = 0; i < 48; i++) {
      let hasEvent = this.state.events.filter(
        event => times[`${event.start_time}`] === i
      );
      if (
        i < times[workDayStartTime] ||
        i >= times[workDayEndTime] ||
        this.props.dayId === 1 ||
        this.props.dayId === 7
      ) {
        timeSlots.push(
          <tr style={{ borderBottom: '1px solid' }}>
            <br />
          </tr>
        );
      } else if (hasEvent.length === 1) {
        let eventStartTime = hasEvent[0]['start_time'];
        let eventEndTime = hasEvent[0]['end_time'];
        while (i < times[eventEndTime]) {
          if (i === times[eventStartTime]) {
            timeSlots.push(
              <EditEventModal
                event={hasEvent[0]}
                style={{ cursor: 'pointer', borderBottom: '1px solid' }}
                text={'Edit Event'}
                modalText={'Edit Event'}
                date={this.props.date}
                onDelete={this.onDelete}
                onEdit={this.onEdit}
              />
            );
          } else if (i === times[eventEndTime] - 1) {
            timeSlots.push(
              <tr style={{ borderBottom: '1px solid' }}>
                <br></br>
              </tr>
            );
          } else {
            timeSlots.push(
              <tr style={{ borderBottom: '1px solid white' }}>
                <br></br>
              </tr>
            );
          }
          i++;
        }
        let checkIfNextTimeSlotHasEvent = this.state.events.filter(
          event => times[`${event.start_time}`] === i
        );
        if (checkIfNextTimeSlotHasEvent.length === 1) {
          i--;
          continue;
        } else {
          timeSlots.push(
            <AddEventModal
              style={{
                cursor: 'pointer',
                borderBottom: '1px solid'
              }}
              text={'Available'}
              modalText={'Add Event'}
              date={this.props.date}
              onAdd={this.onAdd}
            />
          );
        }
      } else {
        timeSlots.push(
          <AddEventModal
            style={{
              cursor: 'pointer',
              borderBottom: '1px solid'
            }}
            text={'Available'}
            modalText={'Add Event'}
            date={this.props.date}
            onAdd={this.onAdd}
          />
        );
      }
    }
    return timeSlots;
  }

  onAdd() {
    this.getEvents();
  }

  onDelete() {
    this.getEvents();
  }

  onEdit() {
    this.getEvents();
  }

  render() {
    const { day_id, month, day_number_of_month, year } = this.props.date;
    return (
      <table className='table table-bordered table-hover'>
        <thead>
          <div>{days[day_id - 1]}</div>
          <div style={{ borderBottom: '1px solid' }}>
            {month.slice(0, 3)} {day_number_of_month}, {year}
          </div>
        </thead>
        <tbody>{this.createTableRows.bind(this)()}</tbody>
      </table>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.users.currentUser.id,
  workDayStartTime: state.users.currentUser.workday_start_time,
  workDayEndTime: state.users.currentUser.workday_end_time
});

export default connect(mapStateToProps, null)(Day);
