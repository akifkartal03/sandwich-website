import '../LoginPage/LoginPage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../../contextAPI/store/Provider';
import { setUSer } from '../../contextAPI/actions/LoginAction';
import { useHistory } from 'react-router-dom';
import { COMMON_FIELDS, REGISTRATION_FIELDS } from '../LoginPage/MassageBundle';
import UserServices from '../../services/UserServices';
toast.configure();
const SignUP = () => {
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');
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
    };

    const handleOnChangeLastName = e => {
        setLastName(e.target.value);
    };

    const handleOnChangeUserName = e => {
        setUserName(e.target.value);
    };

    const handleOnChangePassword = e => {
        setPassword(e.target.value);
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
        <div className="Login">
            <div className="loginImage">
                <img
                    src="https://i.ibb.co/NjvC3BB/signup.png"
                    width="240"
                    height="175"
                    style={{ position: 'relative', paddingTop: 15 }}
                    alt="login"
                />
            </div>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="fields">
                        <br />
                        <p> {COMMON_FIELDS.FIRST_NAME} </p>{' '}
                        <input
                            type="text"
                            value={first_name}
                            name="FirstName"
                            onChange={handleOnChangeFirstName}
                            required
                        />
                        (*)
                    </div>
                    <div className="fields">
                        <br />
                        <p> {COMMON_FIELDS.LAST_NAME} </p>
                        <input
                            type="text"
                            value={last_name}
                            name="LastName"
                            onChange={handleOnChangeLastName}
                            required
                        />
                        (*)
                    </div>
                    <div className="fields">
                        <br />
                        <p> {COMMON_FIELDS.USER_NAME} </p>{' '}
                        <input
                            type="text"
                            value={user_name}
                            name="Username"
                            onChange={handleOnChangeUserName}
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
                            value={password}
                            name="Password"
                            onChange={handleOnChangePassword}
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
                            onClick={onSubmit}
                            className="btn btn-primary"
                        >
                            {REGISTRATION_FIELDS.REGISTER}
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
