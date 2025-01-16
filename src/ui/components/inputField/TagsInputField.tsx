import "./tagsInputField.scss";

import { useState } from "react";
import { ReactComponent as CrossIcon } from "../../../assets/cross.svg";
import Badge, { type BadgeProps } from "../badge";

type TagsInputFieldProps = Omit<JSX.IntrinsicElements["input"], "onChange"> & {
	focusText?: string;
	label?: string;
	tags: string[];
	addTag: (tag: string) => void;
	removeTag: (tag: string) => void;
	tagProps?: Partial<BadgeProps>;
};

export default function TagsInputField(props: TagsInputFieldProps) {
	const { focusText, addTag, removeTag, tags, tagProps, ...rest } = props;
	const [isFocused, setIsFocused] = useState(false);

	return (
		<div className="tags-input-field-container">
			<div className="input-field-container">
				{props.label && (
					<label
						htmlFor={props.name}
						className="text-small input-label">
						{props.label}
					</label>
				)}
				<div className={`input-field-inset ${isFocused ? "input-field-inset-focused" : ""}`}>
					<input
						type="text"
						onFocus={() => setIsFocused(true)}
						onBlur={() => setIsFocused(false)}
						onKeyDown={(e) => {
							if (e.key === "Enter") {
								const newTag = e.currentTarget.value.trim();
								addTag(newTag);
								e.currentTarget.value = "";
							}
						}}
						{...rest}
						className={"text-small text-black input-field"}
					/>
				</div>
			</div>
			{focusText !== undefined && isFocused ? <p>{focusText}</p> : null}
			<div className="tags-container">
				{tags.map((tag) => {
					return (
						<Badge
							key={tag}
							{...tagProps}
							text={tag}>
							<CrossIcon onClick={() => removeTag(tag)} />
						</Badge>
					);
				})}
			</div>
		</div>
	);
}
