import React from "react";
import Login from "../LoginPage/LoginPage";
import ProfileForm from "./ProfileForm";
import { useStore } from "../../contextAPI/store/Provider";

const Profile = () => {
	const [{ isLogged }, dispatch] = useStore();
	console.log(dispatch);
	return (
		<div className="container">
			{isLogged ? <ProfileForm/> : <Login/>}
		</div>
	);
};

export default Profile;