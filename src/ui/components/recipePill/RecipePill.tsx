type RecipePillProps = {
	recipeId: "emailpassword" | "thirdparty" | "passwordless" | "multiple";
	label: string;
	thirdpartyId?: string;
};

export const RecipePill = ({ recipeId, label, thirdpartyId }: RecipePillProps) => {
	return (
		<div className={`pill ${recipeId} ${thirdpartyId}`}>
			<span>{label}</span>
			{thirdpartyId && (
				<span
					className="thirdparty-name"
					title={thirdpartyId}>
					{" "}
					- {thirdpartyId}
				</span>
			)}
		</div>
	);
};
