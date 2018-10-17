import React from 'react';
import { shallow } from 'enzyme';
import App from '../../src/components/App';

global.fetch = require('jest-fetch-mock');

describe('App', () => {
  let wrapper;
  let instance;

  const menuItem = {
    id: 12,
    name: 'The All American',
    price: 11.75,
    category: 'pancakes',
    description: 'Pancakes, eggs, sausage, bacon, fried potatoes & maple syrup'
  };

  // wrap all tests that rely on mock fetch with the before
  beforeEach(() => {
    fetch.resetMocks();
  });
  test('Menu click should load current item into state', () => {
    fetch.mockResponse(JSON.stringify(menuItem));

    wrapper = shallow(<App />);
    instance = wrapper.instance();

    //TODO: does not recognise handleMenuItemClick method

    instance
      .handleMenuItemClick(12)
      .then(expect(fetch).toHaveBeenCalledWith('/api/menu/12'));
    // expect(instance.state.isOrdering).toEqual(true);
  });
});
