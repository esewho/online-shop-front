import type { Product } from "./product-type"

export type CartItem = {
	id: string
	productId: string
	product?: Product
	quantity: number
	image: string
	price: number
}
