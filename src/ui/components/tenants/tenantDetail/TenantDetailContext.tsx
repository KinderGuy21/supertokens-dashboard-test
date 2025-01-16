import { createContext, useContext } from "react";
import { TenantInfo } from "../../../../api/tenants/types";

type TenantDetailContextType = {
	tenantInfo: TenantInfo;
	refetchTenant: () => Promise<void>;
};

const TenantDetailContext = createContext<TenantDetailContextType | undefined>(undefined);

export const TenantDetailContextProvider = ({
	children,
	tenantInfo,
	refetchTenant,
}: {
	children: React.ReactNode;
	tenantInfo: TenantInfo;
	refetchTenant: () => Promise<void>;
}) => {
	return (
		<TenantDetailContext.Provider
			value={{
				tenantInfo,
				refetchTenant,
			}}>
			{children}
		</TenantDetailContext.Provider>
	);
};

export const useTenantDetailContext = () => {
	const context = useContext(TenantDetailContext);
	if (context === undefined) {
		throw new Error("useTenantDetailContext must be used within a TenantDetailContextProvider");
	}
	return context;
};
