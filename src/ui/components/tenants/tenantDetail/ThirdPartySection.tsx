import { ReactComponent as PlusIcon } from "../../../../assets/plus.svg";
import { IN_BUILT_THIRD_PARTY_PROVIDERS } from "../../../../constants";
import Button from "../../button";
import { useTenantDetailContext } from "./TenantDetailContext";
import { PanelHeader, PanelHeaderTitleWithTooltip, PanelRoot } from "./tenantDetailPanel/TenantDetailPanel";
import { ThirdPartyProviderButton } from "./thirdPartyProviderButton/ThirdPartyProviderButton";

export const ThirdPartySection = ({
	handleAddNewProvider,
	handleEditProvider,
}: {
	handleAddNewProvider: () => void;
	handleEditProvider: (providerId: string) => void;
}) => {
	const { tenantInfo } = useTenantDetailContext();
	const providers = tenantInfo.thirdParty.providers;
	return (
		<PanelRoot>
			<PanelHeader>
				<PanelHeaderTitleWithTooltip tooltip="Configure third-party OAuth 2.0/OIDC/SAML providers available for user sign-in/sign-up">
					Social/Enterprise Providers
				</PanelHeaderTitleWithTooltip>
			</PanelHeader>

			{providers?.length > 0 ? (
				<div className="tenant-detail__existing-providers">
					{providers.map((provider) => {
						const builtInProvider = IN_BUILT_THIRD_PARTY_PROVIDERS.find((p) =>
							provider.thirdPartyId.startsWith(p.id)
						);

						if (builtInProvider) {
							return (
								<ThirdPartyProviderButton
									key={provider.thirdPartyId}
									title={provider.name ?? provider.thirdPartyId}
									icon={builtInProvider.icon}
									onClick={() => handleEditProvider(provider.thirdPartyId)}
								/>
							);
						}
						return (
							<ThirdPartyProviderButton
								key={provider.thirdPartyId}
								title={provider.name ?? provider.thirdPartyId}
								type="without-icon"
								onClick={() => handleEditProvider(provider.thirdPartyId)}
							/>
						);
					})}
				</div>
			) : (
				<>
					No providers are configured for this tenant. Add at least one provider to be able to use third-party
					login.
				</>
			)}

			<hr className="tenant-detail__third-party-divider" />

			<Button onClick={handleAddNewProvider}>
				<PlusIcon />
				Add new Provider
			</Button>
		</PanelRoot>
	);
};
