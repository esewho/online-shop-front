import { useNavigate } from "react-router-dom"
import { useCartItem } from "../context/CartItemContext"
import { DecrementIcon, IncrementIcon, TrashIcon } from "./Icons"
import type { Product } from "../types/product-type"

type Props = {
	product: Product
	quantity: number
	title: string
}

export default function ItemCartCard({ product, quantity, title }: Props) {
	const navigate = useNavigate()

	const { add, decrement, removeLine } = useCartItem()

	const { externalId, images, price, category } = product

	return (
		<div className="w-full rounded-lg overflow-hidden shadow-lg p-4 flex gap-4 bg-black/5 dark:bg-black/20 ">
			<img
				src={images?.[0] ?? ""}
				alt={title}
				className="w-24 h-24 object-cover rounded-md cursor-pointer shrink-0"
				onClick={() => navigate(`/home/products/${externalId}`)}
			/>

			<div className="flex-1 flex flex-col ">
				{/* título con altura reservada para alinear las cards */}
				<div className="flex items-center justify-between">
					<h1 className="text-lg font-bold text-zinc-700 dark:text-white line-clamp-2 min-h-[3.25rem]">
						{title}
						<p>{category.name}</p>
					</h1>
				</div>

				<div className="flex flex-row items-center max-w-40 max-h-35">
					<button
						onClick={() => decrement(externalId)}
						className="cursor-pointer mt-0.5 bg-black text-white dark:bg-white dark:text-black dark:hover:bg-amber-400 ease-in-out transition-all duration-200 rounded-2xl p-0"
					>
						<DecrementIcon size={18} />
					</button>
					<p className="text-zinc-600 dark:text-white mt-1 font-semibold px-2 ">
						Cantidad: {quantity}
					</p>
					<button
						onClick={() => add(product, 1)}
						className="cursor-pointer mt-0.5 bg-black text-white dark:bg-white dark:text-black dark:hover:bg-amber-400 transition-all duration-200 rounded-2xl p-0"
					>
						<IncrementIcon size={19.5} />
					</button>
				</div>

				{/* fila pegada abajo en todas las cards */}
				<div className="mt-auto flex items-center justify-between w-full">
					<span className="font-bold text-xl text-zinc-700 dark:text-white">
						${(price * quantity).toFixed(2)}
					</span>

					<button
						onClick={() => removeLine(externalId)}
						className="px-2 py-1 bg-black dark:bg-white dark:text-black dark:hover:bg-amber-400 ease-in-out transition-all duration-200 rounded-2xl text-sm font-semibold text-white shrink-0 cursor-pointer"
					>
						<TrashIcon size={16} />
					</button>
				</div>
			</div>
		</div>
	)
}
