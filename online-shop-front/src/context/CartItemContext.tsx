import React, { use, useEffect } from "react"
import type { Cart } from "../types/cart-type"
import type { Product } from "../types/product-type"
import { addToCart, getUserCart, removeFromCart } from "../lib/lib"

type CartItemCtx = {
	cart: Cart
	add: (product: Product, qty?: number | undefined) => void
	decrement: (productId: string, qty?: number) => void
	removeLine: (productId: string) => void
	clear: () => void
	total: number
	count: number
}

const CartItemContext = React.createContext<CartItemCtx | undefined>(undefined)

export const CartItemProvider = ({
	children,
}: {
	children: React.ReactNode
}) => {
	const [cart, setCart] = React.useState<Cart>({
		id: "",
		userId: "",
		items: [],
	})

	useEffect(() => {
		async function fetchCart() {
			try {
				const cart = await getUserCart()
				setCart(cart)
			} catch (error) {
				console.error("Error fetching cart:", error)
			}
		}
		fetchCart()
	}, [])

	const add = async (product: Product, qty: number = 1) => {
		const previousCart = cart

		try {
			setCart((prevCart) => {
				const existingItem = prevCart.items.find(
					(item) => item.product.id === product.id
				)
				if (existingItem) {
					return {
						...prevCart,
						items: prevCart.items.map((item) =>
							item.product.id === product.id
								? { ...item, quantity: item.quantity + qty }
								: item
						),
					}
				}
				return {
					...prevCart,
					items: [...prevCart.items, { product, quantity: qty }],
				}
			})

			await addToCart(product.id)
		} catch (error) {
			console.error("Error adding to cart:", error)
			setCart(previousCart)
		}
	}

	const decrement = async (productId: string, qty: number = 1) => {
		const previousCart = cart

		try {
			setCart((prevCart) => {
				return {
					...prevCart,
					items: prevCart.items.map((item) =>
						item.product.id === productId
							? { ...item, quantity: Math.max(item.quantity - qty, 1) }
							: item
					),
				}
			})
			await removeFromCart(productId, qty)
		} catch (error) {
			console.error("Error decrementing cart item:", error)
			setCart(previousCart)
		}
	}

	const removeLine = async (productId: string) => {
		const previousCart = cart

		try {
			setCart((prevCart) => {
				return {
					...prevCart,
					items: prevCart.items.filter((item) => item.product.id !== productId),
				}
			})
			await removeFromCart(productId)
		} catch (error) {
			console.error("Error removing cart item:", error)
			setCart(previousCart)
		}
	}

	const clear = async () => {
		const previousCart = cart

		try {
			setCart({
				id: "",
				userId: "",
				items: [],
			})
		} catch (error) {
			console.error("Error clearing cart:", error)
			setCart(previousCart)
		}
	}

	const total = cart.items.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0
	)
	const count = cart.items.reduce((acc, item) => acc + item.quantity, 0)

	return (
		<CartItemContext.Provider
			value={{ cart, add, decrement, removeLine, clear, total, count }}
		>
			{children}
		</CartItemContext.Provider>
	)
}

export const useCartItem = (): CartItemCtx => {
	const context = React.useContext(CartItemContext)
	if (!context) {
		throw new Error("useCartItem must be used within a CartItemProvider")
	}
	return context
}
