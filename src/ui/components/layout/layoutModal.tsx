import { FC, MutableRefObject, ReactNode, useCallback, useContext, useEffect, useState } from "react";
import { getImageUrl } from "../../../utils";
import { PopupContentContext } from "../../contexts/PopupContentContext";
import { LayoutPanel, LayoutPanelProps } from "./layoutPanel";

export type LayoutModalContentProps = LayoutPanelProps & {
	hideBackDrop?: boolean;
	onClose?: () => void;
};

export type LayoutModalProps = LayoutModalContentProps & {
	modalContent: ReactNode;
	closeCallbackRef?: MutableRefObject<(() => void) | undefined>;
};

export const LayoutModalContent: FC<LayoutModalContentProps> = (props: LayoutModalContentProps) => {
	const { hideBackDrop, header, onClose } = props;
	const closeButton = (
		<div className="layout-modal__close">
			<div onClick={onClose}>
				<img
					src={getImageUrl("close.svg")}
					alt="Close Modal"
				/>
			</div>
		</div>
	);

	return (
		<>
			<div className="layout-modal">
				{!hideBackDrop && <div className="layout-modal__backdrop"></div>}
				<LayoutPanel
					{...props}
					header={
						<>
							{header}
							{closeButton}
						</>
					}
				/>
			</div>
		</>
	);
};

export const LayoutModal: FC<LayoutModalProps> = (props: LayoutModalProps) => {
	const { modalContent, closeCallbackRef, onClose } = props;
	const [isOpened, setIsOpened] = useState(true);

	const handleClose = useCallback(() => {
		setIsOpened(false);
		onClose?.();
	}, [onClose]);

	useEffect(() => {
		if (closeCallbackRef !== undefined) {
			closeCallbackRef.current = handleClose;
		}
	}, [closeCallbackRef, handleClose]);

	return (
		<>
			{isOpened && (
				<LayoutModalContent
					{...props}
					onClose={handleClose}>
					{modalContent}
				</LayoutModalContent>
			)}
		</>
	);
};

export const LayoutModalContainer: FC = () => {
	const { modals, removeModal } = useContext(PopupContentContext);
	const [modal] = modals;

	return modal !== undefined ? (
		<LayoutModal
			{...modal}
			key={modal.id}
			onClose={() => removeModal(modal.id)}
		/>
	) : null;
};

export default LayoutModal;
