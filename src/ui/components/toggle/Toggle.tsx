import { InputHTMLAttributes } from "react";
import "./toggle.scss";

type ToggleProps = InputHTMLAttributes<HTMLInputElement> & {
	id: string;
	checked: boolean;
	label?: string;
};

export const Toggle = (props: ToggleProps) => {
	const { className, id, label, ...rest } = props;
	return (
		<div className="toggle-container">
			{label && (
				<label
					htmlFor={id}
					className="text-small toggle-label">
					{label}
				</label>
			)}
			<input
				type="checkbox"
				className={`toggle ${className}`}
				id={id}
				{...rest}
			/>
			<label htmlFor={id}></label>
		</div>
	);
};
