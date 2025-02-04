import {useState} from "react";
import {useNavigate} from "react-router-dom";

import Sheet from "@mui/joy/Sheet";
import FormControl from "@mui/joy/FormControl";
import FormLabel from "@mui/joy/FormLabel";
import Input from "@mui/joy/Input";
import Typography from "@mui/joy/Typography";
import Link from "@mui/joy/Link";
import Button from "@mui/joy/Button";

function Login() {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});
	const [error, setError] = useState("");
	const navigate = useNavigate();
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
			const data = await response.json();
			console.log(data);
			if (response.ok) {
				console.log(response);
				localStorage.setItem("ACCESS_TOKEN", data.token);
				navigate("/tasks");
				window.location.reload();
			} else {
				setError(data.message || "Credenciales incorrectas");
			}
			/*else {
				setError(data.message || "Error al conectar con el servidor");
			}*/
		} catch (error) {
			setError("Error inesperado");
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
							placeholder="contraseña"
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
					endDecorator={<Link href="/register">Registrate</Link>}
					sx={{fontSize: "sm", alignSelf: "center"}}
				>
					¿No tienes cuenta?
				</Typography>
			</Sheet>
		</>
	);
}
export default Login;
