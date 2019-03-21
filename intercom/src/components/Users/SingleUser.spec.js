import React from 'react';

import { render } from 'react-testing-library'; 
import 'jest-dom/extend-expect'; 

import SingleUser from './SingleUser';

describe('<Users />', () => {

  it('renders without crashing', () => {
    render(<SingleUser />);
  });

})