import React from 'react';
import { shallow } from 'enzyme';
import MenuItem from '../src/components/MenuItem';

describe('MenuItem', () => {
  test('When item is clicked, handleClick should be called with name, price and id', () => {
    const mockMenuItemClick = jest.fn();
    const wrapper = shallow(
      <MenuItem
        name={'eggs'}
        price={4}
        id={3}
        handleMenuItemClick={mockMenuItemClick}
      />
    );

    wrapper.find('li.menu__item').simulate('click');
    expect(mockMenuItemClick).toHaveBeenCalledWith('eggs', 4, 3);
  });
});
