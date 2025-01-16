import { getDashboardAppBasePath, setSelectedTenantId } from "../../../../utils";
import Button from "../../button";
import { useTenantDetailContext } from "./TenantDetailContext";

const HeaderItem = ({ title, value }: { title: string; value: string }) => {
	return (
		<div className="tenant-detail__header__header_item">
			<span className="tenant-detail__header__header_item__title">{title}:</span>
			<span className="tenant-detail__header__header_item__value">{value}</span>
		</div>
	);
};

export const TenantDetailHeader = ({ onlyShowTenantId = false }: { onlyShowTenantId?: boolean }) => {
	const { tenantInfo } = useTenantDetailContext();

	const handleSeeUsers = () => {
		setSelectedTenantId(tenantInfo.tenantId);
		window.open(getDashboardAppBasePath(), "_blank");
	};

	return (
		<div className="tenant-detail__header panel">
			<HeaderItem
				title="Tenant Id"
				value={tenantInfo.tenantId}
			/>
			{!onlyShowTenantId && (
				<>
					<HeaderItem
						title="No. of Users"
						value={tenantInfo.userCount?.toString()}
					/>
					<Button onClick={handleSeeUsers}>See Users</Button>
				</>
			)}
		</div>
	);
};
