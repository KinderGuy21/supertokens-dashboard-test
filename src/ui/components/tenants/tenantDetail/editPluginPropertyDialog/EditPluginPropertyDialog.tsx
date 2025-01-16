import HighlightJS from "highlight.js";
import BashHighlight from "highlight.js/lib/languages/bash";
import { useEffect, useState } from "react";
import CopyText from "../../../copyText/CopyText";
import { Dialog, DialogConfirmText, DialogContent } from "../../../dialog";
import "./editPluginPropertyDialog.scss";

const commonHeaders = `
--header 'api-key: 4KAZ9SPfZwz7NZOiTdwbKBI6kF' \\
--header 'Content-Type: application/json' \\
`;

export const EditPluginPropertyDialog = ({
	onCloseDialog,
	tenantId,
	databaseType,
}: {
	onCloseDialog: () => void;
	tenantId: string;
	databaseType: "postgres" | "mysql";
}) => {
	const [showCopiedTooltip, setShowCopiedTooltip] = useState(false);

	useEffect(() => {
		HighlightJS.registerLanguage("bash", BashHighlight);
		HighlightJS.initHighlightingOnLoad();
	}, []);

	useEffect(() => {
		if (showCopiedTooltip) {
			setTimeout(() => {
				setShowCopiedTooltip(false);
			}, 1000);
		}
	}, [showCopiedTooltip]);

	const command = `curl --location --request PUT '${
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		(window as any).connectionURI
	}/recipe/multitenancy/tenant/v2' \\
${commonHeaders.trim()}
--data-raw '{
    "tenantId": "${tenantId}",
    "coreConfig": {
        "${databaseType === "mysql" ? "mysql_host" : "postgresql_host"}": "localhost",
        "${databaseType === "mysql" ? "mysql_port" : "postgresql_port"}": 5432,
        "${databaseType === "mysql" ? "mysql_user" : "postgresql_user"}": "root",
        "${databaseType === "mysql" ? "mysql_password" : "postgresql_password"}": "root",
        "${databaseType === "mysql" ? "mysql_database_name" : "postgresql_database_name"}": "supertokens"
    }
}'`;

	const highlightedCode = HighlightJS.highlight(command, {
		language: "bash",
	});

	return (
		<Dialog
			title="Edit Database Properties"
			onCloseDialog={onCloseDialog}
			className="dialog-container-650">
			<DialogContent>
				<DialogConfirmText>
					Use the following curl request to modify multiple database properties at once.
				</DialogConfirmText>
				<div className="command-container">
					<code
						className="command with-thin-scrollbar bold-400"
						dangerouslySetInnerHTML={{
							__html: highlightedCode.value,
						}}
					/>
					<div>
						<CopyText showChild={false}>{command}</CopyText>
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
};
