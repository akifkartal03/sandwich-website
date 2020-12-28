import React from 'react';
import Login from '../LoginPage/LoginPage';
import ListFavorites from './ListFavorites';
import { useStore } from '../../contextAPI/store/Provider';
const FavRecipes = () => {
    const [{ isLogged, user }, dispatch] = useStore();
    console.log(dispatch);
    return (
        <div className="container">
            {isLogged ? <ListFavorites recipies={user.favoriteRecipes} /> : <Login />}
        </div>
    );
};

export default FavRecipes;
