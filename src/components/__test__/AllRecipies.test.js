import React from 'react';
import ReactDOM from 'react-dom';
import All from '../AllRecipesPage/AllRecipies';
import Filter from '../AllRecipesPage/FilterBox';
import RecipieList from '../AllRecipesPage/RecipeList';
import ShowRecipies from '../AllRecipesPage/ShowRecipies';
import Enzyme from 'enzyme';
//import chai, {expect} from 'chai';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme';
import RecipieDataService from '../../services/RecipieService';
Enzyme.configure({ adapter: new Adapter() });
describe('All Recipies Page Component Tests', () => {
    var brands = [];
    var recipes = [];
    let wrapper;
    const retrieveBrands = () => {
        RecipieDataService.getCategories()
        .then(response => {
            brands.join(response.data)
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    beforeEach(() => {
        retrieveBrands();
    
    });
    it("renders without crashing", () => {
        const component = mount(<Filter brands={brands}/>);
        expect(component).toMatchSnapshot();
      });
    it('renders checkbox name', () => {
        wrapper = shallow(<Filter brands={brands}/>)
        expect(wrapper.find('input.custom-checkbox__input')).exist;
    });
    it('renders filter title', () => {
        wrapper = shallow(<Filter brands={brands}/>)
        expect(wrapper.find('h3.filter_title').text()).toEqual("Categories");
    });
    it('renders row', () => {
        wrapper = shallow(<Filter brands={brands}/>)
        expect(wrapper.find('input.custom-checkbox__input')).exist;
    });

});
