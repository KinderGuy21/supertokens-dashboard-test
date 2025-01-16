import { ReactNode } from "react";
import { ReactComponent as ErrorIcon } from "../../../assets/form-field-error-icon.svg";
import "./errorBlock.scss";

export const ErrorBlock = ({ children, className }: { children: ReactNode; className?: string }) => {
	return (
		<div className={`error-block ${className}`}>
			<ErrorIcon />
			<p className="error-block__error-message">{children}</p>
		</div>
	);
};
