import React, { useState, useEffect } from 'react';
import Recipies from './ShowRecipies';
import RecipieDataService from '../../services/RecipieService';
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
