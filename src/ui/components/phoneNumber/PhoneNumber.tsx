import { parsePhoneNumber } from "libphonenumber-js/max";
import "./PhoneNumber.scss";

export const PhoneDisplay = ({ phone }: { phone: string }) => {
	let finalPhone = phone;

	try {
		const parsed = parsePhoneNumber(phone) || {};
		finalPhone = parsed.formatInternational();
	} catch (_) {
		// ignored
	}

	return (
		<>
			<div className="phone-display">
				<span>{finalPhone}</span>
			</div>
		</>
	);
};

export default PhoneDisplay;
