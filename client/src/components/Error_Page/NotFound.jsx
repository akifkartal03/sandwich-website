import React from 'react';
const Error = () => {
    return (
        <div className="container">
            <h3 className="head" style={{textAlign:'left',color: 'black', fontWeight: 'bolder'}}>There is no recipe with your ingredients! </h3>
            <br/><img src="https://i.ibb.co/Ct81xDn/img.png" width="100" style={{position: 'relative'}} alt="login"/>

        </div>
    );
};

export default Error;