import React from 'react';
import Error from '../Error_Page/NotFound';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe('Error Page Component Tests', () => {
    let wrapper;
    it("renders without crashing", () => {
        const component = mount(<BrowserRouter><Error/></BrowserRouter>);
        expect(component).toMatchSnapshot();
      });
    it('renders image component', () => {
        wrapper = shallow(<img/>)
        expect(wrapper.find('input')).exist;
    });
    it('renders image component', () => {
        wrapper = shallow(<h3/>)
        expect(wrapper.find('input')).exist;
    });
});
