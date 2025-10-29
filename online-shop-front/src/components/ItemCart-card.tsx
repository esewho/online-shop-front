import { useNavigate } from "react-router-dom"
import { useCartItem } from "../context/CartItemContext"
import { DecrementIcon, IncrementIcon, TrashIcon } from "./Icons"

type Props = {
	id: string
	title: string
	price: number
	quantity: number
	images: string[]
	category: string
}
export default function ItemCartCard({
	id,
	title,
	price,
	quantity,
	images,
	category,
}: Props) {
	const navigate = useNavigate()

	const { add, decrement, removeLine } = useCartItem()

	return (
		<div className="w-full rounded-lg overflow-hidden shadow-lg p-4 flex gap-4 bg-amber-50">
			<img
				src={images?.[0] ?? ""}
				alt={title}
				className="w-24 h-24 object-cover rounded-md cursor-pointer shrink-0"
				onClick={() => navigate(`/home/products/${id}`)}
			/>

			<div className="flex-1 flex flex-col">
				{/* título con altura reservada para alinear las cards */}
				<div className="flex items-center justify-between">
					<h1 className="text-lg font-bold text-zinc-700 line-clamp-2 min-h-[3.25rem]">
						{title}
						<p>{category}</p>
					</h1>
				</div>

				<div className="flex flex-row items-center max-w-40 max-h-35">
					<button
						onClick={() => decrement(id)}
						className="cursor-pointer mt-0.5 bg-black rounded-2xl p-0"
					>
						<DecrementIcon size={18} />
					</button>
					<p className="text-zinc-600 mt-1 font-semibold px-2 ">
						Cantidad: {quantity}
					</p>
					<button
						onClick={() =>
							add({ id, title, price, images: images[0], category }, 1)
						}
						className="cursor-pointer mt-0.5 bg-black rounded-2xl p-0"
					>
						<IncrementIcon size={19.5} />
					</button>
				</div>

				{/* fila pegada abajo en todas las cards */}
				<div className="mt-auto flex items-center justify-between w-full">
					<span className="font-bold text-xl text-zinc-700">
						${(price * quantity).toFixed(2)}
					</span>

					<button
						onClick={() => removeLine(id)}
						className="px-2 py-1 bg-black rounded-2xl text-sm font-semibold text-white shrink-0 cursor-pointer"
					>
						<TrashIcon size={16} />
					</button>
				</div>
			</div>
		</div>
	)
}
