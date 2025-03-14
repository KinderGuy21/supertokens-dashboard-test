import { useContext, useState } from "react";
import { useDeleteTenantService } from "../../../../../api/tenants";
import { getImageUrl } from "../../../../../utils";
import { PopupContentContext } from "../../../../contexts/PopupContentContext";
import Button from "../../../button";
import { Dialog, DialogContent, DialogFooter } from "../../../dialog";
import InputField from "../../../inputField/InputField";
import "./deleteTenant.scss";

export const DeleteTenantDialog = ({
	onCloseDialog,
	tenantId,
	goBack,
}: {
	onCloseDialog: () => void;
	goBack: () => void;
	tenantId: string;
}) => {
	const [currentTenantId, setCurrentTenantId] = useState("");
	const [isDeletingTenant, setIsDeletingTenant] = useState(false);
	const deleteTenant = useDeleteTenantService();
	const { showToast } = useContext(PopupContentContext);

	const handleDeleteProperty = async () => {
		try {
			setIsDeletingTenant(true);
			const res = await deleteTenant(tenantId);
			if (res.status === "OK") {
				onCloseDialog();
				goBack();
			} else {
				throw new Error("Something went wrong!");
			}
		} catch (error) {
			showToast({
				iconImage: getImageUrl("form-field-error-icon.svg"),
				children: "Something went wrong. Please try again.",
				toastType: "error",
			});
		} finally {
			setIsDeletingTenant(false);
		}
	};

	return (
		<Dialog
			title="Delete Tenant?"
			onCloseDialog={onCloseDialog}>
			<DialogContent>
				<p className="confirm-text">
					Are you sure you want to delete the tenant: <span className="tenant-id">{tenantId}</span> ?
					<br />
					Users associated with the tenant will be moved to the public tenant.
					<br />
					<br />
					Please enter the <span className="tenant-id">{tenantId}</span> below to confirm.
				</p>
				<InputField
					value={currentTenantId}
					placeholder={tenantId}
					type="text"
					name="tenantId"
					handleChange={(e) => setCurrentTenantId(e.target.value)}
				/>
				<DialogFooter border="border-none">
					<Button
						onClick={onCloseDialog}
						color="gray-outline">
						Cancel
					</Button>
					<Button
						color="danger"
						isLoading={isDeletingTenant}
						disabled={isDeletingTenant || currentTenantId !== tenantId}
						onClick={handleDeleteProperty}>
						Yes, Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
