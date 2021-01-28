import React from "react";
import Login from "../LoginPage/LoginPage";
import Home from "../Error_Page/Redirect";
import { useStore } from "../../contextAPI/store/Provider";

const LoginDirect = () => {
	const [{ isLogged }, dispatch] = useStore();
	console.log(dispatch);
	return (
		<div className="container">
			{isLogged ? <Home/>  : <Login/>}
		</div>
	);
};

export default LoginDirect;