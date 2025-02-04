import React from "react";
import ReactDOM from "react-dom/client";
import {RouterProvider} from "react-router-dom";
import {ContextProvider} from "./contexts/contextprovider.jsx";
import "./index.css";

import router from "./router.jsx";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<ContextProvider>
		<RouterProvider router={router} />
	</ContextProvider>
);
