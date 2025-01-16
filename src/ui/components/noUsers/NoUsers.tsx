import { getImageUrl } from "../../../utils";

import "./NoUsers.css";

const NoUsers = (props: { isSearch: boolean }) => {
	return (
		<div className="no-users">
			<img
				src={getImageUrl("no-users-graphic.svg")}
				alt="Orange and blue users"
				className="no-users-image"
			/>

			<p className="no-users-title">
				{!props.isSearch && "Currently, you don't have any users."}
				{props.isSearch && " No search results."}
			</p>
			{!props.isSearch && (
				<p className="no-users-subtitle text-small">
					If you are using just the session management feature of SuperTokens, your users will not appear in
					this list.
				</p>
			)}
		</div>
	);
};

export default NoUsers;
