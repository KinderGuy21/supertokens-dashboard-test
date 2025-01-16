import { LayoutModalProps } from "../../layout/layoutModal";

export type MissingTenantIdModalProps = Omit<LayoutModalProps, "modalContent"> & {
	message: string;
};

export const getMissingTenantIdModalProps = (props: MissingTenantIdModalProps): LayoutModalProps => {
	const closeModalRef: React.MutableRefObject<(() => void) | undefined> = { current: undefined };

	return {
		...props,
		modalContent: <div>{props.message}</div>,
		header: <h2 className="missing-tenant-modal-title">Operation not allowed</h2>,
		closeCallbackRef: closeModalRef,
	};
};
