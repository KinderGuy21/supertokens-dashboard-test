import { LayoutPanel } from "../../layout/layoutPanel";
import "./UserTenantsList.scss";

type Props = {
	tenantIds: string[];
};

const Header = () => {
	return <div className="title">Tenant IDs</div>;
};

export const UserTenantsList = (props: Props) => {
	return (
		<LayoutPanel header={<Header />}>
			<div className="tenant-list-container">
				{props.tenantIds.map((tenantId) => {
					return (
						<div
							key={tenantId}
							className="tenant-pill">
							{tenantId}
						</div>
					);
				})}

				{props.tenantIds.length === 0 && <div>No associated tenants</div>}
			</div>
		</LayoutPanel>
	);
};
