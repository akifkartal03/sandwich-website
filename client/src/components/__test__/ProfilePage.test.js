import React from 'react';
import ProfilePage from '../ProfilePage/ProfilePage';
import ProfileForm from '../ProfilePage/ProfileForm';
import ProfileTitle from '../ProfilePage/ProfilTitle';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe('Profile Page Component Tests', () => {
    let wrapper;
    it("renders without crashing", () => {
        const component = mount(<BrowserRouter><ProfilePage/></BrowserRouter>);
        expect(component).toMatchSnapshot();
      });
    // it("renders without crashing", () => {
    //   const component = mount(<BrowserRouter><ProfileForm/></BrowserRouter>);
    //   expect(component).toMatchSnapshot();
    //   });
    it("renders without crashing", () => {
        const component = mount(<BrowserRouter><ProfileTitle/></BrowserRouter>);
        expect(component).toMatchSnapshot();
      });
    it('renders container div', () => {
      wrapper = shallow(<ProfilePage/>)
      expect(wrapper.find('div.container')).exist;
      });
    it('renders image component', () => {
      wrapper = shallow(<ProfileTitle/>)
      expect(wrapper.find('div#inner')).exist;
      });  
    it('renders image component', () => {
      wrapper = shallow(<ProfileTitle/>)
      expect(wrapper.find('div#outer')).exist;
      });  
    it('renders image component', () => {
      wrapper = shallow(<ProfileTitle/>)
      expect(wrapper.find('img')).exist;
      });  
});