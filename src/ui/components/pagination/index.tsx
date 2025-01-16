import { getImageUrl } from "../../../utils";

import "./pagination.scss";

type PaginationProps = {
	className?: string;
	currentActivePage: number;
	limit: number;
	offset: number;
	totalPages: number;
	totalItems: number;
	handleNext: () => void;
	handlePrevious: () => void;
};

export default function Pagination({
	totalPages,
	limit,
	totalItems,
	offset,
	handleNext,
	handlePrevious,
	currentActivePage,
	className,
}: PaginationProps) {
	return (
		<div className={["pagination", className].join(" ")}>
			<p className="pagination-count text-small">
				{limit * (currentActivePage - 1) + 1}-{offset + limit * (currentActivePage - 1)} of {totalItems}
			</p>
			<div className="pagination-navigation">
				<button
					className="pagination-button"
					disabled={currentActivePage <= 1}
					onClick={handlePrevious}>
					<img
						src={getImageUrl("chevron-left.svg")}
						alt="Previous page"
					/>
				</button>
				<button
					className="pagination-button"
					disabled={currentActivePage === totalPages}
					onClick={handleNext}>
					<img
						src={getImageUrl("chevron-right.svg")}
						alt="Next page"
					/>
				</button>
			</div>
		</div>
	);
}
