import { Tenant } from "../../../../api/tenants/types";
import { FactorIds } from "../../../../constants";
import { doesTenantHasPasswordlessEnabled, getImageUrl } from "../../../../utils";
import Pagination from "../../pagination";
import { RecipePill } from "../../recipePill/RecipePill";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../../table";
import { PlaceholderTableRows } from "../../usersListTable/UsersListTable";
import { NoTenants } from "../noTenants/NoTenants";
import "./tenantsListTable.scss";

type TenantsListTableProps = {
	tenants: Tenant[] | undefined;
	currentActivePage: number;
	totalPages: number;
	totalTenantsCount: number;
	pageLimit: number;
	setCurrentActivePage: (page: number) => void;
	selectTenant: (tenantId: string) => void;
};

const TenantLoginMethods = ({ tenant }: { tenant: Tenant }) => {
	const loginMethods = {
		emailPassword: tenant.firstFactors.includes(FactorIds.EMAILPASSWORD),
		passwordless: doesTenantHasPasswordlessEnabled(tenant.firstFactors),
		thirdParty: tenant.firstFactors.includes(FactorIds.THIRDPARTY),
	};

	const hasNoLoginMethods = Object.values(loginMethods).every((value) => value === false);

	if (hasNoLoginMethods) {
		return (
			<div className="block-small block-error tenant-no-login-methods-error">
				<img
					className="input-field-error-icon"
					src={getImageUrl("form-field-error-icon.svg")}
					alt="Error in field"
				/>
				<p className="input-field-error-text text-small text-error">
					No login methods enabled for this tenant.
				</p>
			</div>
		);
	}

	return (
		<div className="tenant-login-methods">
			{loginMethods.emailPassword && (
				<RecipePill
					recipeId="emailpassword"
					label="Email Password"
				/>
			)}
			{loginMethods.passwordless && (
				<RecipePill
					recipeId="passwordless"
					label="Passwordless"
				/>
			)}
			{loginMethods.thirdParty && (
				<RecipePill
					recipeId="thirdparty"
					label="Third Party"
				/>
			)}
		</div>
	);
};

export const TenantsListTable = ({
	tenants,
	currentActivePage,
	totalPages,
	totalTenantsCount,
	pageLimit,
	setCurrentActivePage,
	selectTenant,
}: TenantsListTableProps) => {
	const paginatedTenants = tenants?.slice((currentActivePage - 1) * pageLimit, currentActivePage * pageLimit);

	if (Array.isArray(paginatedTenants) && paginatedTenants.length === 0) {
		return <NoTenants />;
	}

	return (
		<Table
			className="theme-blue"
			pagination={
				<Pagination
					className="tenant-list-table-pagination"
					handleNext={() => setCurrentActivePage(currentActivePage + 1)}
					handlePrevious={() => setCurrentActivePage(currentActivePage - 1)}
					limit={pageLimit}
					currentActivePage={currentActivePage}
					totalPages={totalPages}
					offset={paginatedTenants?.length ?? 0}
					totalItems={totalTenantsCount}
				/>
			}>
			<TableHeader>
				<TableRow>
					<TableHead className="tenant-id-column">Tenant ID</TableHead>
					<TableHead>Login Methods</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
				{Array.isArray(paginatedTenants) ? (
					paginatedTenants.map((tenant) => {
						return (
							<TableRow
								role="button"
								key={tenant.tenantId}
								onClick={() => {
									selectTenant(tenant.tenantId);
								}}
								// The following tabIndex and onKeyDown are required for accessibility
								// to make the row clickable using keyboard
								tabIndex={0}
								onKeyDown={(event) => {
									if (event.key === "Enter" || event.key === " " || event.key === "Spacebar") {
										selectTenant(tenant.tenantId);
									}
								}}>
								<TableCell>{tenant.tenantId}</TableCell>
								<TableCell>
									<TenantLoginMethods tenant={tenant} />
								</TableCell>
							</TableRow>
						);
					})
				) : (
					<PlaceholderTableRows
						rowCount={10}
						colSpan={3}
					/>
				)}
			</TableBody>
		</Table>
	);
};
