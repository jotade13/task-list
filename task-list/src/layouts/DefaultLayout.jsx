import {useNavigate, Navigate, Outlet} from "react-router-dom";
import {useStateContext} from "../contexts/contextprovider";

import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

export default function GuestLayout() {
	const {setToken} = useStateContext();
	const {token} = useStateContext();
	const navigate = useNavigate();

	const handleLogout = () => {
		setToken(null);
		navigate("/login");
	};

	if (!token) {
		console.log(token);
		return <Navigate to="/login" />;
	}

	return (
		<>
			<Box sx={{flexGrow: 2, mb: 5, display: "flex"}}>
				<AppBar position="static" color="inherit">
					<Toolbar>
						<Typography
							variant="h6"
							component="div"
							sx={{flexGrow: 2}}
						>
							Lista de Tareas
						</Typography>
						<Button variant="contained" onClick={handleLogout}>
							Salir
						</Button>
					</Toolbar>
				</AppBar>
			</Box>
			<Outlet />
		</>
	);
}
