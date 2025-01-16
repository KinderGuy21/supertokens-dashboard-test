import { PropsWithChildren, createContext, useContext, useState } from "react";
import { Tenant } from "../../../../api/tenants/types";
import { User } from "../../../pages/usersList/types";
import { SessionInfo } from "../userDetailSessionList";

type UserDetailContextType = {
	showLoadingOverlay: () => void;
	hideLoadingOverlay: () => void;
	userDetail: UserDetails;
	setUserDetails: (val: UserDetails) => void;
};

export type UserDetails = {
	userId: string;
	details: User;
	metaData: string | undefined;
	sessions: { sessionHandle: string; timeCreated: number; expiry: number }[] | undefined;
	func: {
		refetchAllData: () => Promise<void>;
		updateUser: (
			userId: string,
			data: User,
			tenantListFromStore: Tenant[] | undefined
		) => Promise<{ status: string; error?: string }>;
		onUpdateEmailVerificationStatusCallback: (
			userId: string,
			isVerified: boolean,
			tenantId: string | undefined
		) => Promise<boolean>;
	};
};

type IncomingProps = {
	showLoadingOverlay: () => void;
	hideLoadingOverlay: () => void;
	metaData: string | undefined;
	sessions: SessionInfo[] | undefined;
	details: User;
	userId: string;
	func: UserFuncs;
};

export type UserFuncs = {
	refetchAllData: () => Promise<void>;
	updateUser: (
		userId: string,
		data: User,
		tenantListFromStore: Tenant[] | undefined
	) => Promise<{ status: string; error?: string }>;
	onUpdateEmailVerificationStatusCallback: (
		userId: string,
		isVerified: boolean,
		tenantId: string | undefined
	) => Promise<boolean>;
};

type Props = PropsWithChildren<IncomingProps>;

const UserDetailContext = createContext<UserDetailContextType | undefined>(undefined);

export const useUserDetailContext = () => {
	const context = useContext(UserDetailContext);
	if (!context) throw "Context must be used within a provider!";
	return context;
};

export const UserDetailContextProvider: React.FC<Props> = (props: Props) => {
	const [userDetails, setUserDetails] = useState<UserDetails>({
		metaData: props.metaData,
		sessions: props.sessions,
		userId: props.userId,
		details: props.details,
		func: props.func,
	});
	return (
		<UserDetailContext.Provider
			value={{
				showLoadingOverlay: props.showLoadingOverlay,
				hideLoadingOverlay: props.hideLoadingOverlay,
				userDetail: {
					metaData: props.metaData,
					sessions: props.sessions,
					userId: props.userId,
					details: props.details,
					func: props.func,
				},
				setUserDetails: (val) => setUserDetails(val),
			}}>
			{props.children}
		</UserDetailContext.Provider>
	);
};
