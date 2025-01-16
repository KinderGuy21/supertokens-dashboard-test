import { getApiUrl, useFetchData } from "../../../utils";

export const usePermissionsService = () => {
	const fetchData = useFetchData();

	const getPermissionsForRole = async (
		role: string
	): Promise<
		| {
				status: "OK";
				permissions: string[];
		  }
		| { status: "FEATURE_NOT_ENABLED_ERROR" | "UNKNOWN_ROLE_ERROR" }
		| undefined
	> => {
		const response = await fetchData({
			url: getApiUrl("/api/userroles/role/permissions"),
			method: "GET",
			query: {
				role,
			},
		});

		if (response.ok) {
			const body = await response.json();
			return body;
		}

		return undefined;
	};

	const removePermissionsFromRole = async (
		role: string,
		permissions: string[]
	): Promise<
		| {
				status: "OK" | "UNKNOWN_ROLE_ERROR" | "FEATURE_NOT_ENABLED_ERROR";
		  }
		| undefined
	> => {
		const response = await fetchData({
			url: getApiUrl("/api/userroles/role/permissions/remove"),
			method: "PUT",
			config: {
				body: JSON.stringify({
					role,
					permissions,
				}),
			},
		});

		if (response.ok) {
			const body = await response.json();
			return body;
		}

		return undefined;
	};

	return {
		getPermissionsForRole,
		removePermissionsFromRole,
	};
};
