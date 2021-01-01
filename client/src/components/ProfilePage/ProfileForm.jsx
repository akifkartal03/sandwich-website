import '../LoginPage/LoginPage.css';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../LoginPage/login.png';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useStore } from '../../contextAPI/store/Provider';
import { setUSer } from '../../contextAPI/actions/LoginAction';
import { useHistory } from 'react-router-dom';
import { COMMON_FIELDS } from '../LoginPage/MassageBundle';
import UserServices from '../../services/UserServices';
import { clear } from '../../contextAPI/actions/LoginAction';

toast.configure();
const Profile = () => {
	const [{ user }, dispatch] = useStore();
	console.log(dispatch);

	const [first_name, setFirstname] = useState('');
	const [last_name, setLastName] = useState('');
	const [user_name, setUserName] = useState('');
	const [password, setPassword] = useState('');

	let history = useHistory();

	const notifyError = e => {
		toast.error(e, {
			position: 'bottom-center',
			autoClose: 5000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined
		});
	};

	const notifySuccess = e => {
		toast.success(e, {
			position: 'top-right',
			autoClose: 4000,
			hideProgressBar: false,
			closeOnClick: true,
			pauseOnHover: true,
			draggable: true,
			progress: undefined
		});
	};

	const encrypt = pass => {
		var number;
		var string = [];
		var c;

		for (var i = 0; i < pass.length; i++) {
			for (var j = 0; j < 3; j++) {
				do {
					number = Math.floor(Math.random() * (94 - 33) + 33);
				} while ((number >= 48 && number <= 57) || number === 44);
				c = String.fromCharCode(number);
				string.push(c);
			}
			string.push(pass.charCodeAt(i) - 19);
		}
		
		return string.join('');
	};

	const handleOnChangeFirstName = e => {
		setFirstname(e.target.value);
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
		let tempUser = {
			name: user.name,
			surname: user.surname,
			username: user.username,
			password: user.password, // password comes from db without decryption, so we don't need to encrypt, it is already encrypted
			favoriteRecipes: user.favoriteRecipes
		}

		console.log(tempUser);
		console.log(user);

		if (user_name.length !== 0) {
			UserServices.getByUsername(user_name)
				.then(response => {
					if(response.data === null) {
						tempUser.username = user_name;
						notifySuccess("Your username has been successfully updated.");
					} else {
						notifyError("This username is already in use. Please try another username.");
					}
				})
				.catch(e => {
					console.log(e);
				});
		}

		if (first_name.length !== 0) {
			tempUser.name = first_name;
			notifySuccess("Your name has been successfully updated.");
		}

		if (last_name.length !== 0) {
			tempUser.surname = last_name;
			notifySuccess("Your surname has been successfully updated.");
		}

		if (password.length > 5) {
			tempUser.password = encrypt(password);
			notifySuccess("Your password has been successfully updated.");
		} else if (password.length > 0 && password.length < 6) {
			notifyError("Your password must be at least 6 characters.");
		}

		console.log(user);

		UserServices.update(user._id, tempUser)
			.then(response => {
				delay(5000);
				console.log(tempUser);
				UserServices.getByUsername(tempUser.username)
					.then(response => {
						console.log(response.data);
						dispatch(clear());
						dispatch(setUSer(response.data));
						history.push("/");
					})
					.catch(e => {
						console.log(e);
					});
			})
			.catch(e => {
				console.log(e);
			});
	};

	return (
		<div className="profile">
			<div className="profileImage">
				<img
					src={loginImg}
					width="300"
					height="160"
					style={{ position: 'relative', paddingTop: 5}}
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
export default Profile;