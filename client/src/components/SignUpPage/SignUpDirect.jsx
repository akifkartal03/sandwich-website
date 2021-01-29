import React from "react";
import SignUP from "./SignUpPage";
import Home from "../Error_Page/Redirect";
import { useStore } from "../../contextAPI/store/Provider";

const SuDirect = () => {
	const [{ isLogged }, dispatch] = useStore();
	console.log(dispatch);
	return (
		<div className="container">
			{isLogged ? <Home/>  : <SignUP/>}
		</div>
	);
};

export default SuDirect;