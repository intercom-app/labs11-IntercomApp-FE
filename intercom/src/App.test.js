import React from 'react';

import { render } from 'react-testing-library'; 
import 'jest-dom/extend-expect'; 

import App from './App';

describe('<App />', () => {

  const props = {
    auth: {
      isAuthenticated: function() {return true}
    }
  }

  it('renders without crashing', () => {
    render(<App {...props} />);
  });

  it('renders home button', () => {
    const { getByText } = render(<App {...props} />);
    const homeBtn = getByText(/Home/i);
    expect(homeBtn).toBeInTheDocument();
  })

  it('renders logout button if user logged in', () => {
    const { getByText } = render(<App {...props} />);
    const logOutBtn = getByText(/Log Out/i);
    expect(logOutBtn).toBeInTheDocument();
  })

  it('renders login button if user logged out', () => {
    const props = {
      auth: {
        isAuthenticated: function() {return false}
      }
    }
    const { getByText } = render(<App {...props} />);
    const logInBtn = getByText(/Log In/i);
    expect(logInBtn).toBeInTheDocument();
  })

})

