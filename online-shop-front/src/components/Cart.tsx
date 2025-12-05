import { useEffect, useState } from "react"
import type { CartItem } from "../types/cartItem-type"
import type { Cart } from "../types/cart-type"
import { getUserCart } from "../lib/lib"
import type { Product } from "../types/product-type"
import toast from "react-hot-toast"
import ItemCartCard from "./ItemCart-card"
import { useCartItem } from "../context/CartItemContext"
import { startCheckout } from "./stripe"

export default function Cart() {
	const { cart, total, count } = useCartItem()

	return (
		<div className="w-full items-center h-full gap-4 flex flex-col bg-black/5 dark:bg-stone-800 p-6 rounded-lg shadow-md">
			<h1 className="text-2xl font-bold mb-4 text-zinc-700 dark:text-white">
				Mi Carrito
			</h1>
			{cart.items.map((item) => (
				<ItemCartCard
					product={item.product}
					title={
						item.product?.title ?? item.product?.name ?? "Producto sin título"
					}
					quantity={item.quantity}
					// externalId={item.product.externalId}
					// key={item.product.id}
					// images={item.product.images}
					// price={item.product.price}
					// id={item.product.id}
					// title={
					// 	item.product?.title ?? item.product?.name ?? "Producto sin título"
					// }
					// quantity={item.quantity}
				/>
			))}
			<div className="mt-4 flex flex-row justify-end gap-3 items-center">
				<h2 className="text-xl font-bold text-zinc-700 dark:text-white">
					Total:
				</h2>
				<p className="text-lg font-semibold text-zinc-600 dark:text-white">
					${total.toFixed(2)}
				</p>
				<p className="text-xl text-center font-semibold text-zinc-600 dark:text-white">
					| <span className="text-zinc-600 dark:text-amber-400"> {count}</span>{" "}
					items
				</p>
				<button
					onClick={() => startCheckout(cart.items)}
					className="bg-gray-700 hover:bg-gray-900 dark:bg-white dark:text-black dark:hover:bg-amber-400  transition-all ease-in-out duration-200 cursor-pointer text-white py-1 px-2 rounded-md"
				>
					Finalizar compra
				</button>
			</div>
		</div>
	)
}
