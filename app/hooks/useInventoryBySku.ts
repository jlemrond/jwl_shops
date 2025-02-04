import { useQuery } from "@tanstack/react-query";
import { typedFetch } from "~/utils/typedFetch";

type InventoryBySku = {
	status: "error" | "success";
	message?: string;
	quantity: number;
};

export function useInventoryBySku(sku: string) {
	return useQuery({
		queryKey: ["inventoryBySku", sku],
		queryFn: async () => {
			if (!sku || sku === "") {
				return 0;
			}

			const skus = Array.from(new Set(sku.split(":")));

			const apiCalls = skus.map(async (sku) => {
				const result = await typedFetch<InventoryBySku>(
					`/api/inventory-by-sku?sku=${sku}`,
				);

				if (
					result.status === "success" &&
					result.quantity !== undefined
				) {
					return result.quantity;
				}
			});

			const result = (await Promise.all(apiCalls)).map((quantity) => {
				if (quantity === undefined) {
					return 0;
				}
				return quantity;
			});

			const quantity = result.reduce((acc, next) => {
				if (next) {
					return acc + next;
				}
				return acc;
			}, 0);

			return quantity;
		},
	});
}
