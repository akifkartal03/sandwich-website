import React from 'react';
import SearchBar from './SearchBar';
import ShowResults from '../AllRecipesPage/ShowRecipies';
import ErrorPage from '../Error_Page/NotFound';
const Search = ({ recipes, param }) => {
    var counter = 0;
    var results = [];
    var isFound = false;
    var searchList = param.toLowerCase().split(',');
    for (var i = 0; i < searchList.length; i++) {
        searchList[i] = searchList[i].replace(/%20/g, ' ').trim();
        searchList[i] = searchList[i].replace(/(^\w{1})|(\s+\w{1})/g, letter =>
            letter.toUpperCase()
        );
    }
    recipes.forEach(element => {
        counter = 0;
        searchList.forEach(val => isInclude(element, val));
        if (counter >= searchList.length * 0.7) {
            results.push(element);
            isFound = true;
        }
    });
    function isInclude(element, val) {
        if (element.ingredients.includes(val)) {
            counter = counter + 1;
        }
    }
    return (
        <div className="container">
            <SearchBar />
            {isFound ? <ShowResults recipies={results} /> : <ErrorPage />}
        </div>
    );
};

export default Search;
