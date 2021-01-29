import React from 'react';
import SignUp from '../SignUpPage/SignUpPage';
import Enzyme from 'enzyme';
//import chai, {expect} from 'chai';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
Enzyme.configure({ adapter: new Adapter() });

describe('Login Page Component Tests', () => {
    let wrapper;
    it("renders without crashing", () => {
        const component = mount(<BrowserRouter><SignUp/></BrowserRouter>);
        expect(component).toMatchSnapshot();
      });
    it('renders input component', () => {
        wrapper = shallow(<SignUp/>)
        expect(wrapper.find('input')).exist;
    });
    it('renders button component', () => {
        wrapper = shallow(<SignUp/>)
        expect(wrapper.find('button')).exist;
    });
    it('renders img component', () => {
        wrapper = shallow(<SignUp/>)
        expect(wrapper.find('img')).exist;
    });
    it('renders form component', () => {
        wrapper = shallow(<SignUp/>)
        expect(wrapper.find('form')).exist;
    });

});
