import React from 'react';
import ReactDOM from 'react-dom';
import All from './AllRecipies';
import Filter from './FilterBox';
import RecipieList from './RecipeList';
import ShowRecipies from './ShowRecipies';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount } from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
describe('All Recipies Page Component Tests', () => {
    /*it('Filter componen has filter box', () => {
        const component = mount(<Filter/>);
        expect(component.exists('input#checkbox')).toBe(true);
    });
    it('Filter component has  list', () => {
        const component = mount(<Filter />);
        expect(component.exists('ul#ul1')).toBe(true);
    });*/
});
