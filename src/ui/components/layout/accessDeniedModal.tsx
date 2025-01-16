import { useContext } from "react";
import { AccessDeniedPopupContext } from "../../contexts/AccessDeniedContext";
import { LayoutModalContent } from "./layoutModal";

export const AccessDeniedModal = () => {
	const context = useContext(AccessDeniedPopupContext);

	if (context === undefined) {
		throw new Error("Access denied modal must be used within the AccessDeninedContext.");
	}

	if (context.isPopupVisible === false) {
		return <></>;
	}

	return (
		<LayoutModalContent
			hideBackDrop={false}
			header={<h2>Access Denied</h2>}
			onClose={() => {
				context.hidePopup();
			}}>
			<p>{context.popupMessage}</p>
		</LayoutModalContent>
	);
};
