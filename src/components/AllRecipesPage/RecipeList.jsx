import React from 'react';
import Recipies from './ShowRecipies';
const RecipieList = ({ recipies }) => {
    
    return (
        <div className="col-lg-9">
            <div className="row">
                <div className="col-30">
                    <Recipies recipies={recipies} />
                </div>
            </div>
        </div>
    );
};
export default RecipieList;
