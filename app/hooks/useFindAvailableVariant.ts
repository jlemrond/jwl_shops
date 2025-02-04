import { useProduct } from '@shopify/hydrogen-react';
import { useEffect } from 'react';

type SelectedOptions = {
	[key: string]: string;
};

export function useFindAvailableVariant(primaryOption: string, selectedOptions: SelectedOptions | undefined) {
	const { setSelectedOptions, product, isOptionInStock } = useProduct();

	useEffect(() => {
		if (!selectedOptions) return;
		if (!product?.variants?.nodes || !selectedOptions) return;

		Object.entries(selectedOptions).forEach(([key, value]) => {
			if (!product?.variants?.nodes || !value) return;

			const variantAvailable = isOptionInStock(key, value);
			if (variantAvailable) return;

			const availableVariant = product.variants.nodes.find((item) => {
				return (
					item?.availableForSale &&
					item?.selectedOptions?.find((option) => option?.name === primaryOption)?.value ===
						selectedOptions.Color
				);
			});
			if (!availableVariant) return;

			const options = availableVariant.selectedOptions?.reduce((acc, option) => {
				const name = option?.name;
				if (!name || !option?.value) return acc;
				acc[name] = option?.value;
				return acc;
			}, {} as SelectedOptions);
			if (!options) return;
			setSelectedOptions(options);
		});
	}, [selectedOptions, product, isOptionInStock, setSelectedOptions, primaryOption]);
}
