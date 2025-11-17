import React, { useEffect } from "react"
import type { Cart } from "../types/cart-type"
import type { Product } from "../types/product-type"
import { decrementCartItem, getUserCart, removeFromCart } from "../lib/lib"
import toast from "react-hot-toast"
import { useAuth } from "./LoginContext"

type CartItemCtx = {
	cart: Cart
	add: (product: Product, qty?: number | undefined) => void
	decrement: (productId: string, qty?: number) => void
	removeLine: (productId: string) => void
	clear: () => void
	total: number
	count: number
}

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000"

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
		total: 0,
	})

	const { token } = useAuth()

	useEffect(() => {
		async function fetchCart() {
			if (!token) return
			try {
				const cart = await getUserCart()
				setCart((prev) => ({
					...prev,
					id: cart.id,
					userId: cart.userId,
					items: cart.items,
					total: cart.total,
				}))
			} catch (error) {
				console.error("Error fetching cart:", error)
			}
		}
		fetchCart()
	}, [token])

	const add = async (product: Product, qty: number = 1) => {
		const previousCart = cart

		try {
			setCart((prev) => {
				const existing = prev.items.find(
					(i) => i.product.externalId === product.externalId
				)
				if (existing) {
					return {
						...prev,
						items: prev.items.map((i) =>
							i.product.externalId === product.externalId
								? { ...i, quantity: i.quantity + qty }
								: i
						),
					}
				} else {
					return {
						...prev,
						items: [...prev.items, { product, quantity: qty }],
					}
				}
			})

			await toast.promise(
				fetch(`${API_URL}/cart/items`, {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
					},
					body: JSON.stringify({
						externalId: product.externalId,
						quantity: qty,
					}),
				}),
				{
					loading: "Adding to cart...",
					success: "Product added to cart!",
					error: "Error adding product to cart",
				}
			)
		} catch (err) {
			console.error(err)
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
						item.product.externalId === productId
							? { ...item, quantity: Math.max(item.quantity - qty, 1) }
							: item
					),
				}
			})
			await toast.promise(
				fetch(`${API_URL}/cart/items/${productId}/decrement`, {
					method: "PUT",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${token}`,
					},
					body: JSON.stringify({ quantity: qty }),
				}),
				{
					loading: "Decrementing cart item...",
					success: "Cart item decremented!",
					error: "Error decrementing cart item",
				}
			)
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
					items: prevCart.items.filter(
						(item) => item.product.externalId !== productId
					),
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
				total: 0,
			})
			await toast.promise(
				Promise.all(
					cart.items.map((item) => removeFromCart(item.product.externalId))
				),
				{
					loading: "Clearing cart...",
					success: "Cart cleared!",
					error: "Error clearing cart",
				}
			)
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
