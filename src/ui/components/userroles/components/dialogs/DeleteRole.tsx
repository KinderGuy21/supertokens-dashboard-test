import { useContext, useState } from "react";

import useRolesService from "../../../../../api/userroles/role";
import { getImageUrl } from "../../../../../utils";
import { PopupContentContext } from "../../../../contexts/PopupContentContext";
import Button from "../../../button";
import { Dialog, DialogContent, DialogFooter } from "../../../dialog";

import "./deleteRole.scss";

export default function DeleteRoleDialog({
	currentlySelectedRoleName,
	deleteRole: deleteRoleFromState,
	onCloseDialog,
}: {
	currentlySelectedRoleName: string;
	deleteRole: (role: string) => void;
	onCloseDialog: () => void;
}) {
	const { showToast } = useContext(PopupContentContext);
	const { deleteRole } = useRolesService();

	const [isDeletingRoles, setIsDeletingRoles] = useState(false);

	async function handleDeleteRoles() {
		setIsDeletingRoles(true);

		try {
			await deleteRole(currentlySelectedRoleName);
			showToast({
				iconImage: getImageUrl("checkmark-green.svg"),
				toastType: "success",
				children: "Role deleted successfully!",
			});
			deleteRoleFromState(currentlySelectedRoleName);
			onCloseDialog();
		} catch (_) {
			showToast({
				iconImage: getImageUrl("form-field-error-icon.svg"),
				toastType: "error",
				children: <>Something went wrong Please try again!</>,
			});
		} finally {
			setIsDeletingRoles(false);
		}
	}

	return (
		<Dialog
			title="Delete Roles?"
			onCloseDialog={onCloseDialog}>
			<DialogContent>
				<p className="you-sure-text">
					Are you sure you want to delete Role: <span className="red">{currentlySelectedRoleName}</span>? This
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
						onClick={handleDeleteRoles}>
						Yes, Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
