import React from 'react';

import { render } from 'react-testing-library'; 
import 'jest-dom/extend-expect'; 

import SingleUser from './SingleUser';

describe('<SingleUser />', () => {

  const props = {
    match: {
      params: {
        id: 1
      }
    }
  }

  it('renders without crashing', () => {
    render(<SingleUser {...props} />);
  });

})