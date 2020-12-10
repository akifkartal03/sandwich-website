import React from 'react';
import ReactDOM from 'react-dom';
import Enzyme from 'enzyme';
import Recipe from './Recipe'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme'
Enzyme.configure({ adapter: new Adapter()})
describe('Recipe test',() => {
    it('Recipe page renders without crashing', () => {
        const component = mount(<Recipe/>);
        expect(component).toMatchSnapshot();
    });

    it('has recipe name', () => {
    const component = shallow(<Recipe/>);
    expect(component.exists('h3.Recipe-name')).toBe(true);
    });
    it('has Ingredient info', () => {
        const component = shallow(<Recipe/>);
        expect(component.exists('div.IngredientInfo')).toBe(true);
        });
    it('has recipe name', () => {
    const component = shallow(<Recipe/>);
    expect(component.exists('div.Recipe-directions')).toBe(true);
    });
//     it('has recipe name ', () => {
//     const component = mount(<Recipe/>);
//     expect(component.exists('button#submit')).toBe(true);
//     });
//     it('has message list', () => {
//     const component = mount(<MessageApp/>);
//     expect(component.exists('ul#message_list')).toBe(true);
//     });
 })