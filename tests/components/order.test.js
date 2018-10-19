import React from 'react';
import { shallow } from 'enzyme';

import Order from '../../src/components/Order.js';
import renderer from 'react-test-renderer';

const newOrder = {}
const menu = {}
const customer = {}

describe('order', ()=> {
    it('rendered output snapshot', ()=> {
        const orderTotals = {itemsCost: 0, deliveryCost: 5, discount: 0, deliveryMessage: "Free delivery on orders over £30"}
          const tree = renderer.create(<Order orderTotals={orderTotals} newOrder={newOrder} customer={customer} menu={menu} />).toJSON()
          expect(tree).toMatchSnapshot()
    })
    it('when login clicked it should call handleClickLogin', ()=> {
        const orderTotals = {itemsCost: 0, deliveryCost: 5, discount: 0, deliveryMessage: "Free delivery on orders over £30"}
        const handleClickLogin= jest.fn();
        const wrapper = shallow(<Order orderTotals={orderTotals} newOrder={newOrder} customer={customer} menu={menu} handleClickLogin={handleClickLogin}/>);
        wrapper.find('#login').simulate('click');
        expect(handleClickLogin).toHaveBeenCalled()
    })
    it('when order button clicked it should call sendOrder', ()=> {
        const orderTotals = {itemsCost: 5, deliveryCost: 5, discount: 0, deliveryMessage: "Free delivery on orders over £30"}
        const sendOrder = jest.fn();
        const wrapper = shallow(<Order orderTotals={orderTotals} newOrder={newOrder} customer={customer} menu={menu} sendOrder={sendOrder}/>);
        wrapper.find('#order').simulate('click');
        expect(sendOrder).toHaveBeenCalled()
    })
})