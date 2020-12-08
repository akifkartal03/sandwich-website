import RecipieDataService from '../../services/RecipieService';
import React, { useState, useEffect } from 'react';
import Recipe from './Recipe'

const RecipeData = () => {
    const [recipe, setRecipies] = useState([]);

    const [all_recipies, setRecipiesAll] = useState([]);

    const id = window.location.pathname.split('/')[
        window.location.pathname.split('/').length - 1
    ];

    useEffect(() => {
        retrieveRecipies();
        retrieveRecipiesAll();
    }, []);

    const retrieveRecipies = () => {
        RecipieDataService.get(id)
            .then(response => {
                setRecipies(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const retrieveRecipiesAll = () => {
        RecipieDataService.getAll()
            .then(response => {
                setRecipiesAll(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div>
            <Recipe recipe={recipe} all_recipies={all_recipies}/>
        </div>


    );

};
export default RecipeData;