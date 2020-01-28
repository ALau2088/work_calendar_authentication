import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.jsx';

describe('App', () => {
  it('should render without errors', () => {
    const div = document.createElement('div');
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });
});
