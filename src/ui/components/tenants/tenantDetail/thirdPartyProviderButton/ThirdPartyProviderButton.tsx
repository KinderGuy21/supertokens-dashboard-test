import { getImageUrl } from "../../../../../utils";
import "./thirdPartyProviderButton.scss";

type ThirdPartyProviderButtonPropsBase = {
	title: string;
	onClick?: () => void;
	disabled?: boolean;
};

type ThirdPartyProviderButtonPropsWithIcon = ThirdPartyProviderButtonPropsBase & {
	icon: string;
	type?: "with-icon";
};

type ThirdPartyProviderButtonPropsWithoutIcon = ThirdPartyProviderButtonPropsBase & {
	type: "without-icon";
};

export type ThirdPartyProviderButtonProps =
	| ThirdPartyProviderButtonPropsWithIcon
	| ThirdPartyProviderButtonPropsWithoutIcon;

export const ThirdPartyProviderButton = (props: ThirdPartyProviderButtonProps) => {
	return (
		<button
			className={"third-party-provider-cta"}
			onClick={props.onClick}
			disabled={props.disabled}>
			{props.type === "without-icon" ? (
				<div className="third-party-provider-cta__logo-container">
					<span>{props.title}</span>
				</div>
			) : (
				<div className="third-party-provider-cta__logo-container">
					<img
						src={getImageUrl(props.icon)}
						alt={`${props.title} icon`}
						className="third-party-provider-cta__icon"
					/>
					<span className="third-party-provider-cta__divider">|</span>
					<span>{props.title}</span>
				</div>
			)}
		</button>
	);
};
