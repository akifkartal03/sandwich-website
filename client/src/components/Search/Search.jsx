import React from 'react';
import SearchBar from './SearchBar';
import ShowResults from '../AllRecipesPage/ShowRecipies';
const Search = ({ recipes, param }) => {
    var counter = 0;
    var results = [];
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
        if (counter >= element.ingredients.length * 0.7) {
            results.push(element);
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
            if(isExist(counter)){
            <ShowResults recipies={results}/>
            }
            else{
                <h1>There is no recipe</h1>
            }
        </div>
    );
};

export default Search;
