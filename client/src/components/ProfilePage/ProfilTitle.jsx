import React from 'react';
import './cont.css';
const ProTitle = () => {
    return (
        <div id="outer" >
            <div id="inner">
            <h2
                style={{
                    color: '#af1507',
                    fontWeight: 'bolder',
                    textAlign: 'center',
                    marginRight:"20px",
                }}
            >
                Your Profile
            </h2>
            <img
                src="https://i.ibb.co/X7t208k/user.png"
                width="50"
                style={{ marginLeft: '10px'}}
                alt="login"
            />
            </div>
        </div>
    );
};

export default ProTitle;
