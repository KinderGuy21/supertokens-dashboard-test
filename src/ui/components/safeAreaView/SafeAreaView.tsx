import { HTMLAttributes } from "react";
import { Helmet } from "react-helmet";

type SafeAreaViewProps = {
	backgroundColor?: string;
};

export const SafeAreaView = (props: SafeAreaViewProps) => {
	let backgroundColor = props.backgroundColor;

	if (backgroundColor === undefined) {
		backgroundColor = getComputedStyle(document.body).getPropertyValue("--color-window-bg");
	}
	const htmlProps = { style: `background-color: ${backgroundColor}` } as HTMLAttributes<HTMLElement>;
	return (
		<Helmet>
			<html {...htmlProps} />
			<meta
				name="theme-color"
				content={backgroundColor}
			/>
		</Helmet>
	);
};

export default SafeAreaView;
