import React from 'react';

import { render } from 'react-testing-library'; 
import 'jest-dom/extend-expect'; 

import Team from './Team';

describe('<Team />', () => {

  it('renders without crashing', () => {
    render(<Team />);
  });

})