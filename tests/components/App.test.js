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

  beforeEach(() => {
    fetch.resetMocks();
  });
  test('Menu click should load current item into state', () => {
    fetch.mockResponseOnce(JSON.stringify(menuItem));

    wrapper = shallow(<App />);
    instance = wrapper.instance();
    console.log(instance.state);

    //TODO: does not recognise handleMenuItemClick method
    instance.handleMenuItemClick(12);
    // // // .then(
    // // //   expect(fetch).toHaveBeenCalledWith('http://localhost:8080/api/menu/12')
    // // // );
    expect(instance.state.isOrdering).toEqual(true);
  });
});
