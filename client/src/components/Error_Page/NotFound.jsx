import React from 'react';
import errImg from './img.png'
const NoFav = () => {
    return (
        <div className="container">
            <h3 className="head" style={{textAlign:'left',color: 'black', fontWeight: 'bolder'}}>There is no recipe with your ingredients! </h3>
            <br/><img src={errImg} width="100" style={{position: 'relative'}} alt="login"/>
        </div>
    );
};

export default NoFav;