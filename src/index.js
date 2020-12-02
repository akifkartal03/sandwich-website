import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import * as serviceWorker from './serviceWorker';
import AllRecipes from './components/AllRecipesPage/AllRecipes'
import Recipe from './components/RecipePage/Recipe';

import Footer from './components/HomePage/Footer';
import Header from './components/HomePage/Header';
import Main from './components/HomePage/Main';

const routing = (
    <BrowserRouter>
      <div>
        <Header/>
        <Switch>
            <Route path="/" exact component={App}/>
            <Route path="/allrecipespage" exact component={AllRecipes}/>
            <Route path="/recipe/:id" exact component={Recipe}/>
        </Switch>
        <Footer />
      </div>
    </BrowserRouter>
  );

ReactDOM.render(        
    routing,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
