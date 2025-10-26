import type { Product } from "./product-type"

export type CartItem = {
	id: Product["id"]
	productId: string
	product?: Product
	quantity: number
	image: string
	price: number
}
