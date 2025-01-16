// These components are used to compose the tenant detail panel
// <PanelRoot>
//     <PanelHeader>
//         <PanelHeaderTitle tooltip="Test">
//             Tenant Detail
//         </PanelHeaderTitle>
//         <PanelHeaderAction setIsEditing={() => {}} isEditing={false} />
//     </PanelHeader>
//     {children}
// </PanelRoot>

import { getImageUrl } from "../../../../../utils";
import Button from "../../../button";
import IconButton from "../../../common/iconButton";
import TooltipContainer from "../../../tooltip/tooltip";
import "./tenantDetailPanel.scss";

export const PanelRoot = ({ children }: { children: React.ReactNode }) => {
	return <div className="panel-root panel">{children}</div>;
};

export const PanelHeader = ({ children }: { children: React.ReactNode }) => {
	return (
		<>
			<div className="panel-root__header">{children}</div>
			<div className="panel-root__divider"></div>
		</>
	);
};

export const PanelHeaderTitleWithTooltip = ({
	children,
	tooltip,
}: {
	children: React.ReactNode;
	tooltip?: React.ReactNode;
}) => {
	return (
		<div className="panel-root__header__title-container">
			<h1>{children}</h1>
			{tooltip && (
				<TooltipContainer tooltip={tooltip}>
					<span className="panel-root__header__title-container__tooltip">
						<img
							src={getImageUrl("help-icon.png")}
							alt="help"
						/>
					</span>
				</TooltipContainer>
			)}
		</div>
	);
};

export const PanelHeaderAction = ({
	setIsEditing,
	handleSave,
	isEditing,
	isSaving,
}: {
	setIsEditing: (isEditing: boolean) => void;
	handleSave: () => void;
	isEditing: boolean;
	isSaving?: boolean;
}) => {
	return !isEditing ? (
		<IconButton
			size="small"
			text="Edit"
			tint="var(--color-link)"
			icon={getImageUrl("edit.svg")}
			onClick={() => {
				setIsEditing(true);
			}}
		/>
	) : (
		<div className="panel-root__header__actions">
			<Button
				size="sm"
				color="gray-outline"
				disabled={isSaving}
				onClick={() => setIsEditing(false)}>
				Cancel
			</Button>
			<Button
				size="sm"
				color="secondary"
				isLoading={isSaving}
				disabled={isSaving}
				onClick={handleSave}>
				Save
			</Button>
		</div>
	);
};
