import React from 'react';

import { render } from 'react-testing-library'; 
import 'jest-dom/extend-expect'; 

import App from './App';

describe('<App />', () => {

  it('renders without crashing', () => {
    render(<App />);
  });

  it('confirms team members navlink listed', () => {
    const { getByText } = render(<App />);
    const teamMemNavLink = getByText(/Team Members/i);
    expect(teamMemNavLink).toBeInTheDocument();
  })

})

