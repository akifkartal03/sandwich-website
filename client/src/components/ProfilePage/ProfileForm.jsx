import '../LoginPage/LoginPage.css';
import React, { useState,useEffect } from 'react';
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
    const [passwordShown, setPasswordShown] = useState(false);
    console.log(dispatch);
	let history = useHistory();
	useEffect(() => {
		setFirstName(user.name);
		setLastName(user.surname);
		setUserName(user.username);
		setPassword(decrypt(user.password));
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
	const decrypt = encPass => {
        var string = [];
        var string1 = [];
        var c;
        for (var i = 0; i < encPass.length; i++) {
            c = encPass.charAt(i);
            if (c.charCodeAt(0) > 47 && c.charCodeAt(0) < 58) {
                do {
                    string.push(c);
                    i = i + 1;
                    if (i < encPass.length) {
                        c = encPass.charAt(i);
                    } else {
                        break;
                    }
                } while (c.charCodeAt(0) > 47 && c.charCodeAt(0) < 58);
                string1.push(
                    String.fromCharCode(parseInt(string.join('')) + 19)
                );
                string = [];
            }
        }
        return string1.join('');
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
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };
    const delay = ms => new Promise(res => setTimeout(res, ms));
    const onSubmitFirstName = async e => {
        if (first_name.length === 0 || first_name === user.name) {
            notifyError('Enter a valid first name');
        } else {
            const data = {
                name: first_name,
                surname: user.surname,
                username: user.username,
                password: user.password,
                favoriteRecipes: user.favoriteRecipes
            };
            UserServices.update(user._id, data)
                .then(response => {
                    delay(1000);
                    UserServices.getByUsername(data.username)
                        .then(response => {
                            console.log(response.data);
                            if (response.data !== null && response.data.name === first_name) {
                                notifySuccess("Your first name has been updated successfully");
                                dispatch(setUSer(response.data));
                                history.push('/');
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                });
        }
    };
    const onSubmitLastName = async e => {
        if (last_name.length === 0 || last_name === user.surname) {
            notifyError('Enter a valid last name');
        } else {
            const data = {
                name: user.name,
                surname: last_name,
                username: user.username,
                password: user.password,
                favoriteRecipes: user.favoriteRecipes
            };
            UserServices.update(user._id, data)
                .then(response => {
                    delay(1000);
                    UserServices.getByUsername(data.username)
                        .then(response => {
                            console.log(response.data);
                            if (response.data !== null && response.data.surname === last_name) {
                                notifySuccess("Your last name has been updated successfully");
                                dispatch(setUSer(response.data));
                                history.push('/');
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                });
        }
    };
    const onSubmitUsername = async e => {
        if (user_name.length === 0 || user_name === user.username) {
            notifyError('Enter a valid username');
        } else {
            UserServices.getByUsername(user_name)
                .then(response => {
                    if (response.data === null) {
                        const data = {
                            name: user.name,
                            surname: user.surname,
                            username: user_name,
                            password: user.password,
                            favoriteRecipes: user.favoriteRecipes
                        };
                        UserServices.update(user._id, data)
                            .then(response => {
                                delay(1000);
                                UserServices.getByUsername(data.username)
                                    .then(response => {
                                        console.log(response.data);
                                        if (response.data !== null) {
                                            notifySuccess('Your username has been updated successfully');
                                            dispatch(setUSer(response.data));
                                            history.push('/');
                                        }
                                    })
                                    .catch(e => {
                                        console.log(e);
                                    });
                            })
                    } else {
                        notifyError('This username has already taken');
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    };
    const onSubmitPassword = async e => {
        if (password.length < 6 || password.length === 0) {
            notifyError('Password must be at least 6 characters');
        } else {
            const data = {
                name: user.name,
                surname: user.surname,
                username: user.username,
                password: encrypt(password),
                favoriteRecipes: user.favoriteRecipes
            };
            UserServices.update(user._id, data)
                .then(response => {
                    delay(1000);
                    UserServices.getByUsername(data.username)
                        .then(response => {
                            console.log(response.data);
                            if (response.data !== null && decrypt(response.data.password) === password) {
                                notifySuccess("Your password has been updated successfully");
                                dispatch(setUSer(response.data));
                                history.push('/');
                            }
                        })
                        .catch(e => {
                            console.log(e);
                        });
                });
        }
    };

    return (
        <div className="Login">
            <div className="container">
				<Title/>
            </div>
            <form>
                <div>
                    <div className="fields">
                        <br />
                        <p> {COMMON_FIELDS.FIRST_NAME} </p>{' '}
                        <input
                            type="text"
                            defaultValue={user.name}
                            name="FirstName"
                            onChange={handleOnChangeFirstName}
                            required
                        />
                        (*)
                        <br />
                        <br />
                        <button
                            type="button"
                            onClick={onSubmitFirstName}
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                    </div>
                    <div className="fields">
                        <br />
                        <br />
                        <p> {COMMON_FIELDS.LAST_NAME} </p>
                        <input
                            type="text"
                            defaultValue={user.surname}
                            name="LastName"
                            onChange={handleOnChangeLastName}
                            required
                        />
                        (*)
                        <br />
                        <br />
                        <button
                            type="button"
                            onClick={onSubmitLastName}
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                    </div>
                    <div className="fields">
                        <br />
                        <br />
                        <p> {COMMON_FIELDS.USER_NAME} </p>{' '}
                        <input
                            type="text"
                            defaultValue={user.username}
                            name="Username"
                            onChange={handleOnChangeUserName}
                            autoComplete="Username"
                            required
                        />
                        (*)
                        <br />
                        <br />
                        <button
                            type="button"
                            onClick={onSubmitUsername}
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                    </div>
                    <div className="fields">
                        <br />
                        <br />
                        <p> {COMMON_FIELDS.PASSWORD} </p>
                        <input
                            type={passwordShown ? "text" : "password"}
                            name="Password"
                            onChange={handleOnChangePassword}
                            autoComplete="password"
                            required
                        />
                        (*)
                        <i onClick={togglePasswordVisibility}>{eye}</i>
                        <br />
                        (at least 6 character)
                        <br />
                        <button
                            type="button"
                            onClick={onSubmitPassword}
                            className="btn btn-primary"
                        >
                            Update
                        </button>
                    </div>


                </div>
            </form>
        </div>
    );
};
export default ProfileForm;
