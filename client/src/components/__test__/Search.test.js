import React from 'react';
import Search from '../Search/Search';
import SearchBar from '../Search/SearchBar';
import SearchData from '../Search/SearchData';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe('Profile Page Component Tests', () => {
    let wrapper;
    // it("renders without crashing", () => {
    //     const component = mount(<BrowserRouter><Search/></BrowserRouter>);
    //     expect(component).toMatchSnapshot();
    //   });
    // it("renders without crashing", () => {
    //   const component = mount(<BrowserRouter><SearchData/></BrowserRouter>);
    //   expect(component).toMatchSnapshot();
    //   });
    // it("renders without crashing", () => {
    //     const component = mount(<BrowserRouter><SearchBar/></BrowserRouter>);
    //     expect(component).toMatchSnapshot();
    //   });
    it('renders div component', () => {
      wrapper = shallow(<SearchData/>)
      expect(wrapper.find('div')).exist;
        });  
    it('renders search component', () => {
    wrapper = shallow(<SearchData/>)
    expect(wrapper.find('Search')).exist;
        });  
    it('renders button component', () => {
        wrapper = shallow(<SearchBar/>)
        expect(wrapper.find('Button')).exist;
        });  
    it('renders input component', () => {
    wrapper = shallow(<SearchBar/>)
    expect(wrapper.find('Input')).exist;
        });
    // it('renders div container component', () => {
    //     wrapper = shallow(<Search/>)
    //     expect(wrapper.find('div.container')).exist;
    //     });    
    // it('renders search bar component', () => {
    //     wrapper = shallow(<Search/>)
    //     expect(wrapper.find('SearchBar')).exist;
    //     });    
});