type Props = {
	title: string
	price: number
	images: string
}

export default function Card({ title, price, images }: Props) {
	return (
		<div className="bg-amber-50 max-w-sm rounded-lg overflow-hidden shadow-lg text-center">
			<div className="group/image relative">
				<div className="absolute bg-black/10 w-full h-full group-hover/image:bg-black/50 transition-all" />
				<button className="absolute top-[50%] right-[35%] bg-white rounded-full px-4 py-2 text-sm font-semibold opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer">
					Ver detalles
				</button>
				<img src={images} alt={title} className=" " />
			</div>
			<div className="p-3">
				<h1 className="text-2xl font-bold text-zinc-700 py-4  h-24 ">
					{title}
				</h1>
				<span className=" font-bold text-xl  text-zinc-700">
					${price.toFixed(2)}
				</span>
			</div>
		</div>
	)
}
