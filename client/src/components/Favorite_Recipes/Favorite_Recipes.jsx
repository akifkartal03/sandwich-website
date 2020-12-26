import React, { useEffect, useState, useLayoutEffect } from 'react';
import RecipieDataService from '../../services/RecipieService';
import Login from '../LoginPage/LoginPage';
import ListFavorites from './ListFavorites';
import { useStore } from '../../contextAPI/store/Provider';
const FavRecipes = () => {
    const [{ isLogged, user }, dispatch] = useStore();
    return (
        <div className="container">
            {isLogged ? <ListFavorites recipies={user.favoriteRecipes} /> : <Login />}
        </div>
    );
};

export default FavRecipes;
