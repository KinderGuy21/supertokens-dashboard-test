import React, { PropsWithChildren } from "react";
import { getImageUrl } from "../../../utils";
import { Footer } from "../footer/footer";
import "./error-boundary.scss";

// eslint-disable-next-line @typescript-eslint/ban-types
type Props = PropsWithChildren<{}>;
type State = {
	hasError: boolean;
};

export default class ErrorBoundary extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = { hasError: false };
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	static getDerivedStateFromError(_: unknown) {
		return { hasError: true };
	}

	render(): React.ReactNode {
		if (this.state.hasError) {
			return (
				<>
					<div className="error-container">
						<div className="block-container">
							<img
								className="title-image"
								src={getImageUrl("delete.svg")}
								alt="Error"></img>
							<h2 className="text-title">Looks like something went wrong!</h2>
							<p className="text-small text-label">
								Please refresh the page to try again or contact us if the error persists.
							</p>
						</div>
					</div>
					<Footer
						horizontalAlignment="center"
						verticalAlignment="center"
						size="normal"
						colorMode="dark"></Footer>
				</>
			);
		}

		return this.props.children;
	}
}
