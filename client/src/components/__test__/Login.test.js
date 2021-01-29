import React from 'react';
import Login from '../LoginPage/LoginPage';
import Enzyme from 'enzyme';
//import chai, {expect} from 'chai';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe('Login Page Component Tests', () => {
    let wrapper;
    it("renders without crashing", () => {
        const component = mount(<BrowserRouter><Login/></BrowserRouter>);
        expect(component).toMatchSnapshot();
      });
    it('renders input component', () => {
        wrapper = shallow(<Login/>)
        expect(wrapper.find('input')).exist;
    });
    it('renders button component', () => {
        wrapper = shallow(<Login/>)
        expect(wrapper.find('button')).exist;
    });
    it('renders img component', () => {
        wrapper = shallow(<Login/>)
        expect(wrapper.find('img')).exist;
    });
    it('renders form component', () => {
        wrapper = shallow(<Login/>)
        expect(wrapper.find('form')).exist;
    });
    /*it("login a user", () => {
        const { getByTestId } = render(<BrowserRouter><Login/></BrowserRouter>);
        const input1 = getByTestId("input1");
        const input2 = getByTestId("input2");
        const res = getByTestId("result");
        input1.value = "test505";
        input2.value = "123456789";
        fireEvent.click(getByTestId("loginbutton"));
        expect(res.textContent).toBe("true");
    });*/

});
