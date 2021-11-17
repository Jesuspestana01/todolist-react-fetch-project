import React, { useState, useEffect } from "react";

//include images into your bundle

import { Task } from "./Task.jsx";
//create your first component
const url = "https://assets.breatheco.de/apis/fake/todos/user/JesusP";

export const Home = () => {
	const [tasks, setTasks] = useState([]);
	const [inputValue, setInputValue] = useState("");

	useEffect(() => {
		const getTodoList = async () => {
			const response = await fetch(url);
			const body = await response.json();
			setTasks(body);
		};
		getTodoList();
	}, []);

	const updateTask = async (position, checked) => {
		let result = tasks.map((task, index) => {
			let newTask = { ...task };
			if (index === position) {
				newTask.done = checked;
			}

			return newTask;
		});

		const response = await fetch(url, {
			method: "PUT",
			body: JSON.stringify(result),
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			const getResponse = await fetch(url);
			const body = await getResponse.json();
			setTasks(body);
		}
	};

	const deleteTask = async position => {
		let result = tasks.filter((task, index) => index !== position);
		let _method = "";

		_method = "PUT";
		result = JSON.stringify(result);
		const response = await fetch(url, {
			method: _method,
			body: result,
			headers: {
				"Content-Type": "application/json"
			}
		});
		if (response.ok) {
			const getResponse = await fetch(url);
			const body = await getResponse.json();
			setTasks(body);
		}
	};

	return (
		<>
			<div className="container box">
				<div className="row">
					<h1 className="titleStyle">To Do List</h1>
				</div>
				<div className="justify-content-center">
					<div className="row">
						<input
							className="inputStyle"
							type="text"
							placeholder="write a task here"
							value={inputValue}
							onChange={event => {
								setInputValue(event.target.value);
							}}
							onKeyPress={event => {
								if (event.key == "Enter") {
									if (event.target.value == "") {
										alert("Please add some tasks");
										return;
									}
									const createTask = async () => {
										let newTask = [
											...tasks,
											{
												label: event.target.value,
												done: false
											}
										];

										const response = await fetch(url, {
											method: "PUT",
											body: JSON.stringify(newTask),
											headers: {
												"Content-Type":
													"application/json"
											}
										});
										if (response.ok) {
											const getResponse = await fetch(
												url
											);
											const body = await getResponse.json();
											setTasks(body);
										}
									};
									createTask();
									setInputValue("");
								}
							}}
						/>
					</div>
					<div className="row">
						<ul className="list-unstyled">
							{tasks.map((task, index) => {
								return (
									<Task
										key={index}
										inputTask={task.label}
										isChecked={task.done}
										position={index}
										updateTaskList={(
											taskPosition,
											isDone
										) => updateTask(taskPosition, isDone)}
										removeCallBack={_removeTask =>
											deleteTask(_removeTask)
										}
									/>
								);
							})}
						</ul>
					</div>
					<div className="placeHolderStyle">
						{tasks.length} Task remaining
					</div>
				</div>
			</div>
		</>
	);
};
