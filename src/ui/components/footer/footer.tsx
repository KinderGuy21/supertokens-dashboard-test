import { getImageUrl } from "../../../utils";
import "./footer.scss";

export type FooterProps = {
	horizontalAlignment?: "left" | "center" | "right";
	verticalAlignment?: "top" | "bottom" | "center";
	colorMode?: "light" | "dark";
	size?: "normal" | "large";
};

export const LOGO_DARK = getImageUrl("ST_full_logo_dark_theme.svg");
export const LOGO_LIGHT = getImageUrl("ST_icon_light_theme.svg");
export const LOGO_ICON_LIGHT = getImageUrl("ST_full_logo_light_theme.svg");
export const LOGO_ICON_DARK = getImageUrl("ST_icon_dark_theme.svg");

export const Footer = ({ horizontalAlignment, verticalAlignment, colorMode, size }: FooterProps) => {
	return (
		<div
			className={`footer alignment-${horizontalAlignment} vertical-${verticalAlignment} color-${colorMode} size-${size}`}>
			<a
				href="https://supertokens.com/"
				target={"_blank"}
				rel="noreferrer"
				title="SuperTokens, Open Source Authentication">
				<img
					className="logo"
					src={colorMode === "dark" ? LOGO_DARK : LOGO_LIGHT}
					alt="Supertokens"></img>
			</a>
		</div>
	);
};
