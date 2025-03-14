import React, { useEffect } from "react";
import { ReactComponent as CloseIcon } from "../../../assets/close.svg";
import { ReactComponent as ErrorIcon } from "../../../assets/form-field-error-icon.svg";

import "./dialog.scss";

type DialogCommonProps = {
	children: React.ReactNode;
	className?: string;
};

type DialogProps = DialogCommonProps & {
	title?: string;
	/** Determines whether the dialog should be closed when user clicks on the overlay, true by default */
	closeOnOverlayClick?: boolean;
	isError?: boolean;
	onCloseDialog: () => void;
	/** Determines whether body scroll should be locked when dialog is open, true by default*/
	lockScroll?: boolean;
};

function addNoScrollToBody() {
	document.body.classList.add("no-scroll");
}
function removeNoScrollFromBody() {
	document.body.classList.remove("no-scroll");
}

function Dialog(props: DialogProps) {
	const { children, className = "", closeOnOverlayClick = true, onCloseDialog, title, lockScroll = true } = props;

	useEffect(() => {
		if (!lockScroll) return;
		addNoScrollToBody();
		return removeNoScrollFromBody;
	}, [lockScroll]);

	return (
		<>
			<div
				className="dialog-overlay"
				onClick={() => {
					if (closeOnOverlayClick === true) {
						onCloseDialog();
					}
				}}
			/>
			<div className={`dialog-container ${className}`}>
				{title && (
					<div className="dialog-header">
						<div className="dialog-title">
							{props.isError && <ErrorIcon />}
							{title}
						</div>
						<CloseIcon onClick={onCloseDialog} />
					</div>
				)}
				{children}
			</div>
		</>
	);
}

function DialogContent(props: DialogCommonProps) {
	const { children, className = "" } = props;

	return <div className={`dialog-content ${className}`}>{children}</div>;
}

function DialogConfirmText(props: DialogCommonProps) {
	const { children, className = "" } = props;

	return <p className={`dialog-confirm-text ${className}`}>{children}</p>;
}

type DialogFooterProps = DialogCommonProps & {
	flexDirection?: "row" | "column";
	justifyContent?: "flex-start" | "flex-end" | "center" | "space-between" | "space-around" | "space-evenly";
	border?: "border-top" | "border-none";
};

function DialogFooter(props: DialogFooterProps) {
	const {
		children,
		className = "",
		flexDirection = "row",
		justifyContent = "flex-end",
		border = "border-top",
	} = props;

	return <div className={`dialog-footer ${flexDirection} ${justifyContent} ${border} ${className}`}>{children}</div>;
}

export { Dialog, DialogConfirmText, DialogContent, DialogFooter };
