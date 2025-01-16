import { Dialog, DialogConfirmText, DialogContent } from "../../../dialog";

export const UneditablePropertyDialog = ({
	onCloseDialog,
	children,
}: {
	onCloseDialog: () => void;
	children: React.ReactNode;
}) => {
	return (
		<Dialog
			title="Property cannot be edited"
			onCloseDialog={onCloseDialog}>
			<DialogContent>
				<DialogConfirmText>{children}</DialogConfirmText>
			</DialogContent>
		</Dialog>
	);
};
