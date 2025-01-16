import { Tenant } from "../api/tenants/types";

export function getTenantsObjectsForIds(tenantsFromStore: Tenant[], tenantIds: string[]): Tenant[] {
	return tenantsFromStore.filter((tenant) => tenantIds.includes(tenant.tenantId));
}
