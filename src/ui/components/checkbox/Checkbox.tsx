import { ChangeEvent } from "react";
import "./checkbox.scss";

export const Checkbox = ({
	id,
	label,
	onChange,
	checked,
	disabled,
}: {
	id: string;
	label: string;
	onChange: (e: ChangeEvent<HTMLInputElement>) => void;
	checked: boolean;
	disabled?: boolean;
}) => {
	return (
		<div className={`checkbox-container ${disabled ? "checkbox-container--disabled" : ""}`}>
			<input
				type="checkbox"
				id={id}
				name={id}
				onChange={onChange}
				checked={checked}
				disabled={disabled}
			/>
			<label htmlFor={id}>{label}</label>
		</div>
	);
};
