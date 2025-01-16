import { useEffect, useState } from "react";
import { StorageKeys } from "../../../constants";
import { localStorageHandler } from "../../../services/storage";
import Auth from "../auth/Auth";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function AuthWrapper(props: { children: any }) {
	const [shouldShowAuthForm, setShouldShowAuthForm] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(true);

	useEffect(() => {
		const apiKey = localStorageHandler.getItem(StorageKeys.AUTH_KEY);
		const _shouldShowAuthForm = apiKey === undefined;

		if (_shouldShowAuthForm) {
			localStorageHandler.removeItem(StorageKeys.AUTH_KEY);
			localStorageHandler.removeItem(StorageKeys.EMAIL);
		}

		setShouldShowAuthForm(_shouldShowAuthForm);
		setIsLoading(false);
	}, []);

	if (isLoading) {
		return <></>;
	}

	if (shouldShowAuthForm) {
		return (
			<Auth
				onSuccess={() => {
					setShouldShowAuthForm(false);
				}}
			/>
		);
	}

	return props.children;
}
