import React, { useEffect, useState } from 'react';
import RecipieDataService from '../../services/RecipieService';
import Search from './Search';

const SearchData = () => {
    const [recipes, setRecipes] = useState([]);

    useEffect(() => {
        getRecipes();
    }, []);

    const getRecipes = () => {
        RecipieDataService.getAll()
            .then(response => {
                setRecipes(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const searchParam = window.location.pathname.substring(8);

    console.log('Search param = ' + searchParam);
    return (
        <div>
            <Search recipes={recipes} param={searchParam} />
        </div>
    );
};

export default SearchData;
