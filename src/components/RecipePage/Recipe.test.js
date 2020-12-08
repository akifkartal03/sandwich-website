import React from 'react';
import Enzyme from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Recipe from './Recipe';
import { mount,shallow} from 'enzyme'
import RecipieDataService from '../../services/RecipieService';

Enzyme.configure({ adapter: new Adapter() });

describe('Reipe test', () => {
    let wrapper;
    var recipe = [];
    var all_recipies = [];
  

    const retrieveRecipies = () => {
        RecipieDataService.get("5fb6ebdd74615f41ace9cd80")
            .then(response => {
                recipe.join=(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const retrieveRecipiesAll = () => {
        RecipieDataService.getAll()
            .then(response => {
                all_recipies.join(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    beforeEach(() => {
        retrieveRecipies();
        retrieveRecipiesAll();
    })
 
    it('renders without crashing', () => {
        const component = mount(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(component).toMatchSnapshot();
      });

    it('Recipe class control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('div.Recipe')).toHaveLength(2);
      });
    it('recipe name class control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('h3.Recipe-name')).toHaveLength(2);
    });  
    it('recipe direction class control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('div.Recipe-directions')).toHaveLength(2);
    });    
    it('small recipeis class control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('div.SmallRecipeies')).toHaveLength(2);
    });    
    it('default view control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('Default')).exist;
    });    
    it('ingredient control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('div.IngredientInfo')).toHaveLength(2);
    });    
    it('mobileortablet  view control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('MobileorTablet')).exist;
    });   
    it('imagesmall id control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('div#imagesmall')).toHaveLength(6);
    });
    it('image id control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('elemnt#image')).toHaveLength(2);
    });
    it('title class control', () => {
        wrapper = shallow(<Recipe recipe={recipe} all_recipies={all_recipies}/>);
        expect(wrapper.find('div.title')).toHaveLength(2);
    });  
    

});   


