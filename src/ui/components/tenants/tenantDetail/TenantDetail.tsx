import { useEffect, useState } from "react";
import { useGetTenantInfoService } from "../../../../api/tenants";
import { TenantDashboardView, TenantInfo } from "../../../../api/tenants/types";
import { ReactComponent as NoTenantFound } from "../../../../assets/no-tenants.svg";
import { FactorIds, PUBLIC_TENANT_ID } from "../../../../constants";
import { getImageUrl, usePrevious } from "../../../../utils";
import Button from "../../button";
import { Loader } from "../../loader/Loader";
import { CoreConfigSection } from "./CoreConfigSection";
import { LoginMethodsSection } from "./LoginMethodsSection";
import { TenantDetailContextProvider } from "./TenantDetailContext";
import { TenantDetailHeader } from "./TenantDetailHeader";
import { ThirdPartySection } from "./ThirdPartySection";
import { AddNewProviderDialog } from "./addNewProviderDialog/AddNewProviderDialog";
import { DeleteTenantDialog } from "./deleteTenant/DeleteTenant";
import { ProviderListDialog } from "./providerListDialog/ProviderListDialog";
import "./tenantDetail.scss";
import { ThirdPartyPage } from "./thirdPartyPage/ThirdPartyPage";

export const TenantDetail = ({
	onBackButtonClicked,
	tenantId,
}: {
	onBackButtonClicked: () => void;
	tenantId: string;
}) => {
	const getTenantInfo = useGetTenantInfoService();
	const [isNoProviderAddedDialogVisible, setIsNoProviderAddedDialogVisible] = useState(false);
	const [tenant, setTenant] = useState<TenantInfo | undefined>(undefined);
	const [isLoading, setIsLoading] = useState(true);
	const [isDeleteTenantDialogOpen, setIsDeleteTenantDialogOpen] = useState(false);
	const [isProviderListVisible, setIsProviderListVisible] = useState(false);
	const [viewObj, setViewObj] = useState<TenantDashboardView>({
		view: "tenant-detail",
	});
	const tenantHasThirdPartyEnabled = tenant?.firstFactors?.includes(FactorIds.THIRDPARTY);
	const prevTenantHasThirdPartyEnabled = usePrevious(tenantHasThirdPartyEnabled);

	const getTenant = async () => {
		const response = await getTenantInfo(tenantId);
		if (response.status === "OK") {
			setTenant(response.tenant);
		}
	};

	useEffect(() => {
		const fetchData = async () => {
			setIsLoading(true);
			await getTenant();
			setIsLoading(false);
		};
		void fetchData();
	}, [tenantId]);

	useEffect(() => {
		if (
			tenant?.tenantId !== undefined &&
			tenantHasThirdPartyEnabled &&
			prevTenantHasThirdPartyEnabled !== tenantHasThirdPartyEnabled &&
			typeof prevTenantHasThirdPartyEnabled === "boolean" &&
			tenant?.thirdParty.providers.length === 0
		) {
			setIsNoProviderAddedDialogVisible(true);
		}
	}, [
		tenantHasThirdPartyEnabled,
		tenant?.tenantId,
		tenant?.thirdParty.providers.length,
		prevTenantHasThirdPartyEnabled,
	]);

	const refetchTenant = async () => {
		await getTenant();
	};

	const handleAddNewProviderModal = () => {
		window.scrollTo(0, 0);
		setIsNoProviderAddedDialogVisible(false);
		setIsProviderListVisible(true);
	};

	const handleEditProvider = (providerId: string) => {
		window.scrollTo(0, 0);
		setViewObj({
			view: "add-or-edit-third-party-provider",
			thirdPartyId: providerId,
			isAddingNewProvider: false,
		});
	};

	const handleAddNewProvider = (viewObj: TenantDashboardView) => {
		setIsProviderListVisible(false);
		setViewObj(viewObj);
	};

	const renderView = () => {
		if (!tenant) {
			throw new Error("This should be unreachable");
		}

		if (viewObj.view === "add-or-edit-third-party-provider") {
			return (
				<ThirdPartyPage
					providerId={viewObj.thirdPartyId}
					isAddingNewProvider={viewObj.isAddingNewProvider}
					handleGoBack={() => setViewObj({ view: "tenant-detail" })}
				/>
			);
		}

		return (
			<div className="tenant-detail">
				{/* {showLoadingOverlay && <LoaderOverlay />} */}
				<button
					className="button flat"
					onClick={onBackButtonClicked}>
					<img
						src={getImageUrl("left-arrow-dark.svg")}
						alt="Go back"
					/>
					<span>Back to all tenants</span>
				</button>
				<div className="tenant-detail__sections">
					<TenantDetailHeader />
					<LoginMethodsSection />
					{tenantHasThirdPartyEnabled && (
						<ThirdPartySection
							handleAddNewProvider={handleAddNewProviderModal}
							handleEditProvider={handleEditProvider}
						/>
					)}
					<CoreConfigSection />
				</div>
				{tenant?.tenantId !== PUBLIC_TENANT_ID && (
					<div className="tenant-detail__delete-container">
						<Button
							color="danger"
							onClick={() => setIsDeleteTenantDialogOpen(true)}>
							Delete Tenant
						</Button>
					</div>
				)}
				{isDeleteTenantDialogOpen && (
					<DeleteTenantDialog
						onCloseDialog={() => setIsDeleteTenantDialogOpen(false)}
						tenantId={tenant.tenantId}
						goBack={onBackButtonClicked}
					/>
				)}
				{isProviderListVisible && (
					<ProviderListDialog
						handleAddNewProvider={handleAddNewProvider}
						onCloseDialog={() => setIsProviderListVisible(false)}
					/>
				)}
			</div>
		);
	};

	if (isLoading) {
		return <Loader />;
	}

	if (tenant === undefined && !isLoading) {
		return (
			<div className="tenant-not-found">
				<NoTenantFound />
				<h1>Cannot find a tenant for the given tenant id</h1>
				<button onClick={onBackButtonClicked}>Back to all tenants</button>
			</div>
		);
	}

	if (!tenant) {
		throw new Error("This should be unreachable");
	}

	return (
		<TenantDetailContextProvider
			tenantInfo={tenant}
			refetchTenant={refetchTenant}>
			{renderView()}
			{isNoProviderAddedDialogVisible && (
				<AddNewProviderDialog
					onCloseDialog={() => setIsNoProviderAddedDialogVisible(false)}
					handleContinue={handleAddNewProviderModal}
				/>
			)}
		</TenantDetailContextProvider>
	);
};
