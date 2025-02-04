/*import {useState} from "react";

import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";
import {Routes, Route} from "react-router-dom";
import Login from "./components/Login";

import "./App.css";

function App() {
	return (
		<Routes>
			<Route path="/" element={<Login />} />
		</Routes>
	);
}

/*function App() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const handleInputChange = (e) => {
		const {name, value} = e.target;
		setFormData({
			...formData,
			[name]: value,
		});
	};

	const handleSubmit = async (e) => {
		e.preventDefault();

		try {
			const response = await fetch("http://127.0.0.1:8000/api/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});
			console.log(JSON.stringify(formData));

			if (!response.ok) {
				console.log(response);
				throw new Error("Error en la petición");
			}

			const data = await response.json();
			console.log("Respuesta exitosa:", data);
		} catch (error) {
			console.error("Error:", error);
		}
	};

	return (
		<>
			<Sheet
				sx={{
					width: 300,
					mx: "auto",
					my: 4,
					py: 3,
					px: 2,
					display: "flex",
					flexDirection: "column",
					gap: 2,
					borderRadius: "sm",
					boxShadow: "md",
				}}
			>
				<div>
					<Typography level="h4" component="h1">
						<b>Lista de Tareas</b>
					</Typography>
				</div>
				<form onSubmit={handleSubmit}>
					<FormControl>
						<FormLabel>Correo</FormLabel>
						<Input
							name="email"
							type="email"
							placeholder="email@email.com"
							value={formData.email}
							onChange={handleInputChange}
							required
						/>
					</FormControl>
					<FormControl>
						<FormLabel>contraseña</FormLabel>
						<Input
							name="password"
							type="password"
							placeholder="password"
							value={formData.password}
							onChange={handleInputChange}
							required
						/>
					</FormControl>
					<Button type="submit" sx={{mt: 1}}>
						Entrar
					</Button>
				</form>
				<Typography
					endDecorator={<Link href="/sign-up">Sign up</Link>}
					sx={{fontSize: "sm", alignSelf: "center"}}
				>
					¿No tienes cuenta?
				</Typography>
			</Sheet>
		</>
	);
}

export default App;
*/
