import { useCart } from '@shopify/hydrogen-react';

export function useInventoryInCart(sku: string): number {
	const cart = useCart();

	if (!sku || sku === '') {
		return 0;
	}

	const lineItems = cart?.lines?.filter((lineItem) => {
		return lineItem?.merchandise?.sku === sku;
	});

	if (!lineItems || lineItems.length === 0) {
		return 0;
	}

	return lineItems.reduce((acc, next) => {
		if (next?.quantity) {
			acc += next.quantity;
		}
		return acc;
	}, 0);
}
