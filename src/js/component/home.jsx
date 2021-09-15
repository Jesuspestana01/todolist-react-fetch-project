import React from "react";
import { ToDoList } from "./ToDoList.jsx";

//create your first component
const Home = () => {
	return (
		<>
			<div className="container box">
				<div className="row">
					<h1 className="titleStyle">To Do List</h1>
				</div>
				<div className="justify-content-center">
					<ToDoList />
				</div>
			</div>
		</>
	);
};

export default Home;
