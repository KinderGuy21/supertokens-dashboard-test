import { getImageUrl } from "../../../utils";
import SignOutBtn from "../auth/SignOutBtn";

import { ReactComponent as CloseIcon } from "../../../assets/close.svg";
import { ReactComponent as HamburgerMenuIcon } from "../../../assets/hamburger-menu.svg";

import { useState } from "react";
import "../sidebar";
import { SideBarContent } from "../sidebar";
import "./header.scss";

export const LOGO_LIGHT = getImageUrl("ST_icon_light_theme.svg");

export default function Header() {
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	function closeMenu() {
		setIsMenuOpen(false);
	}

	function openMenu() {
		setIsMenuOpen(true);
	}

	return (
		<>
			<header className="st-header-desktop">
				<img
					className="logo"
					src={LOGO_LIGHT}
					alt="Supertokens"
				/>
				<SignOutBtn />
			</header>
			<header className="st-header-mobile">
				{isMenuOpen ? (
					<button
						className="close-btn"
						onClick={closeMenu}>
						<CloseIcon />
					</button>
				) : (
					<HamburgerMenuIcon onClick={openMenu} />
				)}
				<img
					className="logo"
					src={LOGO_LIGHT}
					alt="Supertokens"
				/>
				{isMenuOpen ? (
					<>
						<div
							className="overlay"
							onClick={closeMenu}></div>

						<div className="menu-container">
							<div className="menu-content">
								<div onClick={closeMenu}>
									<SideBarContent />
								</div>
							</div>
							<div className="divider" />
							<SignOutBtn />
						</div>
					</>
				) : null}
			</header>
		</>
	);
}
