import { DeleteCrossButton } from "../../../deleteCrossButton/DeleteCrossButton";
import {
	ThirdPartyProviderInput,
	ThirdPartyProviderInputLabel,
} from "../thirdPartyProviderInput/ThirdPartyProviderInput";
import "./keyValueInput.scss";

type KeyValueInputProps = {
	label: string;
	tooltip?: string;
	isRequired?: boolean;
	value: [string, string | null][];
	name: string;
	onChange: (value: [string, string | null][]) => void;
	fixedFields?: string[];
	isOverridden?: boolean;
};

export const KeyValueInput = (props: KeyValueInputProps) => {
	const { label, value, tooltip, isRequired, name, fixedFields, isOverridden } = props;
	const hasOnlyOneEmptyKeyValuePair = value.length === 1 && value[0][0]?.trim() === "" && value[0][1]?.trim() === "";
	return (
		<div className="key-value-input-container">
			<ThirdPartyProviderInputLabel
				label={label}
				tooltip={tooltip}
				isRequired={isRequired}
			/>
			<div className="key-value-input-container__fields-container">
				<div className="key-value-input-container__fields-list">
					{value.slice(0, isOverridden ? 1 : value.length).map((pair, index) => {
						return (
							<div
								className="key-value-input-container__field"
								key={index}>
								<ThirdPartyProviderInput
									value={
										isOverridden
											? "Cannot edit this because you have provided a custom override"
											: pair[0]
									}
									disabled={fixedFields?.includes(pair[0]) || isOverridden}
									handleChange={(e) => {
										const newValue: [string, string | null][] = [
											...props.value.slice(0, index),
											[e.target.value, props.value[index][1]],
											...props.value.slice(index + 1),
										];
										props.onChange(newValue);
									}}
									label="Key"
									name={`key-${name}-${index}`}
									type="text"
								/>
								<ThirdPartyProviderInput
									value={
										isOverridden
											? "Cannot edit this because you have provided a custom override"
											: pair[1] ?? ""
									}
									disabled={fixedFields?.includes(pair[0]) || isOverridden}
									handleChange={(e) => {
										const newValue: [string, string | null][] = [
											...props.value.slice(0, index),
											[props.value[index][0], e.target.value],
											...props.value.slice(index + 1),
										];
										props.onChange(newValue);
									}}
									label="Value"
									name={`value-${name}-${index}`}
									type="text"
								/>
								<DeleteCrossButton
									onClick={() => {
										if (value.length === 1) {
											props.onChange([["", ""]]);
										} else {
											props.onChange(props.value.filter((_, i) => i !== index));
										}
									}}
									label="Delete"
									disabled={fixedFields?.includes(pair[0]) || hasOnlyOneEmptyKeyValuePair}
								/>
							</div>
						);
					})}
				</div>
				<div className="key-value-input-container__footer">
					<hr className="key-value-input-container__divider" />
					<button
						className="key-value-input-container__add-new"
						onClick={() => props.onChange([...props.value, ["", ""]])}>
						+ Add new
					</button>
				</div>
			</div>
		</div>
	);
};
