import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from '../components/Calendar.jsx';
import Week from '../components/Week.jsx';

describe('Calendar', () => {
  const wrapper = shallow(<Calendar />);

  it('should keep track of the week', () => {
    expect(wrapper.state().weekId).toEqual(1);
  });

  it('should toggle to next week', () => {
    wrapper.find('[data-test="nextWeekButton"]').simulate('click');
    expect(wrapper.state().weekId).toEqual(2);
  });

  it('should toggle to previous week', () => {
    wrapper.find('[data-test="prevWeekButton"]').simulate('click');
    expect(wrapper.state().weekId).toEqual(1);
  });

  it('should have week component', () => {
    expect(wrapper.find('[data-test="Week"]')).toHaveLength(1);
  });
});
