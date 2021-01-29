import React from "react";
import Home from "../Error_Page/Redirect";
import NoFav from "./NoFav";
import { useStore } from "../../contextAPI/store/Provider";

const NfDirect = () => {
	const [{ isLogged }, dispatch] = useStore();
	console.log(dispatch);
	return (
		<div className="container">
			{isLogged ? <NoFav/>  : <Home/>}
		</div>
	);
};

export default NfDirect;