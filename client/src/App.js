import React from 'react';
import {Route, Switch, } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/HomePage/Main';
import Footer from './components/HomePage/Footer';
import Header from './components/HomePage/Header';
import './Filter.css';
import './App.css';
import AllRecipies from './components/AllRecipesPage/AllRecipies';
import Recipe from './components/RecipePage/RecipeData';
import SearchData from './components/Search/SearchData'
import ErrorPage from './components/Error_Page/Error'
import LoginPage from './components/LoginPage/LoginPage';
export default class Example extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/recipe/:id" exact component={Recipe} />
                    <Route path="/allrecipespage" component={AllRecipies} />
                    <Route path="/search" component={SearchData} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/notFound" component={ErrorPage} />
                </Switch>
                <Footer />
            </div>
        );
    }
}
