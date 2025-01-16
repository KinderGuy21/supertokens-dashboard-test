import Button from "../../../button";
import { Dialog, DialogContent, DialogFooter } from "../../../dialog";
import "./deleteThirdPartyClient.scss";

export const DeleteClientDialog = ({
	onCloseDialog,
	clientType,
	handleDeleteClient,
}: {
	onCloseDialog: () => void;
	clientType?: string;
	handleDeleteClient: () => void;
}) => {
	return (
		<Dialog
			title="Delete Client?"
			onCloseDialog={onCloseDialog}>
			<DialogContent>
				<p className="confirm-text">
					Are you sure you want to delete the{" "}
					{typeof clientType === "string" && clientType.length > 0 ? (
						<>
							client: <span className="client-type">{clientType}</span>
						</>
					) : (
						"client"
					)}
					?
				</p>
				<DialogFooter border="border-none">
					<Button
						onClick={onCloseDialog}
						color="gray-outline">
						Cancel
					</Button>
					<Button
						color="danger"
						onClick={handleDeleteClient}>
						Yes, Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
