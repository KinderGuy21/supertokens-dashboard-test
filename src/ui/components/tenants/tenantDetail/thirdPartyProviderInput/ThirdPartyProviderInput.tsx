import { ReactComponent as InfoIcon } from "../../../../../assets/info-icon.svg";
import InputDropdown from "../../../inputField/InputDropdown";
import InputField, { InputFieldPropTypes } from "../../../inputField/InputField";
import TooltipContainer from "../../../tooltip/tooltip";
import "./thirdPartyProviderInput.scss";

type ThirdPartyProviderInputProps = InputFieldPropTypes & {
	options?: string[];
	tooltip?: string;
	minLabelWidth?: number;
};

export const ThirdPartyProviderInput = (props: ThirdPartyProviderInputProps) => {
	const { label, options, type, ...rest } = props;
	return (
		<div className="third-party-provider-input-container">
			<ThirdPartyProviderInputLabel
				htmlFor={rest.name}
				label={label ?? ""}
				tooltip={props.tooltip}
				isRequired={props.isRequired}
				minLabelWidth={props.minLabelWidth}
			/>

			{options === undefined ? (
				<InputField
					type={type}
					{...rest}
				/>
			) : (
				<InputDropdown
					options={options}
					{...rest}
				/>
			)}
		</div>
	);
};

export const ThirdPartyProviderInputLabel = ({
	htmlFor,
	label,
	tooltip,
	isRequired,
	minLabelWidth,
}: {
	htmlFor?: string;
	label: string;
	tooltip?: string;
	isRequired?: boolean;
	minLabelWidth?: number;
}) => {
	return (
		<div
			className="third-party-provider-input-container__label-container"
			style={{
				minWidth: minLabelWidth ? `${minLabelWidth}px` : undefined,
			}}>
			{tooltip && (
				<TooltipContainer
					tooltip={tooltip}
					position="bottom">
					<InfoIcon />
				</TooltipContainer>
			)}
			{label && (
				<label
					htmlFor={htmlFor}
					className="third-party-provider-input-container__label">
					{label} {isRequired && <span className="third-party-provider-input-container__required">* </span>}:
				</label>
			)}
		</div>
	);
};
