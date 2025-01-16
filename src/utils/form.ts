/* eslint-disable no-useless-escape */

import { isValidPhoneNumber } from "libphonenumber-js";

export const validateEmail = (email: string) => {
	// We use the same regex as supertokens-root
	const regexPatternForEmail =
		"((^<>()[].,;:@]+(.^<>()[].,;:@]+)*)|(.+))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$";
	return new RegExp(regexPatternForEmail).test(email);
};

export const isNotEmpty = (value: any) => {
	return !(value === undefined || value === null || `${value}`.trim().length === 0);
};

export const validatePhoneNumber = isValidPhoneNumber;
