import React from 'react';

import { render } from 'react-testing-library'; 
import 'jest-dom/extend-expect'; 

import Users from './Users';

describe('<Users />', () => {

  it('renders without crashing', () => {
    render(<Users />);
  });

})