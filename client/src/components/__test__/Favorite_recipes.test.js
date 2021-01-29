import React from 'react';
import Favorite_recipes from '../Favorite_Recipes/Favorite_Recipes';
import ListFavorites from '../Favorite_Recipes/ListFavorites';
import NoFav from '../Favorite_Recipes/NoFav';
import ShowFavorites from '../Favorite_Recipes/ShowFavorites';
import NoFavDirect from '../Favorite_Recipes/NoFavDirect';
import Title from '../Favorite_Recipes/Title';

import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme';
import { BrowserRouter } from 'react-router-dom';
import { render, fireEvent } from "@testing-library/react";
Enzyme.configure({ adapter: new Adapter() });

describe('Profile Page Component Tests', () => {
    let wrapper;
    it("renders without crashing", () => {
        const component = mount(<BrowserRouter><Favorite_recipes/></BrowserRouter>);
        expect(component).toMatchSnapshot();
      });
    it("renders without crashing", () => {
      const component = mount(<BrowserRouter><NoFav/></BrowserRouter>);
      expect(component).toMatchSnapshot();
      });
    it("renders without crashing", () => {
      const component = mount(<BrowserRouter><Title/></BrowserRouter>);
      expect(component).toMatchSnapshot();
      });  
    it('renders div component', () => {
      wrapper = shallow(<Favorite_recipes/>)
      expect(wrapper.find('div.container')).exist;
        });  
    it('renders search component', () => {
    wrapper = shallow(<NoFav/>)
    expect(wrapper.find('img')).exist;
        });  
    it('renders button component', () => {
        wrapper = shallow(<NoFav/>)
        expect(wrapper.find('Button')).exist;
        });  
    it('renders div component', () => {
    wrapper = shallow(<Title/>)
    expect(wrapper.find('div#outer')).exist;
        });
    it('renders div container component', () => {
        wrapper = shallow(<Title/>)
        expect(wrapper.find('div#inner')).exist;
        });    
    it('renders img component', () => {
        wrapper = shallow(<Title/>)
        expect(wrapper.find('img')).exist;
        });    
});