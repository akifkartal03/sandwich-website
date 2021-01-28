import React, {Component,Suspense } from 'react';
import RecipieDataService from '../../services/RecipieService';
import ShowResults from './ShowFavorites';
import NoFav from './NoFav';
import Title from './Title';
import './cont.css';
class ListFav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            isget: false,
            number:0
        };
    }
    retrieveRecipes = () => {
        this.props.recipies.forEach(recipie1 => {
            RecipieDataService.get(recipie1)
                .then(response => {
                    this.state.recipes.push(response.data);
                    this.setState({ recipes: this.state.recipes, isget: true });
                })
                .catch(e => {
                    console.log(e);
                });
        });
        this.setState({ isget: true,number:this.props.recipies.length });
    };
    componentDidMount() {
        this.retrieveRecipes();
    }
    render() {
        return (
            <div className="container">
                <Suspense fallback={<h1>Loading recipes...</h1>}>
                    <Title/>
                    {this.state.number!==0 ?<ShowResults recipies={this.state.recipes} />:<NoFav/>}
                </Suspense>
            </div>
        );
    }
}
export default ListFav;
