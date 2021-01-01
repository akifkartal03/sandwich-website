import React, { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import Main from './components/HomePage/Main';
import Footer from './components/HomePage/Footer';
import Header from './components/HomePage/Header';
import './Filter.css';
import './App.css';
import AllRecipies from './components/AllRecipesPage/AllRecipies';
import Recipe from './components/RecipePage/RecipeData';
import SearchData from './components/Search/SearchData';
import Redirect from './components/Error_Page/Redirect';
import LoginPage from './components/LoginPage/LoginPage';
import SignUpPage from './components/SignUpPage/SignUpPage';
import Favorites from './components/Favorite_Recipes/Favorite_Recipes';
import Profile from './components/ProfilePage/ProfilePage'
import { useStore } from './contextAPI/store/Provider';
import { setUSer } from './contextAPI/actions/LoginAction';
const App = (props) => {
    const [store, dispatch] = useStore("");
    useEffect(() => {
        const localData = JSON.parse(localStorage.getItem('loginState'));
        if (localData.isLogged) {
            dispatch(setUSer(localData.user));
        }
    }, []);
    useEffect(() => {
        localStorage.setItem('loginState', JSON.stringify(store));
        console.log(store);
    });
    return (
        <div>
            <Header />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route path="/recipe/:id" exact component={Recipe} />
                <Route path="/allrecipespage" component={AllRecipies} />
                <Route path="/search" component={SearchData} />
                <Route path="/login" component={LoginPage} />
                <Route path="/signup" component={SignUpPage} />
                <Route path="/favorites" component={Favorites} />
                <Route path="/profile" component={Profile} />
                <Route path="" component={Redirect} />
            </Switch>
            <Footer />
        </div>
    );
};
export default App;
