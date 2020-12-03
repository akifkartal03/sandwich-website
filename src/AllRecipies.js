import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import AllRecipies from './components/AllRecipesPage/AllRecipes';
import Header from './components/HomePage/Header';
import './App.css';

export default class Example extends React.Component {
    constructor(props) {
        super(props);

        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.state = {
            collapsed: true,
        };
    }
    toggleNavbar() {
        this.setState({
            collapsed: !this.state.collapsed,
        });
    }
    render() {
        return (
            <div>
                <AllRecipies/>
            </div>
        );
    }
}