import "./nativeSelect.scss";

type NativeSelectProps = React.SelectHTMLAttributes<HTMLSelectElement> & {
	options: string[];
	label?: string;
	isRequired?: boolean;
};

export const NativeSelect = ({ options, label, isRequired, ...rest }: NativeSelectProps) => {
	return (
		<div className="select-container">
			{label && (
				<label
					htmlFor={rest.id}
					className="text-small select-label">
					{label}
					{isRequired && <span className="text-error select-label-required">*</span>}
				</label>
			)}
			<div className="select-wrapper">
				<select
					className="native-select"
					{...rest}>
					<option
						value=""
						disabled>
						Select an option
					</option>
					{options.map((option, index) => (
						<option
							key={index}
							value={option}>
							{option}
						</option>
					))}
				</select>
			</div>
		</div>
	);
};
