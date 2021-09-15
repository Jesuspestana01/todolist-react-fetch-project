import React, { useState } from "react";

export const ToDoList = () => {
	const [tasks, setTasks] = useState([]);

	return (
		<>
			<div className="row">
				<input
					className="inputStyle"
					type="text"
					placeholder="Write your tasks"
					maxLength="30"
					onKeyPress={event =>
						event.key === "Enter"
							? setTasks([...tasks, event.target.value])
							: ""
					}></input>
			</div>
			<div className="row">
				<ul>
					{tasks.map((task, i) => {
						return (
							<li key={i} className="listStyle fw-bold">
								{task}

								<i
									type="button"
									className="fas fa-times buttonStyle"
									onClick={event => {
										const newTasks = [];
										for (
											let index = 0;
											index < tasks.length;
											index++
										) {
											if (index === i) {
												continue;
											}
											newTasks.push(tasks[index]);
										}
										setTasks(newTasks);
									}}></i>
							</li>
						);
					})}
				</ul>
			</div>
			<div className="placeHolderStyle">
				{tasks.length} Task remaining
			</div>
		</>
	);
};
