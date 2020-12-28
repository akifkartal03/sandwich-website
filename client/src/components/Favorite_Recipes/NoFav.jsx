import React from 'react';
import errImg from './addFav.png'
import { Button } from 'reactstrap';
import { NavLink as RouterNavLink } from 'react-router-dom';
const NoFav = () => {
    return (
        <div className="container">
            <br/><h3 className="head" style={{textAlign:'left',color: 'black', fontWeight: 'bolder'}}>You don't have any favorite recipe! </h3>
            <br/><img src={errImg} width="120" style={{position: 'relative'}} alt="login"/>
            <br/><br/><h5 className="head" style={{textAlign:'left',color: 'black', fontWeight: 'bolder'}}>To add just click heart button. </h5>
            <br/><br/><Button className="buttonMy" color="link" tag={RouterNavLink} to="/"><strong>Return to Home Page</strong></Button>
        </div>
    );
};

export default NoFav;