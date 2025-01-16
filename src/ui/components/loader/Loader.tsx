import "./loader.scss";

export const Loader = () => {
	return (
		<div className="loader-container">
			<div className="loader"></div>
		</div>
	);
};

export const LoaderOverlay = () => {
	return (
		<div className="full-screen-loading-overlay">
			<div className="loader-wrapper">
				<div className="loader"></div>
			</div>
		</div>
	);
};
