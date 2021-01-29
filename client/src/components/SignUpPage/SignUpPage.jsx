import './SignUpPage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../../contextAPI/store/Provider';
import { setUSer } from '../../contextAPI/actions/LoginAction';
import { useHistory } from 'react-router-dom';
import { REGISTRATION_FIELDS } from '../LoginPage/MassageBundle';
import UserServices from '../../services/UserServices';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
toast.configure();
const SignUP = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [store, dispatch] = useStore();
    console.log(store);
    let history = useHistory();
    const notifyError = e =>
        toast.error(e, {
            position: 'bottom-center',
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    const notifySuccess = e =>
        toast.success(e, {
            position: 'top-right',
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
    const encrypt = pass => {
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
    const handleOnChangeFirstName = e => {
        setFirstName(e.target.value);
        validateFirstName();
    };

    const handleOnChangeLastName = e => {
        setLastName(e.target.value);
        validateLastName();
    };

    const handleOnChangeUserName = e => {
        setUserName(e.target.value);
        validateUserName();
    };

    const handleOnChangePassword = e => {
        setPassword(e.target.value);
        validatePassword();
    };
    const validateFirstName = () => {
        setFirstNameError(first_name.length > 0 ? null : 'First Name cannot be empty!');
    };

    const validateLastName = () => {
        setLastNameError(last_name.length > 0 ? null : 'Last Name cannot be empty!');
    };
    const validateUserName = () => {
        setUserNameError(user_name.length > 0 ? null : 'Username cannot be empty!');
    };

    const validatePassword = () => {
        setPasswordError(password.length > 5 ? null : 'Please Enter at least 6 characters!');
    };
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const onSubmit = async e => {
        if (user_name.length === 0) {
            notifyError('Enter a valid username');
        } else if (first_name.length === 0) {
            notifyError('Enter a valid First Name');
        } else if (last_name.length === 0) {
            notifyError('Enter a valid Last Name');
        } else {
            UserServices.getByUsername(user_name) //control
                .then(response => {
                    if (response.data === null) {
                        if (password.length > 5) {
                            const data = {
                                name: first_name,
                                surname: last_name,
                                username: user_name,
                                password: encrypt(password),
                                favoriteRecipes: []
                            };
                            UserServices.create(data) //add
                                .then(response => {
                                    delay(5000);
                                    UserServices.getByUsername(data.username)
                                        .then(response => {
                                            if (response.data !== null) {
                                                console.log(response.data);
                                                notifySuccess('Your Account created!');
                                                dispatch(setUSer(response.data));
                                                history.push('/');
                                            }
                                        })
                                        .catch(e => {
                                            console.log(e);
                                        });
                                })
                                .catch(e => {
                                    console.log(e);
                                });
                        } else {
                            notifyError('Password too short!');
                        }
                    } else {
                        notifyError('This username already taken!');
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };

    return (
        <div className="SignUp">
            <div className="loginImage">
                <img
                    src="https://i.ibb.co/GQVfRg9/Sandwich2-removebg-preview.png"
                    width="280"
                    height="200"
                    style={{ position: 'relative', paddingTop: 10 }}
                    alt="login"
                />
            </div>
            <br />
            <form onSubmit={onSubmit}>
                <div>
                    <div className="fields">
                        <br />
                        <input
                            type="text"
                            placeholder={`${firstNameError ? firstNameError : 'First Name'}`}
                            value={first_name}
                            className={`${firstNameError ? 'error' : ''}`}
                            name="FirstName"
                            onChange={handleOnChangeFirstName}
                            onBlur={validateFirstName}
                            required
                        />

                    </div>
                    <div className="fields">
                        <br />
                        <input
                            type="text"
                            value={last_name}
                            className={`${lastNameError ? 'error' : ''}`}
                            placeholder={`${lastNameError ? lastNameError : 'Last Name'}`}
                            name="LastName"
                            onChange={handleOnChangeLastName}
                            onBlur={validateLastName}
                            required
                        />

                    </div>
                    <div className="fields">
                        <br />
                        <input
                            type="text"
                            value={user_name}
                            name="Username"
                            placeholder={`${userNameError ? userNameError : 'Username'}`}
                            className={`${userNameError ? 'error' : ''}`}
                            onChange={handleOnChangeUserName}
                            onBlur={validateUserName}
                            autoComplete="Username"
                            required
                        />

                    </div>
                    <div className="pass-wrapper">
                        <br />
                        <input
                            type={passwordShown ? "text" : "password"}
                            value={password}
                            name="Password"
                            placeholder={`${passwordError ? passwordError : 'Password'}`}
                            className={`${passwordError ? 'error' : ''}`}
                            onChange={handleOnChangePassword}
                            onBlur={validatePassword}
                            autoComplete="password"
                            required
                        />
                        <i className="pass" onClick={togglePasswordVisibility}>{eye}</i>

                        <br />
                    </div>

                    <br />
                    <div className="buttons">
                        <button
                            style={{ marginRight: 20 }}
                            type="button"
                            onClick={onSubmit}
                            className="btn btn-primary"
                        >
                            <strong>{REGISTRATION_FIELDS.REGISTER}</strong>
                        </button>
                        {'    '}
                        <Link to="/">{} Cancel </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default SignUP;
