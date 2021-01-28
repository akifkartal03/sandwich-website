import './LoginPage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import UserDataService from '../../services/UserServices';
import {useStore} from '../../contextAPI/store/Provider';
import {setUSer} from '../../contextAPI/actions/LoginAction';
import { useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
    COMMON_FIELDS,
    REGISTRATION_FIELDS,
    LOGIN_FIELDS,
} from './MassageBundle';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
const eye = <FontAwesomeIcon icon={faEye} />;
toast.configure();
const LoginPage = () => {
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [passwordShown, setPasswordShown] = useState(false);
    const [{isLogged},dispatch] = useStore();
    const [curUser, setCurUser] = useState('');
    console.log(isLogged);
    let history = useHistory();
    const handleOnChangeUserName = e => {
        setUserName(e.target.value);
    };
    const handleOnChangePassword = e => {
        setPassword(e.target.value);
    };
    const togglePasswordVisibility = () => {
        setPasswordShown(passwordShown ? false : true);
    };
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
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined
        });
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
    const onSubmit = async e => {
        var loginResult = false;
        UserDataService.getByUsername(username)
            .then(response => {
                if (response.data !== null) {
                    if (decrypt(response.data.password) === password) {
                        loginResult = true;
                        notifySuccess("Login Success");
                    }
                }
                if (loginResult !== true) {
                    notifyError("Your Username or Password Wrong!");
                } else {
                    setCurUser(response.data)
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
                    src="https://i.ibb.co/7RnSY8k/login2.png"
                    width="200"
                    style={{ position: 'relative', paddingTop: 25,paddingBottom:40 }}
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
                            data-testid="input1"
                            required
                        />
                    </div>
                    <div className="fields">
                        <br />
                        <p> {COMMON_FIELDS.PASSWORD} </p>
                        <input
                            type={passwordShown ? "text" : "password"}
                            name="Password"
                            onChange={handleOnChangePassword}
                            autoComplete="Password"
                            data-testid="input2"
                            required
                        />
                        <i onClick={togglePasswordVisibility}>{eye}</i>
                    </div>

                    <br />
                    <div className="buttons">
                        <button
                            type="button"
                            data-testid="loginbutton"
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
        </div>
    );
};
export default LoginPage;
