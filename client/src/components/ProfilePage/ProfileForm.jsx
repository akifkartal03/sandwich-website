import '../LoginPage/LoginPage.css';
import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../../contextAPI/store/Provider';
import { setUSer } from '../../contextAPI/actions/LoginAction';
import { useHistory } from 'react-router-dom';
import { COMMON_FIELDS } from '../LoginPage/MassageBundle';
import UserServices from '../../services/UserServices';
import Title from "./ProfilTitle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
toast.configure();
const ProfileForm = () => {
	const [{user}, dispatch] = useStore();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [firstNameError, setFirstNameError] = useState('');
    const [lastNameError, setLastNameError] = useState('');
    const [userNameError, setUserNameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    console.log(dispatch);
	let history = useHistory();
	useEffect(() => {
		setFirstName(user.name);
		setLastName(user.surname);
		setUserName(user.username);
    }, []);
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
        setPasswordError(password.length > 5 || password.length === 0 ? null : 'Please Enter at least 6 characters!');
    };
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const onSubmit = async e => {
        if (user_name.length === 0) {
            notifyError('Enter a valid username');
        } else if (first_name.length === 0) {
            notifyError('Enter a valid first name');
        } else if (last_name.length === 0) {
            notifyError('Enter a valid last name');
        } else if (first_name === user.name && last_name === user.surname && user_name === user.username && password.length === 0) {
            notifyError('You don\'t changed anything');
        } else {
            UserServices.getByUsername(user_name) //control
                .then(response => {
                    if (response.data === null || user_name === user.username) {
                        if (password.length > 5 || password.length === 0) {
                            const data = {
                                name: first_name,
                                surname: last_name,
                                username: user_name,
                                password: password.length > 5 ? encrypt(password) : user.password,
                                favoriteRecipes: user.favoriteRecipes
                            };
                            UserServices.update(user._id,data) //update
                                .then(response => {
                                    delay(1000);
                                    UserServices.getByUsername(data.username)
                                        .then(response => {
                                            if (response.data !== null) {
                                                console.log(response.data);
                                                notifySuccess('Your Information has been updated!');
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
            <div className="container">
				<Title/>
            </div>
            <br/>
            <form onSubmit={onSubmit}>
                <div>
                    <div className="fields">
                        <br />
                        <p> { COMMON_FIELDS.FIRST_NAME } </p>
                        <input
                            type="text"
                            placeholder={`${firstNameError ? firstNameError : 'First Name'}`}
                            value={first_name}
                            className={`${firstNameError ? 'error' : ''}`}
                            name="FirstName"
                            onChange={handleOnChangeFirstName}
                            onBlur={validateFirstName}
                            defaultValue={first_name}
                            required
                        />

                    </div>
                    <div className="fields">
                        <br />
                        <p> { COMMON_FIELDS.LAST_NAME } </p>
                        <input
                            type="text"
                            value={last_name}
                            className={`${lastNameError ? 'error' : ''}`}
                            placeholder={`${lastNameError ? lastNameError : 'Last Name'}`}
                            name="LastName"
                            onChange={handleOnChangeLastName}
                            onBlur={validateLastName}
                            defaultValue={last_name}
                            required
                        />

                    </div>
                    <div className="fields">
                        <br />
                        <p> { COMMON_FIELDS.USER_NAME } </p>
                        <input
                            type="text"
                            value={user_name}
                            name="Username"
                            placeholder={`${userNameError ? userNameError : 'Username'}`}
                            className={`${userNameError ? 'error' : ''}`}
                            onChange={handleOnChangeUserName}
                            onBlur={validateUserName}
                            autoComplete="Username"
                            defaultValue={user_name}
                            required
                        />

                    </div>
                    <div className="pass-wrapper">
                        <br />
                        <p> { COMMON_FIELDS.PASSWORD } </p>
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
                            type="button"
                            onClick={onSubmit}
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                        {'    '}
                        <Link to="/">{} Cancel </Link>
                    </div>
                </div>
            </form>
        </div>
    );
};
export default ProfileForm;