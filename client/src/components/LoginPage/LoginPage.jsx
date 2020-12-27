import './LoginPage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Message from './Massage';
import Error from './Error';
import UserDataService from '../../services/UserServices';
import loginImg from './login.png';
import {useStore} from '../../contextAPI/store/Provider';
import {setUSer} from '../../contextAPI/actions/LoginAction';
import { useHistory } from 'react-router-dom';
import {
    COMMON_FIELDS,
    REGISTRATION_FIELDS,
    LOGIN_FIELDS,
    LOGIN_MESSAGE,
    ERROR_IN_LOGIN
} from './MassageBundle';
const LoginPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [loginSuccess, setloginSuccess] = useState(false);
    const [store,dispatch] = useStore();
    let history = useHistory();
    const handleOnChangeUserName = e => {
        setUserName(e.target.value);
    };
    const handleOnChangePassword = e => {
        setPassword(e.target.value);
    };
    const onSubmit = async e => {
        var loginResult = false;
        UserDataService.getByUsername(username)
            .then(response => {
                if (response.data !== null) {
                    if (response.data.password === password) {
                        loginResult = true;
                    }
                }
                if (loginResult !== true) {
                    setError(true);
                    setloginSuccess(false);
                } else {
                    setError(false);
                    setloginSuccess(true);
                    dispatch(setUSer(response.data));
                    history.push("/");
                }
            })
            .catch(e => {
                console.log(e);
            });
    };
    return (
        <div className="Login">
            <div className="loginImage">
                <img
                    src={loginImg}
                    width="300"
                    style={{ position: 'relative', paddingTop: 5 }}
                    alt="login"
                />
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="fields">
                        <br />
                        <p> {COMMON_FIELDS.USER_NAME} </p>{' '}
                        <input
                            type="text"
                            name="Username"
                            onChange={handleOnChangeUserName}
                            autoComplete="Username"
                            required
                        />
                    </div>
                    <div className="fields">
                        <br />
                        <p> {COMMON_FIELDS.PASSWORD} </p>
                        <input
                            type="password"
                            name="Password"
                            onChange={handleOnChangePassword}
                            autoComplete="Password"
                            required
                        />
                    </div>

                    <br />
                    <div className="buttons">
                        <button
                            type="button"
                            onClick={onSubmit}
                            className="btn btn-primary"
                        >
                            {LOGIN_FIELDS.LOGIN}
                        </button>
                        {'    '}
                        <Link to="/signup">{REGISTRATION_FIELDS.REGISTER} </Link>
                    </div>
                </div>
            </form>
            <br />
            {loginSuccess && <Message message={LOGIN_MESSAGE} />}
            {error && <Error message={ERROR_IN_LOGIN} />}
        </div>
    );
};
export default LoginPage;
