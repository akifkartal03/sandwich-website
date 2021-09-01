import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import * as serviceWorker from './serviceWorker';
import { StateProvider } from './contextAPI/store/Provider';
import { initialState, reducer } from './contextAPI/reducers/LoginReducer';
ReactDOM.render(
    <StateProvider reducer={reducer} initialValue={initialState}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </StateProvider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
