import { useNavigate } from "react-router-dom"
import { DetailsIcon } from "./Icons"

type Props = {
	id: string
	title: string
	images: string // url de la imagen principal
	price?: number
}

export default function ProductCard({ id, title, images, price }: Props) {
	const navigate = useNavigate()

	return (
		<article
			className="group cursor-pointer relative isolate overflow-hidden rounded-2xl bg-zinc-900 text-white ring-1 ring-zinc-800 shadow-sm hover:shadow-xl transition-all"
			role="button"
			onClick={() => navigate(`/home/products/${id}`)}
		>
			{/* Imagen a todo el contenedor con altura fija para un grid consistente */}
			<div className="relative w-full h-64">
				<img
					src={images || "https://via.placeholder.com/600x800?text=Product"}
					alt={title}
					className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
					loading="lazy"
				/>
				{/* Degradado para legibilidad del texto */}
				<div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent" />
			</div>

			{/* Contenido superpuesto abajo (todo en una pieza) */}
			<div className="absolute inset-x-0 bottom-0 p-4">
				{/* Título: 2 líneas máx + hover de color */}
				<h3
					className="text-base md:text-lg font-semibold text-zinc-100 transition-colors group-hover:text-amber-300"
					style={{
						display: "-webkit-box",
						WebkitLineClamp: 2,
						WebkitBoxOrient: "vertical",
						overflow: "hidden",
						minHeight: "3rem", // reserva espacio para 2 líneas
					}}
					title={title}
				>
					{title}
				</h3>

				<div className="mt-2 flex items-center justify-between">
					{/* Precio con hover */}
					{typeof price === "number" && (
						<span className="text-xl font-bold tracking-tight transition-colors group-hover:text-amber-300">
							€{price.toFixed(2)}
						</span>
					)}

					{/* CTA aparece en hover */}
					<button
						onClick={(e) => {
							e.stopPropagation()
							navigate(`/home/products/${id}`)
						}}
						className="opacity-0 cursor-pointer translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all bg-white/90 text-zinc-900 rounded-full px-3 py-1.5 text-xs font-semibold flex items-center gap-1"
					>
						<DetailsIcon size={16} />
						Ver detalles
					</button>
				</div>
			</div>

			{/* Borde/shine sutil al hover */}
			<div className="pointer-events-none absolute inset-0 ring-1 ring-inset ring-white/5 group-hover:ring-white/15 transition-colors" />
		</article>
	)
}

// <div className="bg-amber-50 max-w-full max-h-full rounded-lg overflow-hidden shadow-lg text-center">
// 	<div className="group/image relative">
// 		<div className="absolute bg-black/10 w-full h-full group-hover/image:bg-black/50 transition-all" />
// 		<button
// 			onClick={() => navigate(`/home/products/${id}`)}
// 			className=" flex flex-row items-center gap-1 absolute top-[50%] right-[35%] bg-white rounded-full px-4 py-2 text-sm font-semibold opacity-0 group-hover/image:opacity-100 transition-opacity cursor-pointer"
// 		>
// 			<DetailsIcon size={18} />
// 			Ver detalles
// 		</button>

// 		<img
// 			src={images}
// 			alt={title}
// 			className="w-full h-[350px] object-cover"
// 		/>
// 	</div>
// 	<div className="p-3">
// 		<h1 className="text-2xl font-bold text-zinc-700 py-4 h-30 ">{title}</h1>
// 		{price && (
// 			<span className=" font-bold text-xl  text-zinc-700">
// 				${price.toFixed(2)}
// 			</span>
// 		)}
// 	</div>
// </div>
