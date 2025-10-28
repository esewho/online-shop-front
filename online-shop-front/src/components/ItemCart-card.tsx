import { useNavigate } from "react-router-dom"

type Props = {
	id: string
	title: string
	price: number
	quantity: number
	images: string
}
export default function ItemCartCard({
	id,
	title,
	price,
	quantity,
	images,
}: Props) {
	const navigate = useNavigate()

	return (
		<div className="bg-amber-50 max-w-sm rounded-lg overflow-hidden shadow-lg text-center flex gap-4 p-4">
			<img
				src={images[0]}
				alt={title}
				className="w-24 h-24 object-cover rounded-md cursor-pointer"
				onClick={() => navigate(`/home/products/${id}`)}
			/>
			<div className="flex flex-col justify-center items-start">
				<h1 className="text-lg font-bold text-zinc-700 ">{title}</h1>
				<p className="text-zinc-600">Cantidad: {quantity}</p>
				<span className=" font-bold text-xl  text-zinc-700">
					${(price * quantity).toFixed(2)}
				</span>
			</div>
		</div>
	)
}
