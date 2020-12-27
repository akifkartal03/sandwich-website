import '../LoginPage/LoginPage.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Message from '../LoginPage/Massage';
import Error from '../LoginPage/Error';
import loginImg from '../LoginPage/login.png';
import {
    COMMON_FIELDS,
    REGISTRATION_FIELDS,
    REGISTRATION_MESSAGE,
    ERROR_IN_REGISTRATION
} from '../LoginPage/MassageBundle';
import UserServices from '../../services/UserServices';
class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            first_name: '',
            last_name: '',
            user_name: '',
            password: '',
            register: false,
            error: false
        };
    }

    handleOnChangeFirstName = e => {
        this.setState({
            first_name: e.target.value
        });
    };

    handleOnChangeLastName = e => {
        this.setState({
            last_name: e.target.value
        });
    };

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
        if (this.state.user_name.length === 0) {
            console.log('error');
        } else {
            UserServices.getByUsername(this.state.user_name)
                .then(response => {
                    if (response.data === null) {
                        const data = {
                            name: this.state.first_name,
                            surname: this.state.last_name,
                            username: this.state.user_name,
                            password: this.state.password,
                            favoriteRecipes: []
                        };
                        if (data.password.length > 6) {
                            UserServices.create(data)
                                .then(response => {
                                    console.log('New user created');
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        } else console.log('Password too short');
                    } else console.log('Cannot create new user');
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    render() {
        const { register, error, user_name_taken } = this.state;

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
                            <p> {COMMON_FIELDS.FIRST_NAME} </p>{' '}
                            <input
                                type="text"
                                value={this.state.first_name}
                                name="FirstName"
                                onChange={this.handleOnChangeFirstName}
                                required
                            />
                        </div>
                        <div className="fields">
                            <br />
                            <p> {COMMON_FIELDS.LAST_NAME} </p>
                            <input
                                type="text"
                                value={this.state.last_name}
                                name="LastName"
                                onChange={this.handleOnChangeLastName}
                                required
                            />
                        </div>
                        <div className="fields">
                            <br />
                            <p> {COMMON_FIELDS.USER_NAME} </p>{' '}
                            <input
                                type="text"
                                // className={classNames ({error: user_name_taken})}
                                value={this.state.user_name}
                                name="Username"
                                onBlur={this.handleOnBlur}
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
                                value={this.state.password}
                                name="Password"
                                onChange={this.handleOnChangePassword}
                                autoComplete="password"
                                required
                            />
                        </div>

                        <br />
                        <div className="buttons">
                            <button
                                type="button"
                                onClick={this.onSubmit}
                                className="btn btn-primary"
                                disabled={user_name_taken}
                            >
                                {REGISTRATION_FIELDS.REGISTER}
                            </button>
                            {'    '}
                            <Link to="/">{} Cancel </Link>
                        </div>
                    </div>
                </form>
                <br /> {error && <Error message={ERROR_IN_REGISTRATION} />}{' '}
                {register && <Message message={REGISTRATION_MESSAGE} />}{' '}
            </div>
        );
    }
}
export default SignUpPage;
