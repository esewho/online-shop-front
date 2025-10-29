import { useEffect, useState } from "react"
import type { CartItem } from "../types/cartItem-type"
import type { Cart } from "../types/cart-type"
import { getUserCart } from "../lib/lib"
import type { Product } from "../types/product-type"
import toast from "react-hot-toast"
import ItemCartCard from "./ItemCart-card"
import { useCartItem } from "../context/CartItemContext"

export default function Cart() {
	const { cart, total, count } = useCartItem()

	return (
		<div className="w-full items-center h-full gap-4 flex flex-col">
			<h1 className="text-2xl font-bold mb-4 text-zinc-700">Mi Carrito</h1>
			{cart.items.map((item) => (
				<ItemCartCard
					category={item.product.category.name}
					key={item.product.id}
					images={item.product.images}
					price={item.product.price}
					id={item.product.id}
					title={
						item.product?.title ?? item.product?.name ?? "Producto sin título"
					}
					quantity={item.quantity}
				/>
			))}
			<div className="mt-4 flex flex-row justify-end gap-3 items-center">
				<h2 className="text-xl font-bold text-zinc-700">Total:</h2>
				<p className="text-lg font-semibold text-zinc-600">
					${total.toFixed(2)}
				</p>
				<p className="text-xl text-center font-semibold text-zinc-600">
					| <span className="text-amber-500"> {count}</span> items
				</p>
				<button className="bg-amber-500 hover:bg-amber-600 transition-all ease-in-out duration-200 cursor-pointer text-white py-1 px-2 rounded-md">
					Finalizar compra
				</button>
			</div>
		</div>
	)
}
