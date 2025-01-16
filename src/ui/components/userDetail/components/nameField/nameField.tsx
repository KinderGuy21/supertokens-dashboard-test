import React from "react";
import InputField from "../../../inputField/InputField";
import { NameTooltip, UserDetailInfoGridItem } from "../../userDetailInfoGrid";

type Props = {
	value: string;
	fieldName: "first_name" | "last_name";
	label: string;
	isEditing: boolean;
	onChange: (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => void;
};

export const UserDetailNameField: React.FC<Props> = ({ value, fieldName, label, isEditing, onChange }: Props) => {
	let body: React.ReactNode = value === "" ? "-" : value;

	if (isEditing && value !== "FEATURE_NOT_ENABLED") {
		body = (
			<InputField
				name={fieldName}
				type="text"
				value={value === "-" ? "" : value}
				handleChange={onChange}
			/>
		);
	}

	return (
		<UserDetailInfoGridItem
			label={label}
			body={body}
			tooltip={<NameTooltip fieldName={fieldName} />}
		/>
	);
};
