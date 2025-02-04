import { type Customer } from "@shopify/hydrogen-react/storefront-api-types";
import { useDataFromMatches } from "./useDataFromMatches";

type CustomerInfo = {
	customer: Customer | null;
	isAuthenticated: boolean;
	isVendor: boolean;
	isAdmin: boolean;
	customerAccessToken: string | null;
};

/**
 * Gets the custom info from the match data.
 */
export const useCustomer = (): CustomerInfo => {
	const customer = useDataFromMatches<Customer>("customer");
	const isAuthenticated = useDataFromMatches<boolean>("isAuthenticated");
	const customerAccessToken = useDataFromMatches<string>(
		"customerAccessToken",
	);

	const isVendor = customer?.tags
		?.map((item: string) => item.toLowerCase())
		.includes("vendor");
	const isAdmin = customer?.tags
		?.map((item: string) => item.toLowerCase())
		.includes("admin");

	return {
		customer: customer || null,
		isAuthenticated: isAuthenticated || false,
		isVendor: isVendor || false,
		isAdmin: isAdmin || false,
		customerAccessToken: customerAccessToken || null,
	};
};

export const useIsVendor = (): boolean => {
	const { isVendor } = useCustomer();
	return isVendor || false;
};

export const useIsAdmin = (): boolean => {
	const { isAdmin } = useCustomer();
	return isAdmin || false;
};
