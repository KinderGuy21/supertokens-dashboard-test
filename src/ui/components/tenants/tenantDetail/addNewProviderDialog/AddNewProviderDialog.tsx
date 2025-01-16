import Button from "../../../button";
import { Dialog, DialogConfirmText, DialogContent, DialogFooter } from "../../../dialog";

export const AddNewProviderDialog = ({
	onCloseDialog,
	handleContinue,
}: {
	onCloseDialog: () => void;
	handleContinue: () => void;
}) => {
	return (
		<Dialog
			title="Add a Provider"
			onCloseDialog={onCloseDialog}>
			<DialogContent>
				<DialogConfirmText>
					At least one Social / Enterprise login provider is required to enable the third party provider login
					method to work.
					<br />
					<br />
					Click “continue” to add a new provider in next step.
				</DialogConfirmText>
				<DialogFooter>
					<Button
						onClick={onCloseDialog}
						color="gray-outline">
						Cancel
					</Button>
					<Button onClick={handleContinue}>Continue</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
