import React, { Component, Fragment } from 'react';
import axios from 'axios';
import {
  Col,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class EditEventModal extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      eventId: '',
      title: '',
      startTime: '',
      endTime: '',
      repeat: 'never'
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  toggle() {
    const { id, title, start_time, end_time, repeat } = this.props.event;
    this.setState({
      eventId: id,
      title,
      startTime: start_time,
      endTime: end_time,
      repeat: repeat,
      modal: !this.state.modal
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onDelete() {
    const { eventId } = this.state;
    axios
      .delete('/api/event', { params: { eventId } })
      .then(() => {
        this.props.onDelete();
      })
      .catch(err => console.log(err));
    this.toggle();
  }

  onSubmit(e) {
    e.preventDefault();
    const event = {
      title: this.state.title,
      startTime: this.state.startTime,
      endTime: this.state.endTime,
      repeat: this.state.repeat,
      dayId: this.props.date.day_id,
      dayNumberOfMonth: this.props.date.day_number_of_month,
      userId: this.props.userId,
      dateId: this.props.date.id,
      weekId: this.props.date.week_id,
      id: this.state.eventId
    };
    axios
      .put('/api/event', event)
      .then(() => {
        this.props.onEdit();
      })
      .catch(err => console.log(err));
    this.toggle();
  }

  render() {
    const options = (
      <Fragment>
        <option>12:00am</option>
        <option>12:30am</option>
        <option>1:00am</option>
        <option>1:30am</option>
        <option>2:00am</option>
        <option>2:30am</option>
        <option>3:00am</option>
        <option>3:30am</option>
        <option>4:00am</option>
        <option>4:30am</option>
        <option>5:00am</option>
        <option>5:30am</option>
        <option>6:00am</option>
        <option>6:30am</option>
        <option>7:00am</option>
        <option>7:30am</option>
        <option>8:00am</option>
        <option>8:30am</option>
        <option>9:00am</option>
        <option>9:30am</option>
        <option>10:00am</option>
        <option>10:30am</option>
        <option>11:00am</option>
        <option>11:30am</option>
        <option>12:00pm</option>
        <option>12:30pm</option>
        <option>1:00pm</option>
        <option>1:30pm</option>
        <option>2:00pm</option>
        <option>2:30pm</option>
        <option>3:00pm</option>
        <option>3:30pm</option>
        <option>4:00pm</option>
        <option>4:30pm</option>
        <option>5:00pm</option>
        <option>5:30pm</option>
        <option>6:00pm</option>
        <option>6:30pm</option>
        <option>7:00pm</option>
        <option>7:30pm</option>
        <option>8:00pm</option>
        <option>8:30pm</option>
        <option>9:00pm</option>
        <option>9:30pm</option>
        <option>10:00pm</option>
        <option>10:30pm</option>
        <option>11:00pm</option>
        <option>11:30pm</option>
      </Fragment>
    );
    return (
      <Fragment>
        <tr color='dark' style={this.props.style} onClick={this.toggle}>
          {this.props.text}
        </tr>

        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={false}>
          <ModalHeader toggle={this.toggle}>{this.props.modalText}</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup row>
                <Label for='Title' sm={2}>
                  Title
                </Label>
                <Col sm={10}>
                  <Input
                    type='text'
                    name='title'
                    id='title'
                    placeholder='Add title'
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='startTime' sm={2}>
                  Start Time
                </Label>
                <Col sm={10}>
                  <Input
                    type='select'
                    name='startTime'
                    id='startTime'
                    value={this.state.startTime}
                    onChange={this.onChange}
                  >
                    {options}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='endTime' sm={2}>
                  End Time
                </Label>
                <Col sm={10}>
                  <Input
                    type='select'
                    name='endTime'
                    id='endTime'
                    value={this.state.endTime}
                    onChange={this.onChange}
                  >
                    {options}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='repeat' sm={2}>
                  Repeat
                </Label>
                <Col sm={10}>
                  <Input
                    type='select'
                    name='repeat'
                    id='repeat'
                    value={this.state.repeat}
                    onChange={this.onChange}
                  >
                    <option>never</option>
                    <option>weekly</option>
                    <option>monthly</option>
                  </Input>
                </Col>
              </FormGroup>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Submit
              </Button>
            </Form>
            <Button
              color='dark'
              style={{ marginTop: '2rem' }}
              onClick={this.onDelete}
              block
            >
              Delete
            </Button>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

const mapStateToProps = state => ({
  userId: state.users.currentUser.id,
  workDayStartTime: state.users.currentUser.workday_start_time,
  workDayEndTime: state.users.currentUser.workday_end_time
});

export default connect(mapStateToProps, null)(EditEventModal);
