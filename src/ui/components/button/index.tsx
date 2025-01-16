import { ReactComponent as SpinnerIcon } from "../../../assets/spinner.svg";

import "./button.scss";

type ButtonProps = {
	color?:
		| "primary"
		| "secondary"
		| "info"
		| "danger"
		| "outline"
		| "gray"
		| "danger-outline"
		| "gray-outline"
		| "blue-outline";
	size?: "xs" | "sm" | "md" | "lg";
	isLoading?: boolean;
} & JSX.IntrinsicElements["button"];

export default function Button(props: ButtonProps) {
	const { color = "primary", size = "md", className = "", isLoading, children, ...rest } = props;
	return (
		<button
			className={`btn ${size} ${color} ${className}`}
			{...rest}>
			{children}
			{isLoading ? <SpinnerIcon className="spinner" /> : null}
		</button>
	);
}
