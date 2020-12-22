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
import { Button } from 'reactstrap';

Enzyme.configure({ adapter: new Adapter() });
describe('All Recipies Page Component Tests', () => {
    var brands = [];
    var recipes = [];
    let wrapper;
    const retrieveBrands = () => {
        RecipieDataService.getCategories()
        .then(response => {
            brands.join(response.data);
            console.log(response.data);
        })
        .catch(e => {
            console.log(e);
        });
    };
    const retrieveRecipies = () => {
        RecipieDataService.getAll()
            .then(response => {
                recipes.join(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    beforeEach(() => {
        retrieveBrands();
        retrieveRecipies();
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
        wrapper = shallow(<ShowRecipies recipies={recipes}/>);
        expect(wrapper.find('Row.row')).exist;
    });
    it('renders card', () => {
        wrapper = shallow(<ShowRecipies recipies={recipes}/>);
        expect(wrapper.find('Card.mb-4 box-shadow')).exist;
    });
    it('renders recipe name', () => {
        wrapper = shallow(<ShowRecipies recipies={recipes}/>);
        expect(wrapper.find('CardText.cardText')).exist;
    });
    it('goes to /recipe/${recipie._id} when clicked', () => {
        wrapper = shallow(<ShowRecipies recipies={recipes}/>);
        expect(wrapper.find("Button.showButton")).exist;
    })

});
