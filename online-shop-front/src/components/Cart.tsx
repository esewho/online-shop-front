import { useEffect, useState } from "react"
import type { CartItem } from "../types/cartItem-type"
import type { Cart } from "../types/cart-type"
import { getUserCart } from "../lib/lib"
import type { Product } from "../types/product-type"
import toast from "react-hot-toast"
import ItemCartCard from "./ItemCart-card"

export default function Cart() {
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<boolean | null>(null)
	const [cartItems, setCartItems] = useState<CartItem[]>([])

	useEffect(() => {
		async function fetchCart() {
			setLoading(true)
			try {
				const products: Product[] = await getUserCart()

				const items: CartItem[] = products.map((product) => ({
					product,
					quantity: 1,
					image: product.images[0],
					price: product.price,
				}))
				setCartItems(items)
				setError(null)
			} catch (err) {
				setError(true)
				toast.error("Failed to load cart items")
			} finally {
				setLoading(false)
			}
		}

		fetchCart()
	}, [])

	if (loading) {
		return <div>Loading cart...</div>
	}

	if (error) {
		return <div>Error loading cart. Please try again later.</div>
	}

	return (
		<>
			<div>
				<h1 className="text-2xl font-bold mb-4 text-zinc-700">Mi Carrito</h1>
				{cartItems.map((item) => (
					<ItemCartCard
						key={item.product.id}
						id={item.product.id}
						images={item.image}
						title={item.product.title}
						price={item.price}
						quantity={item.quantity}
					/>
				))}
			</div>
		</>
	)
}
