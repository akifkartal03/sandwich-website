import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/HomePage/Main';
import Footer from './components/HomePage/Footer';
import Header from './components/HomePage/Header';
import './BrandFilter.css';
import './App.css';
import AllRecipies from './components/AllRecipesPage/All';
import Recipe from './components/RecipePage/Recipe';
export default class Example extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <Switch>
                    <Route path="/" exact component={Main} />
                    <Route path="/recipe/:id" exact component={Recipe} />
                    <Route
                        path="/allrecipespage"
                        component={AllRecipies}
                    />
                </Switch>
                <Footer />
            </div>
        );
    }
}
