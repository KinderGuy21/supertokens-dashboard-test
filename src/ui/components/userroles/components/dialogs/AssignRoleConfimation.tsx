import Button from "../../../button";
import { Dialog, DialogContent, DialogFooter } from "../../../dialog";

export default function AssignRoleConfirmation({
	onCloseDialog,
	assignRoleToUser,
	isAddingRoles,
	role,
}: {
	onCloseDialog: () => void;
	role: string;
	isAddingRoles: boolean;
	assignRoleToUser: (role: string) => void;
}) {
	return (
		<Dialog
			title="Confirmation"
			onCloseDialog={onCloseDialog}>
			<DialogContent>
				<p className="you-sure-text">
					Please confirm to add <span style={{ color: "var(--color-primary)" }}>{role}</span> role to this
					user.
				</p>
				<DialogFooter border="border-none">
					<Button
						onClick={onCloseDialog}
						color="gray-outline">
						Cancel
					</Button>
					<Button
						isLoading={isAddingRoles}
						disabled={isAddingRoles}
						onClick={() => assignRoleToUser(role)}>
						Yes, Confirm
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
