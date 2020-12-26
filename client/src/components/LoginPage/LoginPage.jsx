import './LoginPage.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Message from './Massage';
import Error from './Error';
import UserDataService from '../../services/UserServices';
import loginImg from './login.png';
import {
    COMMON_FIELDS,
    REGISTRATION_FIELDS,
    LOGIN_FIELDS,
    LOGIN_MESSAGE,
    ERROR_IN_LOGIN
} from './MassageBundle';
class LoginPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            user_name: '',
            password: '',
            error: false,
            loginSuccess: false
        };
    }

    handleOnChangeUserName = e => {
        this.setState({
            user_name: e.target.value
        });
    };

    handleOnChangePassword = e => {
        this.setState({
            password: e.target.value
        });
    };

    onSubmit = async e => {
        var loginResult = false;
        UserDataService.getByUsername(this.state.user_name)
            .then(response => {
                if (response.data !== null) {
                    if (response.data.password === this.state.password) {
                        loginResult = true;
                    }
                }
                if (loginResult !== true) {
                    this.setState({
                        error: true,
                        loginSuccess: false
                    });
                } else
                    this.setState({
                        loginSuccess: true,
                        error: false
                    });
            })
            .catch(e => {
                console.log(e);
            });
    };

    render() {
        const { loginSuccess, error } = this.state;
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
                <form onSubmit={this.onSubmit}>
                    <div>
                        <div className="fields">
                            <br />
                            <p> {COMMON_FIELDS.USER_NAME} </p>{' '}
                            <input
                                type="text"
                                name="Username"
                                onChange={this.handleOnChangeUserName}
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
                                onChange={this.handleOnChangePassword}
                                autoComplete="Password"
                                required
                            />
                        </div>

                        <br />
                        <div className="buttons">
                            <button
                                type="button"
                                onClick={this.onSubmit}
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
    }
}
export default LoginPage;
