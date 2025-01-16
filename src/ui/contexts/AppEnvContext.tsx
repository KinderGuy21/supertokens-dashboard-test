import React from "react";

interface IAppEnvContext {
	connectionURI: string;
}

interface IAppEnvContextProviderProps {
	connectionURI: string;
	children?: React.ReactNode;
}

const AppEnvContext = React.createContext<IAppEnvContext | null>(null);

export const useAppEnvContext = () => {
	const context = React.useContext(AppEnvContext);
	if (!context) throw "Context must be used within a provider!";
	return context;
};

export const AppEnvContextProvider: React.FC<IAppEnvContextProviderProps> = ({ connectionURI, children }) => {
	const contextValue: IAppEnvContext = {
		connectionURI,
	};

	return <AppEnvContext.Provider value={contextValue}>{children}</AppEnvContext.Provider>;
};
