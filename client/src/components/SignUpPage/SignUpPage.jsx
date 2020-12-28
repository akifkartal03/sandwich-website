import '../LoginPage/LoginPage.css';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Message from '../LoginPage/Massage';
import Error from '../LoginPage/Error';
import loginImg from '../LoginPage/login.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    COMMON_FIELDS,
    REGISTRATION_FIELDS,
    REGISTRATION_MESSAGE,
    ERROR_IN_REGISTRATION
} from '../LoginPage/MassageBundle';
import UserServices from '../../services/UserServices';
toast.configure();
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
    notifyError = e =>
        toast.error(e, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    notifySuccess = e =>
        toast.success(e, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    encrypt = pass => {
        var number;
        var string = [];
        var c;
        for (var i = 0; i < pass.length; i++) {
            for (var j = 0; j < 3; j++) {
                do {
                    number = Math.floor(Math.random() * (94 - 33) + 33);
                } while ((number >= 48 && number <= 57) || number === 44); //don't create a number
                c = String.fromCharCode(number);
                string.push(c);
            }
            string.push(pass.charCodeAt(i) - 19);
        }
        return string.join('');
    };
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
            this.notifyError('Enter a valid username');
        } else if (this.state.first_name.length === 0) {
            this.notifyError('Enter a valid First Name');
        } else if (this.state.last_name.length === 0) {
            this.notifyError('Enter a valid Last Name');
        } else {
            UserServices.getByUsername(this.state.user_name)
                .then(response => {
                    if (response.data === null) {
                        if (this.state.password.length > 5) {
                            const data = {
                                name: this.state.first_name,
                                surname: this.state.last_name,
                                username: this.state.user_name,
                                password: this.encrypt(this.state.password),
                                favoriteRecipes: []
                            };
                            UserServices.create(data)
                                .then(response => {
                                    this.notifySuccess('Your Account created!');
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        } else {
                            this.notifyError('Password too short!');
                        }
                    } else {
                        this.notifyError('This username already taken!');
                    }
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
                        height="160"
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
                            (*)
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
                            (*)
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
                            (*)
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
                            (*)
                            <br />
                            (at least 6 character)
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
