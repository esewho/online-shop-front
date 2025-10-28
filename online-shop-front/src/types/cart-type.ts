import type { CartItem } from "./cartItem-type"

export type Cart = {
	id: string
	userId: string
	items: CartItem[]
}
