import { useEffect, useState } from "react";
import { ReactComponent as CloseIconActive } from "../../../assets/close-active.svg";
import { ReactComponent as CloseIconDefault } from "../../../assets/close-inactive.svg";

import "./deleteCrossButton.scss";

export const DeleteCrossButton = ({
	onClick,
	label,
	disabled,
}: {
	onClick: () => void;
	label: string;
	disabled?: boolean;
}) => {
	const [isHovered, setIsHovered] = useState(false);

	useEffect(() => {
		if (disabled) {
			setIsHovered(false);
		}
	}, [disabled]);

	return (
		<button
			className="delete-cross-button"
			onClick={onClick}
			disabled={disabled}
			aria-label={label}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onMouseOver={() => setIsHovered(true)}
			onMouseOut={() => setIsHovered(false)}>
			{isHovered && !disabled ? <CloseIconActive /> : <CloseIconDefault />}
		</button>
	);
};
