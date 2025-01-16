import Button from "../../../button";
import { Dialog, DialogContent, DialogFooter } from "../../../dialog";

export default function DeletePermissionDialog({
	selectedPermissions,
	isDeletingRoles,
	onCloseDialog,
	handleDeletePermissions,
}: {
	selectedPermissions: string[];
	onCloseDialog: () => void;
	handleDeletePermissions: () => void;
	isDeletingRoles: boolean;
}) {
	return (
		<Dialog
			title="Delete Permission?"
			onCloseDialog={onCloseDialog}>
			<DialogContent>
				<p className="you-sure-text">
					Are you sure you want to delete selected permission{selectedPermissions.length > 1 ? "s" : ""}? This
					action is irreversible.
				</p>
				<DialogFooter border="border-none">
					<Button
						onClick={onCloseDialog}
						color="gray-outline">
						Cancel
					</Button>
					<Button
						color="danger"
						isLoading={isDeletingRoles}
						disabled={isDeletingRoles}
						onClick={handleDeletePermissions}>
						Yes, Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
