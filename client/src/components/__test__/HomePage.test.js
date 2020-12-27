import React from 'react';
import ReactDOM from 'react-dom';
import Footer from '../HomePage/Footer';
import Header from '../HomePage/Header';
import Main from '../HomePage/Main';
import Recipies from '../HomePage/Recipies';
import Enzyme from 'enzyme';
//import chai, {expect} from 'chai';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { mount,shallow } from 'enzyme';
import RecipieDataService from '../../services/RecipieService';
import { Button } from 'reactstrap';

Enzyme.configure({ adapter: new Adapter() });
describe('All Recipies Page Component Tests', () => {
    var all_recipies = [];
    let wrapper;
    const retrieveRecipies = () => {
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
    });
    it("renders without crashing", () => {
        const component = mount(<Recipies all_recipies={all_recipies}/>);
        expect(component).toMatchSnapshot();
      });
    it('renders footer html element', () => {
        wrapper = shallow(<Footer/>)
        expect(wrapper.find('footer')).exist;
    });
    it('Connection to github link is present', () => {
        wrapper = shallow(<Footer/>)
        expect(wrapper.find('a')).exist;
    });
    /*it('Renders header', () => {
        wrapper = shallow(<Header/>);
        expect(wrapper.find('header')).exist;
    });*/
    /*it('Links to other pages control', () => {
        wrapper = shallow(<Header/>);
        expect(wrapper.find('NavLink')).toHaveLength(2);
    }); */
    it('Renders main', () => {
        wrapper = shallow(<Main/>);
        expect(wrapper.find('main')).exist;
    });
    it('renders search input', () => {
        wrapper = shallow(<Main/>);
        expect(wrapper.find('Input')).exist;
    });
    it('goes to recipe page when button is pressed', () => {
        wrapper = shallow(<Recipies/>);
        expect(wrapper.find("Button")).exist;
    });

});
