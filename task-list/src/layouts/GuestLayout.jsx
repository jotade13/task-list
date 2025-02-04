import {Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/contextprovider";

export default function GuestLayout() {
	const {token} = useStateContext();

	if (token) {
		console.log(token);
		return <Navigate to="/tasks" />;
	}
	return <Outlet />;
}
