import { HttpApiBaseResponse } from "../../../types";

export type UserListCount = HttpApiBaseResponse & { count: number };
export type UserPaginationList = HttpApiBaseResponse & {
	nextPaginationToken?: string;
	users: User[];
};

// Users Models
export type EmailPasswordRecipeId = "emailpassword";
export type ThirdPartyRecipeId = "thirdparty";
export type PasswordlessRecipeId = "passwordless";

export type UserRecipeType = EmailPasswordRecipeId | ThirdPartyRecipeId | PasswordlessRecipeId | "multiple";

export type LoginMethod = {
	timeJoined: number;
	recipeUserId: string;
	recipeId: EmailPasswordRecipeId | PasswordlessRecipeId | ThirdPartyRecipeId;
	email?: string;
	phoneNumber?: string;
	thirdParty?: {
		id: string;
		userId: string;
	};
	verified: boolean;
	tenantIds: string[];
};

export type User = {
	id: string;
	timeJoined: number;
	emails: string[];
	phoneNumbers: string[];
	thirdParty: {
		id: string;
		userId: string;
	}[];
	loginMethods: LoginMethod[];
	firstName?: string;
	lastName?: string;
	tenantIds: string[];
	isPrimaryUser: boolean;
};

export type UserEmailPassword = User;

export type UserPasswordLess = User & { phoneNumber?: string };

export type UserThirdParty = User & {
	thirdParty: {
		id: "google" | "github" | "apple" | "facebook" | string;
		userId: string;
	};
};

export type UserFeatureStatus = {
	firstName: boolean;
	lastName: boolean;
	emailVerification: boolean;
};

export type UserProps = { user: User };

export const FEATURE_NOT_ENABLED_TEXT = "FEATURE_NOT_ENABLED_ERROR";

export type EmailVerificationStatus =
	| {
			status: typeof FEATURE_NOT_ENABLED_TEXT;
	  }
	| {
			status: "OK";
			isVerified: boolean;
	  };
