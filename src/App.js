import React, { Component } from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/HomePage/Main';
import Footer from './components/HomePage/Footer';

import './App.css';
import Header from './components/HomePage/Header';

export default class Example extends React.Component {
    // constructor(props) {
    //     super(props);

    //     this.toggleNavbar = this.toggleNavbar.bind(this);
    //     this.state = {
    //         collapsed: true,
    //     };
    // }

    // toggleNavbar() {
    //     this.setState({
    //         collapsed: !this.state.collapsed,
    //     });
    // }
    render() {
        return (
            <div>
                {/* <Header 
                    collapsed={this.state.collapsed}
                    toggleNavbar={this.toggleNavbar}
                /> */}
                <Main/>
                {/* <Footer /> */}
            </div>
        );
    }
}
