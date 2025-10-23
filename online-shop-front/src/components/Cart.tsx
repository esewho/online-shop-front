import { useEffect, useState } from "react"
import { CartItem } from "../types/cartItem-type"
import type { Cart } from "../types/cart-type"
import { getUserCart } from "../lib/lib"
import type { Product } from "../types/product-type"
import toast from "react-hot-toast"

export default function Cart() {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean | null>(null)
	const [cart, setCart] = useState<Product[]>([])

	useEffect(() => {
		async function getCart() {
			try {
				setLoading(true)
				const data = await getUserCart()
				setCart(data)
			} catch (error) {
				console.error("Failed to fetch user cart", error)
			} finally {
				setLoading(false)
			}
		}
		toast.promise(getCart(), {
			loading: "Loading products...",
			success: "Products loaded successfully!",
			error: "Error loading products",
		})
	}, [cart])
}
