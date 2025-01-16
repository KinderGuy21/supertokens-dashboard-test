import { useContext, useState } from "react";
import { useDeleteThirdPartyProviderService } from "../../../../../api/tenants";
import { getImageUrl } from "../../../../../utils";
import { PopupContentContext } from "../../../../contexts/PopupContentContext";
import Button from "../../../button";
import { Dialog, DialogContent, DialogFooter } from "../../../dialog";
import { useTenantDetailContext } from "../TenantDetailContext";
import "./deleteThirdPartyProvider.scss";

export const DeleteThirdPartyProviderDialog = ({
	onCloseDialog,
	thirdPartyId,
	goBack,
}: {
	onCloseDialog: () => void;
	goBack: () => void;
	thirdPartyId: string;
}) => {
	const [isDeletingProvider, setIsDeletingProvider] = useState(false);
	const deleteThirdPartyProvider = useDeleteThirdPartyProviderService();
	const { tenantInfo, refetchTenant } = useTenantDetailContext();
	const { showToast } = useContext(PopupContentContext);

	const handleDeleteProperty = async () => {
		try {
			setIsDeletingProvider(true);
			const res = await deleteThirdPartyProvider(tenantInfo.tenantId, thirdPartyId);
			await refetchTenant();
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
			setIsDeletingProvider(false);
		}
	};

	return (
		<Dialog
			title={"Delete Provider?"}
			onCloseDialog={onCloseDialog}>
			<DialogContent>
				<p className="confirm-text">
					<>
						Are you sure you want to delete the provider:{" "}
						<span className="third-party-id">{thirdPartyId}</span>
					</>
				</p>
				<DialogFooter border="border-none">
					<Button
						onClick={onCloseDialog}
						color="gray-outline">
						Cancel
					</Button>

					<Button
						color="danger"
						isLoading={isDeletingProvider}
						disabled={isDeletingProvider}
						onClick={handleDeleteProperty}>
						Yes, Delete
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
};
