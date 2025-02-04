import {useState, useEffect} from "react";
import {useStateContext} from "../contexts/contextprovider";
import {Navigate, useNavigate} from "react-router-dom";

import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import Typography from "@mui/joy/Typography";
import Button from "@mui/joy/Button";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import SaveIcon from "@mui/icons-material/Save";
import CancelIcon from "@mui/icons-material/Cancel";
import FormControl from "@mui/joy/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Grid from "@mui/material/Grid2";
import Box from "@mui/material/Box";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Stack from "@mui/material/Stack";
import SearchIcon from "@mui/icons-material/Search";
import Input from "@mui/joy/Input";

function Tasks() {
	const [data, setData] = useState({tasks: []});
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const {token} = useStateContext();

	const [editingTaskId, setEditingTaskId] = useState(null);
	const [editedTitle, setEditedTitle] = useState("");
	const [editedDescription, setEditedDescription] = useState("");
	const [editedStatus, setEditedStatus] = useState("");

	const [newTaskTitle, setNewTaskTitle] = useState("");
	const [newTaskDescription, setNewTaskDescription] = useState("");
	const [newTaskStatus, setNewTaskStatus] = useState("Pendiente");

	const [search, setSearch] = useState("");

	const [searchStatus, setSearchStatus] = useState("");

	const navigate = useNavigate();

	useEffect(() => {
		const apiUrl = "http://127.0.0.1:8000/api/tasks";

		fetch(apiUrl, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		})
			.then((response) => {
				if (!response.ok) {
					throw new Error("Error al obtener los datos");
				}
				return response.json();
			})
			.then((data) => {
				setData(data);
				console.log(data);
				setLoading(false);
			})
			.catch((error) => {
				setError(error.message);
				setLoading(false);
			});
	}, []);

	if (loading) {
		return <div>Cargando...</div>;
	}

	if (error) {
		return <div>Error con el Servidor</div>;
	}

	const handleCreateTask = async () => {
		try {
			const response = await fetch("http://127.0.0.1:8000/api/tasks", {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					title: newTaskTitle,
					description: newTaskDescription,
					status: newTaskStatus,
				}),
			});

			if (response.ok) {
				const newTask = await response.json();
				setData((prevData) => ({
					tasks: [...prevData.tasks, newTask],
				}));
				window.location.reload();
			} else {
				console.error("Error al crear la tarea");
			}
		} catch (error) {
			console.error("Error al crear la tarea:", error);
		}
	};

	const handleDelete = async (id) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/api/tasks/${id}`,
				{
					method: "DELETE",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				setData((prevData) => ({
					tasks: prevData.tasks.filter((task) => task.id !== id),
				}));
			} else {
				console.error("Error al eliminar la tarea");
			}
		} catch (error) {
			console.error("Error al eliminar la tarea:", error);
		}
	};

	const handleEdit = (task) => {
		setEditingTaskId(task.id);
		setEditedTitle(task.title);
		setEditedDescription(task.description);
		setEditedStatus(task.status);
	};

	const handleCancel = () => {
		setEditingTaskId(null);
		setEditedTitle("");
		setEditedDescription("");
		setEditedStatus("");
	};

	const handleSave = async (id) => {
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/api/tasks/${id}`,
				{
					method: "PUT",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						title: editedTitle,
						description: editedDescription,
						status: editedStatus,
					}),
				}
			);

			if (response.ok) {
				setData((prevData) => ({
					tasks: prevData.tasks.map((task) =>
						task.id === id
							? {
									...task,
									description: editedDescription,
									title: editedTitle,
									status: editedStatus,
							  }
							: task
					),
				}));
				setEditingTaskId(null);
			} else {
				console.error("Error al actualizar la tarea");
			}
		} catch (error) {
			console.error("Error al actualizar la tarea:", error);
		}
	};
	const handleAllTask = async () => {
		navigate(`/tasks`);
	};

	const handleSearch = async () => {
		navigate(`/tasks?search=${search}`);
		try {
			const response = await fetch(
				`http://127.0.0.1:8000/api/tasks?search=${search}`,
				{
					method: "get",
					headers: {
						Authorization: `Bearer ${token}`,
						"Content-Type": "application/json",
					},
				}
			);

			if (response.ok) {
				const searched = await response.json();
				setData((prevData) => ({
					...prevData,
					tasks: searched.tasks,
				}));
				console.log(data);
			} else {
				const errorData = await response.json();
				console.error(
					"Error fetching tasks:",
					response.status,
					errorData
				);
			}
		} catch (error) {
			console.log("error aqui");
		}
	};
	const handleSearchStatus = async () => {
		if (searchStatus != "") {
			navigate(`/tasks?status=${searchStatus}`);
			try {
				const response = await fetch(
					`http://127.0.0.1:8000/api/tasks?status=${searchStatus}`,
					{
						method: "get",
						headers: {
							Authorization: `Bearer ${token}`,
							"Content-Type": "application/json",
						},
					}
				);

				if (response.ok) {
					const searchedStatus = await response.json();
					setData((prevData) => ({
						...prevData,
						tasks: searchedStatus.tasks,
					}));
					console.log(data);
				} else {
					const errorData = await response.json();
					console.error(
						"Error fetching tasks:",
						response.status,
						errorData
					);
				}
			} catch (error) {
				console.log("error aqui");
			}
		}
	};

	return (
		<>
			<Box
				variant="outlined"
				sx={{
					display: "block",
					background: "white",
					marginBottom: 1,
					paddingBottom: 2,
					width: "full",
				}}
			>
				<TextField
					label="Título"
					value={newTaskTitle}
					onChange={(e) => setNewTaskTitle(e.target.value)}
					variant="outlined"
					sx={{
						marginBottom: 2,
						marginTop: 2,
						width: 1000,
						marginLeft: 4,
					}}
				/>
				<TextField
					label="Descripción"
					value={newTaskDescription}
					onChange={(e) => setNewTaskDescription(e.target.value)}
					variant="outlined"
					multiline
					rows={2}
					sx={{
						marginBottom: 2,
						minWidth: 1000,
						alignContent: "center",
						marginLeft: 4,
					}}
				/>
				<InputLabel
					sx={{
						marginLeft: 4,
						marginRight: 2,
					}}
					id="status-newTask"
				>
					Estado
				</InputLabel>
				<Select
					id="status-newTaskselect"
					value={newTaskStatus}
					labelid="status-newTask"
					onChange={(e) => setNewTaskStatus(e.target.value)}
					sx={{
						marginLeft: 4,
						marginRight: 2,
					}}
				>
					<MenuItem value="Pendiente">Pendiente</MenuItem>
					<MenuItem value="En progreso">En progreso</MenuItem>
					<MenuItem value="Completada">Completada</MenuItem>
				</Select>
				<Button variant="outlined" onClick={handleCreateTask}>
					Crear Tarea
				</Button>
			</Box>
			<Box sx={{width: 700, marginLeft: 4, display: "flex"}}>
				<Input
					size="md"
					placeholder="Buscar"
					sx={{marginY: 4, marginX: 1}}
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				></Input>
				<Button
					variant="outlined"
					sx={{marginY: 4}}
					onClick={() => handleSearch()}
				>
					<SearchIcon fontSize="large" />
				</Button>
				<InputLabel id="status-search">Estado</InputLabel>
				<Select
					size="md"
					sx={{marginY: 4, marginX: 1}}
					labelid="status-search"
					value={searchStatus}
					onChange={(e) => setSearchStatus(e.target.value)}
				>
					<MenuItem value="Pendiente">Pendiente</MenuItem>
					<MenuItem value="En progreso">En progreso</MenuItem>
					<MenuItem value="Completada">Completada</MenuItem>
				</Select>
				<Button
					variant="outlined"
					sx={{marginY: 4}}
					onClick={() => handleSearchStatus()}
				>
					<SearchIcon fontSize="large" />
				</Button>
				<Button
					variant="outlined"
					onClick={handleAllTask}
					sx={{height: 50, marginTop: 4, marginLeft: 3}}
					size="small"
				>
					todas las tareas
				</Button>
			</Box>
			<Grid container spacing={6} sx={{marginX: 5, alignItems: "center"}}>
				{data.tasks.map((item) => {
					const isEditing = editingTaskId === item.id;
					return (
						<Grid>
							<Card
								key={item.id}
								variant="outlined"
								sx={{
									width: "100%",
									maxWidth: 320,
									overflow: "auto",
									marginBottom: 2,
								}}
							>
								<CardContent>
									{isEditing ? (
										<FormControl>
											<InputLabel>Título</InputLabel>
											<TextField
												value={editedTitle}
												onChange={(e) =>
													setEditedTitle(
														e.target.value
													)
												}
												variant="outlined"
												sx={{marginBottom: 2}}
											/>
										</FormControl>
									) : (
										<Typography level="title-lg">
											{item.title}
										</Typography>
									)}

									{isEditing ? (
										<FormControl>
											<InputLabel>Descripción</InputLabel>
											<TextField
												value={editedDescription}
												onChange={(e) =>
													setEditedDescription(
														e.target.value
													)
												}
												variant="outlined"
												multiline
												rows={2}
											/>
										</FormControl>
									) : (
										<Typography
											variant="body1"
											level="body-sm"
											sx={{
												display: "-webkit-box",
												WebkitLineClamp: 4,
												WebkitBoxOrient: "vertical",
												overflow: "hidden",
												textOverflow: "ellipsis",
												whiteSpace: "normal",
											}}
										>
											{item.description}
										</Typography>
									)}
									{isEditing ? (
										<FormControl>
											<InputLabel>Estado</InputLabel>
											<Select
												value={editedStatus}
												label="status"
												onChange={(e) =>
													setEditedStatus(
														e.target.value
													)
												}
												sx={{marginRight: 2}}
											>
												<MenuItem value="Pendiente">
													Pendiente
												</MenuItem>
												<MenuItem
													value="En progreso
"
												>
													En progreso
												</MenuItem>
												<MenuItem value="Completada">
													Completada
												</MenuItem>
											</Select>
										</FormControl>
									) : (
										<Typography
											level="body-sm"
											color="secondary"
										>
											{item.status}
										</Typography>
									)}
									<Stack direction="row" spacing={3}>
										<Button
											variant="outlined"
											onClick={() =>
												handleDelete(item.id)
											}
										>
											<DeleteIcon />
											Eliminar
										</Button>
										{isEditing ? (
											<>
												<Button
													onClick={() =>
														handleSave(item.id)
													}
												>
													<SaveIcon />
												</Button>
												<Button onClick={handleCancel}>
													<CancelIcon />
												</Button>
											</>
										) : (
											<Button
												onClick={() => handleEdit(item)}
											>
												<EditIcon />
											</Button>
										)}
									</Stack>
								</CardContent>
							</Card>
						</Grid>
					);
				})}
			</Grid>
		</>
	);
}
export default Tasks;
