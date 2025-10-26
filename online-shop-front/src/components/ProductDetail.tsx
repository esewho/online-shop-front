import { useEffect, useState } from "react"
import { getAllProducts, getProductById } from "../lib/lib"
import type { Product } from "../types/product-type"
import { useParams } from "react-router-dom"
import toast from "react-hot-toast"
import Card from "./Card"

export default function ProductDetail() {
	const { id } = useParams<{ id: string }>()

	const [loading, setLoading] = useState<boolean>(false)
	const [product, setProduct] = useState<Product | null>(null)
	const [error, setError] = useState<null | string>(null)
	const [selectedImage, setSelectedImage] = useState<string>("")
	const [products, setProducts] = useState<Product[]>([])

	useEffect(() => {
		async function fetchProduct() {
			try {
				setLoading(true)
				const data = await getProductById(id!)
				setProduct(data)
				setSelectedImage(data.images.length > 0 ? data.images[0] : "")
			} catch (e: any) {
				setError(e?.message ?? "Unknown error")
			} finally {
				setLoading(false)
			}
		}

		toast.promise(fetchProduct(), {
			loading: "Loading product details...",
			success: "Product details loaded!",
			error: "Error loading product details",
		})
	}, [id])

	useEffect(() => {
		async function fetchProductsByCategory() {
			if (!product) return
			try {
				setLoading(true)
				const data = await getAllProducts({
					categoryId: product.category.id,
					limit: 5,
					offset: 0,
				})
				setProducts(data)
			} catch (e: any) {
				setError(e?.message ?? "Unknown error")
			} finally {
				setLoading(false)
			}
		}

		if (product) {
			toast.promise(fetchProductsByCategory(), {
				loading: "Loading related products...",
				success: "Related products loaded!",
				error: "Error loading related products",
			})
		}
		fetchProductsByCategory()
	}, [product])

	return (
		<div className="grid grid-cols-2 gap-6 px-2 py-2 w-full h-auto justify-center items-start  overflow-x-hidden overflow-y-hidden">
			<section>
				{loading && <div>Loading...</div>}
				{error && <div>Error: {error}</div>}
				{product && (
					<>
						<div className="flex flex-col items-start relative overflow-hidden mb-4 rounded-lg">
							<img
								src={selectedImage}
								alt={product.title}
								className="w-full h-[500px] object-cover transition-transform duration-300 ease-out transform-gpu hover:scale-110 "
							/>
						</div>
						<div className="flex flex-row gap-5 align-middle">
							{product.images.map((img, index) => (
								<img
									onClick={() => setSelectedImage(img)}
									key={index}
									src={img}
									alt={`${product.title} - ${index + 2}`}
									className={`w-24 h-24 object-fit rounded-lg cursor-pointer border hover:border-amber-400 ${
										selectedImage === img && "border-amber-400"
									} `}
								/>
							))}
						</div>
					</>
				)}
			</section>

			<section className="flex flex-col">
				{product && (
					<>
						<p>{product.category.name}</p>

						<h1 className="text-3xl font-bold mb-2 text-zinc-700">
							{product.title}
						</h1>
						<p className="text-2xl font-semibold mb-4 text-zinc-600">
							${product.price.toFixed(2)}
						</p>
						<p className="text-zinc-500 h-[328px] overflow-y-auto ">
							{product.description}
						</p>

						<button className="bg-black text-white font-semibold mt-4 w-auto py-2 px-2 rounded-lg cursor-pointer">
							Añadir al carrito
						</button>
					</>
				)}
			</section>

			<section className=" col-span-2  w-full h-[500px]">
				<h1 className="text-2xl font-bold text-center mt-2">Mas productos</h1>

				<div className="flex flex-row items-center  gap-6 w-full h-full ">
					{products.map((p) => (
						<Card
							key={p.id}
							id={p.id}
							title={p.title}
							images={p.images.length > 0 ? p.images[0] : ""}
						/>
					))}
				</div>
			</section>
		</div>
	)
}
