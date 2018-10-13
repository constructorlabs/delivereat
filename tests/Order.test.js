import React from 'react';
import { shallow } from 'enzyme';
import Order from '../src/components/Order';

describe('Order', () => {
  let wrapper;
  let instance;

  beforeEach(() => {
    const mockAddToBasket = jest.fn();
    const mockCloseOrder = jest.fn();
    wrapper = shallow(
      <Order
        key={'2'}
        currentOrderItem={{
          id: 1,
          name: 'bacon roll',
          price: 4,
          description: 'grilled bacon in a soft bap'
        }}
        addOrderToBasket={mockAddToBasket}
        closeOrder={mockCloseOrder}
      />
    );
    instance = wrapper.instance();
  });

  afterEach(() => {
    instance.state.quantity = 1;
  });

  test('Clicking increase button should call the increaseOrderAmount method', () => {
    const mockIncreaseOrderAmount = jest.fn();
    instance.increaseOrderAmount = mockIncreaseOrderAmount;
    wrapper.find('.btn__increase').simulate('click');
    expect(mockIncreaseOrderAmount).toHaveBeenCalled();
  });

  test('increaseOrderAmount method should increment state.quantity when called', () => {
    instance.increaseOrderAmount();
    expect(instance.state.quantity).toEqual(2);
  });

  test('Clicking decrease button should call the decreaseOrderAmount method', () => {
    const mockDecreaseOrderAmount = jest.fn();
    instance.decreaseOrderAmount = mockDecreaseOrderAmount;
    wrapper.find('.btn__decrease').simulate('click');
    expect(mockDecreaseOrderAmount).toHaveBeenCalled();
  });

  test('decreaseOrderAmount method should decrement state.quantity when called', () => {
    instance.state.quantity = 3;
    instance.decreaseOrderAmount();
    expect(instance.state.quantity).toEqual(2);
  });

  test('decreaseOrderAmount method should not decrement state.quantity to less than 1', () => {
    instance.state.quantity = 3;
    // call decrement three times;
    instance.decreaseOrderAmount();
    instance.decreaseOrderAmount();
    instance.decreaseOrderAmount();
    expect(instance.state.quantity).toEqual(1);
  });
});
