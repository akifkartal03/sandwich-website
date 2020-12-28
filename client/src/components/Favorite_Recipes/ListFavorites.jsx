import React, {Component,Suspense } from 'react';
import RecipieDataService from '../../services/RecipieService';
import ShowResults from './ShowFavorites';
import './cont.css';
class ListFav extends Component {
    constructor(props) {
        super(props);

        this.state = {
            recipes: [],
            isget: false
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
        this.setState({ isget: true });
    };
    componentDidMount() {
        this.retrieveRecipes();
    }
    render() {
        return (
            <div className="container">
                <Suspense fallback={<h1>Loading recipes...</h1>}>
                    <br/><br/><ShowResults recipies={this.state.recipes} />
                </Suspense>
            </div>
        );
    }
}
export default ListFav;
