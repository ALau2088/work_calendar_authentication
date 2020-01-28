import React, { Component, Fragment } from 'react';
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
import axios from 'axios';
import { addUser } from '../actions/users';

class AddUserModal extends Component {
  static propTypes = {
    userId: PropTypes.number.isRequired
  };
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      firstName: '',
      lastName: '',
      email: '',
      workDayStartTime: '',
      workDayEndTime: ''
    };
    this.toggle = this.toggle.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentWillUnmount() {
    document.body.style.overflow = 'unset';
  }

  toggle() {
    this.setState({
      modal: !this.state.modal
    });
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onSubmit(e) {
    e.preventDefault();
    const {
      firstName,
      lastName,
      email,
      workDayStartTime,
      workDayEndTime
    } = this.state;
    const user = {
      firstName,
      lastName,
      email,
      workDayStartTime,
      workDayEndTime
    };
    this.props.addUser(user);
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
        <Button onClick={this.toggle}>Add User</Button>
        <Modal isOpen={this.state.modal} toggle={this.toggle} backdrop={false}>
          <ModalHeader toggle={this.toggle}>Add User</ModalHeader>
          <ModalBody>
            <Form onSubmit={this.onSubmit}>
              <FormGroup row>
                <Label for='firstName' sm={2}>
                  First Name
                </Label>
                <Col sm={10}>
                  <Input
                    type='text'
                    name='firstName'
                    id='firstName'
                    placeholder='Add first name'
                    value={this.state.firstName}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='lastName' sm={2}>
                  Last Name
                </Label>
                <Col sm={10}>
                  <Input
                    type='text'
                    name='lastName'
                    id='lastName'
                    placeholder='Add last name'
                    value={this.state.lastName}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='email' sm={2}>
                  Email
                </Label>
                <Col sm={10}>
                  <Input
                    type='text'
                    name='email'
                    id='email'
                    placeholder='Add email'
                    value={this.state.email}
                    onChange={this.onChange}
                  />
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='workDayStartTime' sm={2}>
                  Work Start Time
                </Label>
                <Col sm={10}>
                  <Input
                    type='select'
                    name='workDayStartTime'
                    id='workDayStartTime'
                    value={this.state.workDayStartTime}
                    onChange={this.onChange}
                  >
                    {options}
                  </Input>
                </Col>
              </FormGroup>
              <FormGroup row>
                <Label for='workDayEndTime' sm={2}>
                  Work End Time
                </Label>
                <Col sm={10}>
                  <Input
                    type='select'
                    name='workDayEndTime'
                    id='workDayEndTime'
                    value={this.state.workDayEndTime}
                    onChange={this.onChange}
                  >
                    {options}
                  </Input>
                </Col>
              </FormGroup>
              <Button color='dark' style={{ marginTop: '2rem' }} block>
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>
      </Fragment>
    );
  }
}

export default connect(null, { addUser })(AddUserModal);
