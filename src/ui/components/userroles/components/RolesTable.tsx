import { useEffect } from "react";

import { PaginationData, RoleWithOrWithoutPermissions, USERROLES_PAGINATION_LIMIT } from "../../../pages/userroles";
import Pagination from "../../pagination";
import { Table, TableBody, TableHead, TableHeader, TableRow } from "../../table";
import { PlaceholderTableRows } from "../../usersListTable/UsersListTable";
import NoRolesFound from "./NoRolesFound";
import "./rolesTable.scss";
import RolesTableRow from "./RolesTableRow";

export type SetRoles = (roles: RoleWithOrWithoutPermissions[]) => void;

type RolesTableProps = {
	roles: RoleWithOrWithoutPermissions[] | undefined;
	setRoles: SetRoles;
	currentActivePage: number;
	paginationData: PaginationData;
	setCurrentActivePage: (page: number) => void;
};

export function RolesTable({
	roles,
	currentActivePage,
	paginationData,
	setCurrentActivePage,
	setRoles,
}: RolesTableProps) {
	useEffect(() => {
		//	if the role is deleted and the role is in the last page of pagination and not the first page
		//	we should set currentPage to previous as this page not have any results now.
		if (currentActivePage !== 1 && paginatedRoles.length === 0) {
			setCurrentActivePage(currentActivePage - 1);
		}
	}, [roles]);

	if (roles === undefined) {
		return (
			<div className="margin-bottom-36">
				<Table>
					<TableHeader>
						<TableRow>
							<TableHead className="roles-column">User Roles</TableHead>
							<TableHead>
								<div className="delete-btn-container">Permissions</div>
							</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						<PlaceholderTableRows
							rowCount={14}
							colSpan={3}
							className={"user-info"}
						/>
					</TableBody>
				</Table>
			</div>
		);
	}
	//	skip will decide how many results should be skipped based on the active page number.
	const rolesToSkip = USERROLES_PAGINATION_LIMIT * (currentActivePage - 1);
	const paginatedRoles = roles.slice(rolesToSkip, rolesToSkip + USERROLES_PAGINATION_LIMIT);

	if (roles !== undefined && roles.length === 0) {
		return <NoRolesFound />;
	}

	return (
		<div className="margin-bottom-36">
			<Table
				className="theme-blue"
				pagination={
					<Pagination
						className="roles-list-pagination"
						handleNext={() => setCurrentActivePage(currentActivePage + 1)}
						handlePrevious={() => setCurrentActivePage(currentActivePage - 1)}
						limit={USERROLES_PAGINATION_LIMIT}
						currentActivePage={currentActivePage}
						totalPages={paginationData.totalPages}
						offset={paginatedRoles.length || 0}
						totalItems={paginationData.totalRolesCount}
					/>
				}>
				<TableHeader>
					<TableRow>
						<TableHead className="roles-column">User Roles</TableHead>
						<TableHead>
							<div className="delete-btn-container">Permissions</div>
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{paginatedRoles.map(({ role, permissions }) => {
						return (
							<RolesTableRow
								permissions={permissions}
								role={role}
								roles={roles}
								setRoles={setRoles}
								key={role}
							/>
						);
					})}
				</TableBody>
			</Table>
		</div>
	);
}
