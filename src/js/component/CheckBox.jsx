import React from "react";
import PropTypes from "prop-types";

export const CheckBox = props => {
	return (
		<label>
			<input
				className={`${
					props.isChecked
						? "far fa-check-circle"
						: "far fa-times-circle"
				} checkBoxStyle`}
				type="checkbox"
				defaultChecked={props.isChecked}
				onClick={() => {
					props.updateTaskList(props.position, !props.isChecked);
				}}
			/>
		</label>
	);
};
CheckBox.propTypes = {
	isChecked: PropTypes.bool,
	position: PropTypes.number,
	updateTaskList: PropTypes.func
};
