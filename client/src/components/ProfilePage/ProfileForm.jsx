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
toast.configure();
const ProfileForm = () => {
	const [{user}, dispatch] = useStore();
    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [user_name, setUserName] = useState('');
    const [password, setPassword] = useState('');
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
                    if (response.data === null || user_name === user.username) {
                        if (password.length > 5) {
                            const data = {
                                name: first_name,
                                surname: last_name,
                                username: user_name,
                                password: encrypt(password),
                                favoriteRecipes: user.favoriteRecipes
                            };
                            UserServices.update(user._id,data) //update
                                .then(response => {
                                    delay(10000);
                                    UserServices.getByUsername(data.username)
                                        .then(response => {
                                            if (response.data !== null) {
                                                console.log(response.data);
                                                notifySuccess('Your Information Updated!');
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
            <form onSubmit={onSubmit}>
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
                    </div>
                    <div className="fields">
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
                    </div>
                    <div className="fields">
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
                    </div>
                    <div className="fields">
                        <br />
                        <p> {COMMON_FIELDS.PASSWORD} </p>
                        <input
                            type="password"
                            defaultValue={decrypt(user.password)}
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
