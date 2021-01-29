import React from 'react';
import FuzzySearch from 'fuzzy-search';
import SearchBar from './SearchBar';
import ShowResults from '../AllRecipesPage/ShowRecipies';
import ErrorPage from '../Error_Page/NotFound';
const Search = ({ recipes, param }) => {
    var counter = 0;
    var results = [];
    var isFound = false;

    param = param.replace(/%20/g, ' ');

    if (param.includes(',')) {
        searchByIngredient();
    } else {
        searchByRecipe();
    }

    function searchByIngredient() {
        var searchList = param.toLowerCase().split(',');
        for (var i = 0; i < searchList.length; i++) {
            searchList[i] = searchList[i]
                .trim()
                .replace(/(^\w{1})|(\s+\w{1})/g, letter =>
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
    }
    function searchByRecipe() {
        const searcher = new FuzzySearch(
            recipes,
            ['category','name', 'ingredients'],
            {
                sort: true
            }
        );
        const result = searcher.search(param);
        console.log("res= " + result);

        result.forEach(element => {
            results.push(element);
        });
        if(results.length !== 0) {
            isFound = true;
        }
    }
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
