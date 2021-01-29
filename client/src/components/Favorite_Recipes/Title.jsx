import React from 'react';
import './cont.css';
const Title = () => {
    return (
        <div id="outer" >
            <div id="inner">
            <h2
                style={{
                    color: '#af1507',
                    fontWeight: 'bolder',
                    textAlign: 'center',
                    marginRight:"10px",
                }}
            >
                Your Favorite Recipes
            </h2>
            <img
                src="https://i.ibb.co/PCVxnbm/list.png"
                width="50"
                style={{ marginLeft: '10px'}}
                alt="login"
            />
            </div>
        </div>
    );
};

export default Title;
